"use strict";
/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, authenticator) => {
    const { controller, router } = app;
    /**
     * Roles - REST API
     */
    router.get('/api/v1/privileges', authenticator, controller.privileges.getPrivilegesByQuery);
    router.get('/api/v1/privileges/:id', authenticator, controller.privileges.getPrivilegeById);
    router.post('/api/v1/privileges', authenticator, controller.privileges.createPrivilege);
    router.put('/api/v1/privileges/:id', authenticator, controller.privileges.updatePrivilege);
    router.delete('/api/v1/privileges/:id', authenticator, controller.privileges.deletePrivilege);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmlsZWdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByaXZpbGVnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVEQUF1RDtBQUN2RCwyREFBMkQ7QUFDM0Qsd0RBQXdEOztBQUt4RCxrQkFBZSxDQUFDLEdBQWdCLEVBQUUsYUFBa0IsRUFBUSxFQUFFO0lBQzVELE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBRWxDOztPQUVHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQzNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUMzRixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZGLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDMUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUMvRixDQUFDLENBQUEifQ==