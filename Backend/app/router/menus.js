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
    router.get('/api/v1/menus', authenticator, controller.menus.getMenusByQuery);
    router.get('/api/v1/menus/:id', authenticator, controller.menus.getMenuById);
    router.post('/api/v1/menus', authenticator, controller.menus.createMenu);
    router.put('/api/v1/menus/:id', authenticator, controller.menus.updateMenu);
    router.delete('/api/v1/menus/:id', authenticator, controller.menus.deleteMenu);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZW51cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdURBQXVEO0FBQ3ZELDJEQUEyRDtBQUMzRCx3REFBd0Q7O0FBS3hELGtCQUFlLENBQUMsR0FBZ0IsRUFBRSxhQUFrQixFQUFRLEVBQUU7SUFDNUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFFbEM7O09BRUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUM1RSxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDM0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoRixDQUFDLENBQUEifQ==