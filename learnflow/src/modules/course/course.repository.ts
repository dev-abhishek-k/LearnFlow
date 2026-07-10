
import { prisma} from "@/lib/prisma";
import { Prisma, Course } from "@/generated/prisma/client";
class CourseRepository{
     async createCourse(data:Prisma.CourseUncheckedCreateInput):Promise<Course>{
      return prisma.course.create({data:{
          ...data,
      }})
     }
     async updateCourse(id:string,data:Prisma.CourseUpdateInput){ 
      return prisma.course.update({where:{id},data})
     }
     async getAllCourse():Promise<Course[]>{
          return prisma.course.findMany()    
     }
     async getCourseFindBySlug(slug:string):Promise<Course | null>{
          return prisma.course.findUnique({where:{slug}})
     }
     async deleteCourse(id:string  ){
      return prisma.course.delete({where:{id}})
     }
}

export const courseRepository = new CourseRepository();