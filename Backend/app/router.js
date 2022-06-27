"use strict";
/* eslint '@typescript-eslint/unbound-method': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (app) => {
    const authenticator = app.middleware.authenticator(null, app);
    /**
     * Captcha
     */
    (await Promise.resolve().then(() => __importStar(require('./router/captcha')))).default(app);
    /**
     * Account
     */
    (await Promise.resolve().then(() => __importStar(require('./router/account')))).default(app);
    /**
     * Users - REST API
     */
    (await Promise.resolve().then(() => __importStar(require('./router/users')))).default(app, authenticator);
    /**
     * Roles - REST API
     */
    (await Promise.resolve().then(() => __importStar(require('./router/roles')))).default(app, authenticator);
    /**
     * User_Role - REST API
     */
    (await Promise.resolve().then(() => __importStar(require('./router/userRole')))).default(app, authenticator);
    /**
     * Privileges - REST API
     */
    (await Promise.resolve().then(() => __importStar(require('./router/privileges')))).default(app, authenticator);
    /**
     * Role_Privilege - REST API
     */
    (await Promise.resolve().then(() => __importStar(require('./router/rolePrivilege')))).default(app, authenticator);
    /**
     * Menus - REST API
     */
    (await Promise.resolve().then(() => __importStar(require('./router/menus')))).default(app, authenticator);
    /**
     * Role_Menu - REST API
     */
    (await Promise.resolve().then(() => __importStar(require('./router/roleMenu')))).default(app, authenticator);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1REFBdUQ7QUFDdkQsNkRBQTZEO0FBQzdELDJEQUEyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUszRCxrQkFBZSxLQUFLLEVBQUUsR0FBZ0IsRUFBaUIsRUFBRTtJQUV2RCxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFHOUQ7O09BRUc7SUFDSCxDQUFDLHdEQUFhLGtCQUFrQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFHaEQ7O09BRUc7SUFDSCxDQUFDLHdEQUFhLGtCQUFrQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFHaEQ7O09BRUc7SUFDSCxDQUFDLHdEQUFhLGdCQUFnQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRzdEOztPQUVHO0lBQ0gsQ0FBQyx3REFBYSxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUc3RDs7T0FFRztJQUNILENBQUMsd0RBQWEsbUJBQW1CLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFHaEU7O09BRUc7SUFDSCxDQUFDLHdEQUFhLHFCQUFxQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBR2xFOztPQUVHO0lBQ0gsQ0FBQyx3REFBYSx3QkFBd0IsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUdyRTs7T0FFRztJQUNILENBQUMsd0RBQWEsZ0JBQWdCLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFHN0Q7O09BRUc7SUFDSCxDQUFDLHdEQUFhLG1CQUFtQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0FBQ2pFLENBQUMsQ0FBQSJ9