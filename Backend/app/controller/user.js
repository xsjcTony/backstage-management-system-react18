"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * imports
 */
const egg_1 = require("egg");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const accountUserRule_1 = tslib_1.__importDefault(require("../validator/accountUserRule"));
const BindAccountRule_1 = tslib_1.__importDefault(require("../validator/BindAccountRule"));
const emailUserRule_1 = tslib_1.__importDefault(require("../validator/emailUserRule"));
/**
 * controller
 */
class UserController extends egg_1.Controller {
    /**
     * @api {post} /register Register
     * @apiVersion 1.0.0
     * @apiName register
     * @apiGroup Account
     *
     * @apiBody {string{length: 6~20}} [username] Username
     * @apiBody {string} [email] E-mail address
     * @apiBody {string{length: 8~20}} password Password
     * @apiBody {boolean} [github] Whether creating user by GitHub OAuth or not
     * @apiBody {string{length: 4}} captcha The text in image captcha or the code in verification email
     *
     * @apiDescription Register user.
     * One of username or email must be provided.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {User} data Info of the register user (with roles)
     *
     * @apiError (Error 400) UsernameExists Username already exists in the database
     * @apiError (Error 400) EmailExists E-mail address already exists in the database
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "Register succeed",
     *   data: {
     *     id: 1,
     *     username: "abc",
     *     email: null,
     *     // ...
     *   }
     * }
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 400,
     *   msg: "Username already exists",
     *   data: {}
     * }
     */
    async create() {
        const { ctx } = this;
        try {
            // validate
            this._validateUserInfo();
            // save into database
            const user = await ctx.service.user.createUser(ctx.request.body);
            ctx.success(200, 'message.register.success', user);
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'error', err);
            }
        }
    }
    /**
     * @api {post} /login Login
     * @apiVersion 1.0.0
     * @apiName login
     * @apiGroup Account
     *
     * @apiBody {string{length: 6~20}} [username] Username
     * @apiBody {string} [email] E-mail address
     * @apiBody {string} password Password
     * @apiBody {boolean} [remember] Token expires in 7(false) or 30(true) days
     * @apiBody {string{length: 4}} captcha The text in image captcha
     *
     * @apiDescription Login user.
     * One of username or email must be provided.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {User} data Info of the logged-in user (without roles) with JWT token
     *
     * @apiError (Error 400) InvalidLoginCredential Either username or email
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "Login succeed",
     *   data: {
     *     id: 1,
     *     username: "abc",
     *     email: null,
     *     // ...
     *     token: // JWT Token
     *   }
     * }
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 400,
     *   msg: "Invalid login credential",
     *   data: {}
     * }
     */
    async login() {
        const { ctx } = this;
        const data = ctx.request.body;
        try {
            ctx.helper.verifyCaptcha(data.captcha);
            const user = (await ctx.service.user.loginUser(data)).toJSON();
            const expiresIn = data.remember ? '30d' : '7d';
            // JWT
            const token = jwt.sign(user, this.config.keys, { expiresIn });
            ctx.success(200, 'message.login.success', { ...user, token });
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'error', err);
            }
        }
    }
    /**
     * @api {get} /is-logged-in Check login status
     * @apiVersion 1.0.0
     * @apiName checkLoginStatus
     * @apiGroup Account
     *
     * @apiHeader {string} Authorization The JWT token
     *
     * @apiHeaderExample {json} Header example
     * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
     *
     * @apiDescription Check user's login status by JWT Token in request header.
     * One of username or email must be provided.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {User} data Info of the loggedIn user (decoded from JWT Token)
     *
     * @apiError (Error 400) InvalidJwtToken Invalid JWT Token
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "Logged in",
     *   data: {
     *     id: 1,
     *     username: "abc",
     *     email: null,
     *     // ...
     *   }
     * }
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 400,
     *   msg: "Not logged in",
     *   data: {}
     * }
     *
     * @apiSampleRequest /is-logged-in
     */
    async isLoggedIn() {
        const { ctx } = this;
        const token = ctx.get('Authorization');
        try {
            const data = jwt.verify(token, this.config.keys);
            ctx.success(200, 'Logged in', data);
        }
        catch (err) {
            ctx.error(400, 'not logged in', err);
        }
    }
    /**
     * @api {post} /oauth/bind Bind local account with OAuth
     * @apiVersion 1.0.0
     * @apiName bindAccount
     * @apiGroup Account
     *
     * @apiBody {string{length: 6~20}} username Username
     * @apiBody {string} email E-mail address
     * @apiBody {string{length: 8~20}} password Password
     * @apiBody {string{length: 4}} captcha The code in verification email
     * @apiBody {string} oauthId The OAuth account's ID
     * @apiBody {string} provider The OAuth provider
     *
     * @apiDescription Bind local account with an OAuth account and automatically log in.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     * @apiSuccess {User} data Info of the bound user (without roles) with JWT Token
     *
     * @apiError (Error 400) UsernameExists Username already exists in the database
     * @apiError (Error 400) EmailExists E-mail address already exists in the database
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "Bind account succeed",
     *   data: {
     *     id: 1,
     *     username: "abc",
     *     email: "1@2.com",
     *     // ...
     *     token: // JWT Token
     *   }
     * }
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 400,
     *   msg: "Username already exists",
     *   data: {}
     * }
     */
    async bindAccount() {
        const { ctx } = this;
        try {
            // validate
            await this._validateOAuthBindInfo();
            // save into database
            const user = (await ctx.service.user.createFullUser(ctx.request.body)).toJSON();
            // Bind user to OAuth
            await ctx.service.oauth.updateOAuthUser(parseInt(ctx.request.body.oauthId), user.id);
            // JWT
            const token = jwt.sign(user, this.config.keys, { expiresIn: '7d' });
            ctx.success(200, 'message.oauth.bind.success', { ...user, token });
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'error', err);
            }
        }
    }
    /**
     * @api {post} /reset-password/verify-email Reset password - verify email
     * @apiVersion 1.0.0
     * @apiName verifyEmail
     * @apiGroup Account
     *
     * @apiBody {string} email E-mail address
     * @apiBody {string{length: 4}} captcha The code in verification email
     *
     * @apiDescription Verify the verification code when resetting password.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     *
     * @apiError (Error 400) InvalidCode Invalid verification code
     * @apiError (Error 400) CodeExpired Verification code expired
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "Code has been verified"
     * }
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 400,
     *   msg: "Invalid code",
     *   data: {}
     * }
     *
     * @apiSampleRequest /reset-password/verify-email
     */
    async verifyEmail() {
        const { ctx } = this;
        const { email, captcha } = ctx.request.body;
        try {
            await ctx.service.user.findByEmail(email);
            ctx.helper.verifyEmail(captcha);
            ctx.success(200, 'message.reset-password.verify.success');
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'error', err);
            }
        }
    }
    /**
     * @api {put} /reset-password/reset Reset password
     * @apiVersion 1.0.0
     * @apiName resetPassword
     * @apiGroup Account
     *
     * @apiBody {string} email E-mail address
     * @apiBody {string{length: 8~20}} password Password
     *
     * @apiDescription Reset the user's password based on e-mail address.
     *
     * @apiSuccess {number} code 200 (Status code)
     * @apiSuccess {string} msg Response message
     *
     * @apiError (Error 400) Failed Failed to reset password
     *
     * @apiSuccessExample {json} Success response
     * {
     *   code: 200,
     *   msg: "Password has been reset"
     * }
     *
     * @apiErrorExample {json} Error response
     * {
     *   code: 400,
     *   msg: "Failed to reset",
     *   data: {}
     * }
     */
    async resetPassword() {
        const { ctx } = this;
        const { email, password } = ctx.request.body;
        try {
            await ctx.service.user.resetPassword(email, password);
            ctx.success(200, 'message.reset-password.reset.success');
        }
        catch (err) {
            if (err instanceof Error) {
                ctx.error(400, err.message, err);
            }
            else {
                ctx.error(400, 'error', err);
            }
        }
    }
    /**
     * Helper functions
     */
    /**
     * Validate helper.
     * @private
     */
    _validateUserInfo() {
        const { ctx } = this;
        const data = ctx.request.body;
        if ('username' in data) {
            ctx.validate(accountUserRule_1.default, data);
            ctx.helper.verifyCaptcha(data.captcha);
        }
        else if ('email' in data) {
            ctx.validate(emailUserRule_1.default, data);
            ctx.helper.verifyEmail(data.captcha);
        }
        else {
            throw new Error(`Register type is invalid`);
        }
    }
    async _validateOAuthBindInfo() {
        const { ctx } = this;
        const data = ctx.request.body;
        // OAuth
        try {
            await ctx.service.oauth.getOAuthById({
                id: parseInt(data.oauthId, 10),
                provider: data.provider
            });
        }
        catch (err) {
            throw new Error('message.oauth.invalid');
        }
        ctx.validate(BindAccountRule_1.default, data);
        ctx.helper.verifyEmail(data.captcha);
    }
}
exports.default = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE2RDtBQUM3RCwyREFBMkQ7OztBQUUzRDs7R0FFRztBQUNILDZCQUFnQztBQUNoQywwREFBbUM7QUFDbkMsMkZBQTBEO0FBQzFELDJGQUEwRDtBQUMxRCx1RkFBc0Q7QUFLdEQ7O0dBRUc7QUFDSCxNQUFxQixjQUFlLFNBQVEsZ0JBQVU7SUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Q0c7SUFDSSxLQUFLLENBQUMsTUFBTTtRQUNqQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRXBCLElBQUk7WUFDRixXQUFXO1lBQ1gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7WUFFeEIscUJBQXFCO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFaEUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDbkQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtnQkFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTthQUNqQztpQkFBTTtnQkFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDN0I7U0FDRjtJQUNILENBQUM7SUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdDRztJQUNJLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDcEIsTUFBTSxJQUFJLEdBQWMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFFeEMsSUFBSTtZQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0QyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFVLENBQUE7WUFFdEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFFOUMsTUFBTTtZQUNOLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtZQUU3RCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDOUQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtnQkFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTthQUNqQztpQkFBTTtnQkFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDN0I7U0FDRjtJQUNILENBQUM7SUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdDRztJQUNJLEtBQUssQ0FBQyxVQUFVO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFFcEIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUV0QyxJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNoRCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDcEM7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNyQztJQUNILENBQUM7SUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0c7SUFDSSxLQUFLLENBQUMsV0FBVztRQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRXBCLElBQUk7WUFDRixXQUFXO1lBQ1gsTUFBTSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtZQUVuQyxxQkFBcUI7WUFDckIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFVLENBQUE7WUFFdkYscUJBQXFCO1lBQ3JCLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBRXZHLE1BQU07WUFDTixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBRW5FLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNuRTtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO2dCQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQ2pDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTthQUM3QjtTQUNGO0lBQ0gsQ0FBQztJQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BK0JHO0lBQ0ksS0FBSyxDQUFDLFdBQVc7UUFDdEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNwQixNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFvQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUU1RCxJQUFJO1lBQ0YsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFL0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsdUNBQXVDLENBQUMsQ0FBQTtTQUMxRDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO2dCQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQ2pDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTthQUM3QjtTQUNGO0lBQ0gsQ0FBQztJQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBQ0ksS0FBSyxDQUFDLGFBQWE7UUFDeEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNwQixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFzQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUUvRCxJQUFJO1lBQ0YsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBRXJELEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLHNDQUFzQyxDQUFDLENBQUE7U0FDekQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtnQkFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTthQUNqQztpQkFBTTtnQkFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDN0I7U0FDRjtJQUNILENBQUM7SUFHRDs7T0FFRztJQUVIOzs7T0FHRztJQUNLLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLE1BQU0sSUFBSSxHQUFpQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUUzQyxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyx5QkFBZSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ25DLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN2QzthQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtZQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLHVCQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDakMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3JDO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7U0FDNUM7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFDLHNCQUFzQjtRQUNsQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLE1BQU0sSUFBSSxHQUFrQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUU1QyxRQUFRO1FBQ1IsSUFBSTtZQUNGLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUNuQyxFQUFFLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2dCQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQyxDQUFBO1NBQ0g7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtTQUN6QztRQUVELEdBQUcsQ0FBQyxRQUFRLENBQUMseUJBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNuQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdEMsQ0FBQztDQUNGO0FBdllELGlDQXVZQyJ9