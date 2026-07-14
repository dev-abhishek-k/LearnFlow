import { Role } from "@/generated/prisma/enums";

export const ROUTE_PERMISSIONS = {
  "/admin": [Role.ADMIN],
  "/api/admin": [Role.ADMIN],  
  "/teacher": [
    Role.ADMIN,
    Role.TEACHER,
  ],
"/api/teacher": [Role.ADMIN, Role.TEACHER],
  "/dashboard": [
    Role.ADMIN,
    Role.TEACHER,
    Role.STUDENT,
  ],

  "/profile": [
    Role.ADMIN,
    Role.TEACHER,
    Role.STUDENT,
  ],
};
