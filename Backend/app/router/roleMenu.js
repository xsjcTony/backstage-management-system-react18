"use strict";
/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, authenticator) => {
    const { controller, router } = app;
    /**
     * Role_Menu - REST API
     */
    router.post('/api/v1/role-menu', authenticator, controller.roleMenu.assignRoleMenus);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZU1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb2xlTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdURBQXVEO0FBQ3ZELDJEQUEyRDtBQUMzRCx3REFBd0Q7O0FBS3hELGtCQUFlLENBQUMsR0FBZ0IsRUFBRSxhQUFrQixFQUFRLEVBQUU7SUFDNUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFFbEM7O09BRUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQSJ9