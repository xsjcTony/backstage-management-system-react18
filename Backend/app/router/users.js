"use strict";
/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-explicit-any': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, authenticator) => {
    const { controller, router } = app;
    /**
     * Users - REST API
     */
    router.get('/api/v1/users', authenticator, controller.users.getUsersByQuery);
    router.get('/api/v1/users/:id', authenticator, controller.users.getUserById);
    router.post('/api/v1/users', authenticator, controller.users.createUser);
    router.delete('/api/v1/users/:id', authenticator, controller.users.deleteUser);
    router.put('/api/v1/users/:id', authenticator, controller.users.updateUser);
    /**
     * Other API
     */
    router.post('/api/v1/upload-user-avatar', authenticator, controller.users.uploadAvatar);
    router.post('/api/v1/import-users', authenticator, controller.users.importUsers);
    router.get('/api/v1/export-all-users', authenticator, controller.users.exportAllUsers);
    router.post('/api/v1/delete-temp-avatars', authenticator, controller.users.deleteTempAvatars);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdURBQXVEO0FBQ3ZELDJEQUEyRDtBQUMzRCx3REFBd0Q7O0FBS3hELGtCQUFlLENBQUMsR0FBZ0IsRUFBRSxhQUFrQixFQUFRLEVBQUU7SUFDNUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFFbEM7O09BRUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUM1RSxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3hFLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDOUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUczRTs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNoRixNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ3RGLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMvRixDQUFDLENBQUEifQ==