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
    router.get('/api/v1/roles', authenticator, controller.roles.getRolesByQuery);
    router.get('/api/v1/roles/:id', authenticator, controller.roles.getRoleById);
    router.post('/api/v1/roles', authenticator, controller.roles.createRole);
    router.delete('/api/v1/roles/:id', authenticator, controller.roles.deleteRole);
    router.put('/api/v1/roles/:id', authenticator, controller.roles.updateRole);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb2xlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdURBQXVEO0FBQ3ZELDJEQUEyRDtBQUMzRCx3REFBd0Q7O0FBS3hELGtCQUFlLENBQUMsR0FBZ0IsRUFBRSxhQUFrQixFQUFRLEVBQUU7SUFDNUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFFbEM7O09BRUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUM1RSxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3hFLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDOUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUM3RSxDQUFDLENBQUEifQ==