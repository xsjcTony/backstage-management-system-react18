"use strict";
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-call': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * imports
 */
const egg_1 = require("egg");
/**
 * controller
 */
class UtilController extends egg_1.Controller {
    /**
     * @api {get} /captcha Get image captcha
     * @apiVersion 1.0.0
     * @apiName imageCaptcha
     * @apiGroup Utility
     *
     * @apiDescription Will return a SVG captcha image including 4 digits.
     *
     * @apiSampleRequest http://127.0.0.1:7001/captcha
     */
    async generateCaptcha() {
        const { ctx } = this;
        ctx.type = 'image/svg+xml';
        ctx.body = ctx.helper.generateCaptcha();
    }
    /**
     * @api {get} /verify-email Send verification email
     * @apiVersion 1.0.0
     * @apiName sendVerificationEmail
     * @apiGroup Utility
     *
     * @apiQuery {string} email The e-mail address to send the verification email to
     *
     * @apiDescription Send a verification email to the specified e-mail address.
     */
    async sendVerificationEmail() {
        const { ctx } = this;
        try {
            const data = await ctx.helper.sendVerificationEmail(ctx.query.email);
            ctx.success(200, 'Email sent.', data);
        }
        catch (err) {
            ctx.error(400, 'Failed to send email.', err);
        }
    }
}
exports.default = UtilController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdFQUFnRTtBQUNoRSw2REFBNkQ7QUFDN0QsdURBQXVEOztBQUV2RDs7R0FFRztBQUNILDZCQUFnQztBQUdoQzs7R0FFRztBQUNILE1BQXFCLGNBQWUsU0FBUSxnQkFBVTtJQUVwRDs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsZUFBZTtRQUMxQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFBO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN6QyxDQUFDO0lBR0Q7Ozs7Ozs7OztPQVNHO0lBQ0ksS0FBSyxDQUFDLHFCQUFxQjtRQUNoQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNwRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDdEM7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFBO1NBQzdDO0lBQ0gsQ0FBQztDQUNGO0FBdENELGlDQXNDQyJ9