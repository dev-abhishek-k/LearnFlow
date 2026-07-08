import { Role } from "@/generated/prisma/enums";

export const ROUTE_PERMISSIONS = {
  "/admin": [Role.ADMIN],

  "/instructor": [
    Role.ADMIN,
    Role.TEACHER,
  ],

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