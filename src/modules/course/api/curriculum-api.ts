export interface Subsection {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  imageUrl: string | null;
  content: string | null;
  position: number;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  videoUrl: string | null;
  imageUrl: string | null;
  position: number;
  isPreview: boolean;
}

export interface Section {
  id: string;
  title: string;
  description: string | null;
  position: number;
  order: number;
  subSections: Subsection[];
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { credentials: "include", ...options });
  const result = await response.json().catch(() => null);
  if (!response.ok) throw new Error(result?.message || "Curriculum request failed");
  if (!result) throw new Error("Invalid curriculum response");
  return result.data as T;
}

const sectionUrl = (courseId: string) => `/api/teacher/courses/${courseId}/sections`;
const subsectionUrl = (sectionId: string) => `/api/teacher/sections/${sectionId}/subsections`;
const lessonUrl = (courseId: string, sectionId: string, subsectionId: string) => `/api/teacher/course/${courseId}/section/${sectionId}/subsection/${subsectionId}/lesson`;
const json = (data: unknown) => ({ headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

export async function getCurriculum(courseId: string): Promise<Section[]> {
  const sections = await request<Section[]>(sectionUrl(courseId));
  return Promise.all(sections.map(async section => {
    const subsections = await request<Subsection[]>(subsectionUrl(section.id));
    return {
      ...section,
      subSections: await Promise.all(subsections.map(async subsection => ({
        ...subsection,
        lessons: await request<Lesson[]>(lessonUrl(courseId, section.id, subsection.id)),
      }))),
    };
  }));
}

export const addSection = (courseId: string, data: { title: string; description?: string }) =>
  request<Section>(sectionUrl(courseId), { method: "POST", ...json(data) });
export const editSection = (courseId: string, sectionId: string, data: { title: string; description?: string }) =>
  request<Section>(`${sectionUrl(courseId)}/${sectionId}`, { method: "PATCH", ...json(data) });
export const removeSection = (courseId: string, sectionId: string) =>
  request<Section>(`${sectionUrl(courseId)}/${sectionId}`, { method: "DELETE" });
export interface SubsectionInput { title: string; description?: string | null; videoUrl?: string | null; imageUrl?: string | null; content?: string | null }
export const addSubsection = (_courseId: string, sectionId: string, data: SubsectionInput) =>
  request<Subsection>(subsectionUrl(sectionId), { method: "POST", ...json(data) });
export const editSubsection = (_courseId: string, sectionId: string, subsectionId: string, data: Partial<SubsectionInput>) =>
  request<Subsection>(`${subsectionUrl(sectionId)}/${subsectionId}`, { method: "PATCH", ...json(data) });
export const removeSubsection = (_courseId: string, sectionId: string, subsectionId: string) =>
  request<Subsection>(`${subsectionUrl(sectionId)}/${subsectionId}`, { method: "DELETE" });

export interface LessonInput {
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  imageUrl?: string;
  position: number;
  isPreview?: boolean;
}

export const addLesson = (courseId: string, sectionId: string, subsectionId: string, data: LessonInput) =>
  request<Lesson>(lessonUrl(courseId, sectionId, subsectionId), { method: "POST", ...json(data) });
export const editLesson = (courseId: string, sectionId: string, subsectionId: string, lessonId: string, data: Partial<LessonInput>) =>
  request<Lesson>(`${lessonUrl(courseId, sectionId, subsectionId)}/${lessonId}`, { method: "PATCH", ...json(data) });
export const removeLesson = (courseId: string, sectionId: string, subsectionId: string, lessonId: string) =>
  request<Lesson>(`${lessonUrl(courseId, sectionId, subsectionId)}/${lessonId}`, { method: "DELETE" });
