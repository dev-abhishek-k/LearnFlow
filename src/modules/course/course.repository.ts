
import { prisma} from "@/lib/prisma";
import { Prisma, Course } from "@/generated/prisma/client";
class CourseRepository{
     async createCourse(data:Prisma.CourseUncheckedCreateInput):Promise<Course>{
      return prisma.course.create({data:{
          ...data,
      }})
     }
     async updateCourse(courseId:string,teacherId:string,data:Prisma.CourseUncheckedUpdateInput){
      return prisma.course.update({where:{id:courseId,teacherId},data})
     }
     async getAllCourse(teacherId:string):Promise<Course[]>{
          return prisma.course.findMany({where:{teacherId},orderBy:{createdAt:"desc"}})
     }
     async getCourseById(courseId:string):Promise<Course | null>{
          return prisma.course.findUnique({where:{id:courseId}})
     }
     async getCourseFindBySlug(slug:string):Promise<Course | null>{
          return prisma.course.findUnique({where:{slug}})
     }
     async deleteCourse(courseId:string,teacherId:string){
      return prisma.course.delete({where:{id:courseId,teacherId}})
     }
}

export const courseRepository = new CourseRepository();
