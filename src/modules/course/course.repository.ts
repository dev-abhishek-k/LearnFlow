
import { prisma} from "@/lib/prisma";
import { Prisma, Course } from "@/generated/prisma/client";
class CourseRepository{
     async createCourse(data:Prisma.CourseUncheckedCreateInput):Promise<Course>{
      return prisma.course.create({data:{
          ...data,
      }})
     }
     async updateCourse(courseId:string,data:Prisma.CourseUpdateInput){ 
      return prisma.course.update({where:{id:courseId},data})
     }
     async getAllCourse():Promise<Course[]>{
          return prisma.course.findMany()    
     }
     async getCourseById(courseId:string):Promise<Course | null>{
          return prisma.course.findUnique({where:{id:courseId}})
     }
     async getCourseFindBySlug(slug:string):Promise<Course | null>{
          return prisma.course.findUnique({where:{slug}})
     }
     async deleteCourse(courseId:string  ){
      return prisma.course.delete({where:{id:courseId}})
     }
}

export const courseRepository = new CourseRepository();