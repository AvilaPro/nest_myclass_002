//12.2.1
import { SetMetadata } from "@nestjs/common";
//13.1.2 importamos el enum con los roles creados
import { Role } from "./rol.enum";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

//13.1.2
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);