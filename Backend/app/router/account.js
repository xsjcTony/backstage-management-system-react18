"use strict";
/* eslint '@typescript-eslint/unbound-method': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { controller, router } = app;
    /**
     * Normal
     */
    router.post('/register', controller.user.create);
    router.post('/login', controller.user.login);
    router.get('/is-logged-in', controller.user.isLoggedIn);
    /**
     * OAuth - GitHub
     */
    router.get('/github', controller.github.getLoginView);
    router.get('/github/callback', controller.github.getAccessToken);
    /**
     * OAuth - bind account
     */
    router.post('/oauth/bind', controller.user.bindAccount);
    /**
     * Reset password
     */
    router.post('/reset-password/verify-email', controller.user.verifyEmail);
    router.put('/reset-password/reset', controller.user.resetPassword);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVEQUF1RDs7QUFLdkQsa0JBQWUsQ0FBQyxHQUFnQixFQUFRLEVBQUU7SUFDeEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFFbEM7O09BRUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDNUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUd2RDs7T0FFRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBR2hFOztPQUVHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUd2RDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN4RSxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDcEUsQ0FBQyxDQUFBIn0=