"use strict";
/* eslint '@typescript-eslint/unbound-method': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { controller, router } = app;
    router.get('/captcha', controller.util.generateCaptcha);
    router.get('/verify-email', controller.util.sendVerificationEmail);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVEQUF1RDs7QUFLdkQsa0JBQWUsQ0FBQyxHQUFnQixFQUFRLEVBQUU7SUFDeEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFFbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUN2RCxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFDcEUsQ0FBQyxDQUFBIn0=