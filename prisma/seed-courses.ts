import "dotenv/config";
import { PrismaClient, type CourseLevel } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

type SeedSubsection = { title: string; description: string; content: string };
type SeedSection = { title: string; description: string; subsections: SeedSubsection[] };
type SeedCourse = {
  slug: string;
  categorySlug: string;
  title: string;
  shortDescription: string;
  description: string;
  level: CourseLevel;
  price: string;
  sections: SeedSection[];
};

const courses: SeedCourse[] = [
  {
    slug: "javascript-foundations-seed",
    categorySlug: "web-development",
    title: "JavaScript Foundations",
    shortDescription: "Learn the language behind interactive web pages.",
    description: "A practical introduction to JavaScript, from variables and functions to working with the browser. Build a small interactive project as you learn.",
    level: "BEGINNER",
    price: "0.00",
    sections: [
      { title: "JavaScript essentials", description: "Start with the language basics.", subsections: [
        { title: "Variables and values", description: "Store and inspect data.", content: "Use const for values that do not need reassignment and let for values that change. Try strings, numbers, and booleans in the browser console." },
        { title: "Functions and control flow", description: "Make reusable decisions.", content: "Write a function that accepts a name and returns a greeting. Then use if statements to handle missing input." },
      ] },
      { title: "JavaScript in the browser", description: "Turn the basics into interaction.", subsections: [
        { title: "Select and update elements", description: "Work with the DOM.", content: "Use document.querySelector to find an element, then update its textContent in response to user input." },
        { title: "Handle events", description: "Respond to clicks and typing.", content: "Attach an event listener to a button. Update the page when the button is clicked, and test the result in your browser." },
      ] },
    ],
  },
  {
    slug: "practical-web-security-seed",
    categorySlug: "ethical-hacking",
    title: "Practical Web Security",
    shortDescription: "Understand common web risks and safer development habits.",
    description: "Explore how web applications protect accounts and data. Practice threat modeling, input handling, and responsible testing in an authorized environment.",
    level: "INTERMEDIATE",
    price: "29.00",
    sections: [
      { title: "Security foundations", description: "Learn the rules and core concepts.", subsections: [
        { title: "Authorization and scope", description: "Test only systems you own or are authorized to assess.", content: "Define the target, allowed techniques, and reporting process before testing. Record findings without collecting unnecessary personal data." },
        { title: "Threat modeling", description: "Identify assets and trust boundaries.", content: "Map users, sensitive data, entry points, and external services. List likely failures and prioritize fixes by impact." },
      ] },
      { title: "Defensive practices", description: "Apply safeguards in an application.", subsections: [
        { title: "Validate untrusted input", description: "Handle input at the server boundary.", content: "Validate type, length, and allowed values on the server. Use parameterized database queries and encode output for its context." },
        { title: "Protect sessions", description: "Keep account access controlled.", content: "Set secure cookie attributes, rotate session credentials when needed, and check authorization on every protected operation." },
      ] },
    ],
  },
  {
    slug: "developer-interview-preparation-seed",
    categorySlug: "interview",
    title: "Developer Interview Preparation",
    shortDescription: "Practice clear technical explanations and coding problems.",
    description: "Prepare for software interviews with a repeatable approach to problem solving, communication, and reviewing your solutions. Each lesson includes a focused exercise.",
    level: "BEGINNER",
    price: "19.00",
    sections: [
      { title: "Problem-solving workflow", description: "Build a reliable interview routine.", subsections: [
        { title: "Clarify the problem", description: "Ask useful questions before coding.", content: "Restate the task, identify inputs and outputs, and test assumptions with a small example. Discuss edge cases before choosing an approach." },
        { title: "Compare approaches", description: "Reason about tradeoffs.", content: "Start with a correct simple solution. Explain its time and space costs, then improve it only where the constraints require it." },
      ] },
      { title: "Coding practice", description: "Apply your workflow to common patterns.", subsections: [
        { title: "Arrays and maps", description: "Use indexing and lookup structures.", content: "Practice finding duplicate values and counting occurrences. Explain why a map may improve lookup time." },
        { title: "Review and communicate", description: "Finish with evidence.", content: "Walk through a normal case and an edge case. State complexity, mention limitations, and summarize the final solution." },
      ] },
    ],
  },
];

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }) });
  try {
    const teacher = process.env.SEED_TEACHER_EMAIL
      ? await prisma.user.findUnique({ where: { email: process.env.SEED_TEACHER_EMAIL } })
      : await prisma.user.findFirst({ where: { role: "TEACHER" }, orderBy: { createdAt: "asc" } });
    if (!teacher || teacher.role !== "TEACHER") throw new Error("No teacher found. Create a teacher account or set SEED_TEACHER_EMAIL.");

    for (const item of courses) {
      const existing = await prisma.course.findUnique({ where: { slug: item.slug }, select: { id: true } });
      if (existing) { console.log(`Skipped ${item.title}: already exists`); continue; }
      const category = await prisma.category.findUnique({ where: { slug: item.categorySlug } });
      if (!category?.isActive) throw new Error(`Active category required: ${item.categorySlug}`);

      await prisma.course.create({
        data: {
          slug: item.slug,
          title: item.title,
          shortDescription: item.shortDescription,
          description: item.description,
          price: item.price,
          level: item.level,
          language: "English",
          status: "PUBLISHED",
          teacher: { connect: { id: teacher.id } },
          category: { connect: { id: category.id } },
          Sections: { create: item.sections.map((section, sectionIndex) => ({
            title: section.title,
            description: section.description,
            order: sectionIndex + 1,
            position: sectionIndex + 1,
            subSections: { create: section.subsections.map((subsection, subsectionIndex) => ({
              title: subsection.title,
              description: subsection.description,
              content: subsection.content,
              order: subsectionIndex + 1,
              position: subsectionIndex + 1,
              lessons: { create: [{
                title: subsection.title,
                content: subsection.content,
                position: 1,
                isPreview: sectionIndex === 0 && subsectionIndex === 0,
              }] },
            })) },
          })) },
        },
      });
      console.log(`Created ${item.title}`);
    }
  } finally { await prisma.$disconnect(); }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
