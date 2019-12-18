export class Role {
    roleCode: string;
    roleName: string;
    roleDesc: string;
}

export class RolePermissions {
    roleCode: string;
    viewCode: string;
}

export enum Roles {
    ADMIN = 'ADMIN',
    TRACKER_USER = 'TRACKER_USER'
}
