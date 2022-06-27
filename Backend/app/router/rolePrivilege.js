"use strict";
/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, authenticator) => {
    const { controller, router } = app;
    /**
     * User_Role - REST API
     */
    router.post('/api/v1/role-privilege', authenticator, controller.rolePrivilege.assignRolePrivileges);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZVByaXZpbGVnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvbGVQcml2aWxlZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVEQUF1RDtBQUN2RCwyREFBMkQ7QUFDM0Qsd0RBQXdEOztBQUt4RCxrQkFBZSxDQUFDLEdBQWdCLEVBQUUsYUFBa0IsRUFBUSxFQUFFO0lBQzVELE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBRWxDOztPQUVHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3JHLENBQUMsQ0FBQSJ9