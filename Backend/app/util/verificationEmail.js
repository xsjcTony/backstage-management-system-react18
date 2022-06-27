"use strict";
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.sendVerificationEmail = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
/**
 * helper functions
 */
let transporter;
/**
 * Create reusable transporter object using the default SMTP transport.
 * @return {Transporter}
 */
function _createTransporter(ctx) {
    if (transporter) {
        return transporter;
    }
    const { host, port, user, pass } = ctx.app.config.smtp;
    transporter = nodemailer_1.default.createTransport({
        host,
        port,
        secure: true,
        auth: {
            user,
            pass
        }
    });
    return transporter;
}
/**
 * Define email info and verification code.
 * @return {EmailInfo}
 */
function _createEmailInfoAndCode(ctx, to) {
    const verificationCode = Math.random().toString(16).slice(2, 6).toLowerCase();
    ctx.session.email = verificationCode;
    ctx.session.maxAge = 120 * 1000; // 2 min
    return {
        from: 'Aelita <xsjcTony@126.com>',
        to,
        subject: 'Backstage management system (React18) verification',
        text: `You are registering the backstage management system, Your verification code is ${verificationCode}` // plain text body
    };
}
/**
 * main functions
 */
/**
 * Send mail.
 * @param {Context} ctx
 * @param {string} to - List of receivers' email address.
 * @return {Promise<SMTPTransport.SentMessageInfo>}
 */
const sendVerificationEmail = async (ctx, to) => {
    const transporter = _createTransporter(ctx);
    return transporter.sendMail(_createEmailInfoAndCode(ctx, to));
};
exports.sendVerificationEmail = sendVerificationEmail;
/**
 * Verify Email.
 * @param {Context} ctx
 * @param {string} clientCode
 */
const verifyEmail = (ctx, clientCode) => {
    const emailCode = ctx.session.email;
    if (!emailCode) {
        // captcha expired
        throw new Error('message.verification-code.expired');
    }
    else if (emailCode.toLowerCase() !== clientCode.toLowerCase()) {
        // invalid
        throw new Error('message.verification-code.incorrect');
    }
    ctx.session.email = null;
};
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpY2F0aW9uRW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZXJpZmljYXRpb25FbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0VBQWdFO0FBQ2hFLDZEQUE2RDs7OztBQUc3RCxvRUFBb0Q7QUFLcEQ7O0dBRUc7QUFDSCxJQUFJLFdBQW1FLENBQUE7QUFFdkU7OztHQUdHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxHQUFZO0lBQ3RDLElBQUksV0FBVyxFQUFFO1FBQUUsT0FBTyxXQUFXLENBQUE7S0FBRTtJQUV2QyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ3RELFdBQVcsR0FBRyxvQkFBVSxDQUFDLGVBQWUsQ0FBQztRQUN2QyxJQUFJO1FBQ0osSUFBSTtRQUNKLE1BQU0sRUFBRSxJQUFJO1FBQ1osSUFBSSxFQUFFO1lBQ0osSUFBSTtZQUNKLElBQUk7U0FDTDtLQUNGLENBQUMsQ0FBQTtJQUVGLE9BQU8sV0FBVyxDQUFBO0FBQ3BCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLHVCQUF1QixDQUFDLEdBQVksRUFBRSxFQUFVO0lBQ3ZELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRTdFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFBO0lBQ3BDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUEsQ0FBQyxRQUFRO0lBRXhDLE9BQU87UUFDTCxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEVBQUU7UUFDRixPQUFPLEVBQUUsb0RBQW9EO1FBQzdELElBQUksRUFBRSxrRkFBa0YsZ0JBQWdCLEVBQUUsQ0FBQyxrQkFBa0I7S0FDOUgsQ0FBQTtBQUNILENBQUM7QUFHRDs7R0FFRztBQUVIOzs7OztHQUtHO0FBQ0ksTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQVUsRUFBMEMsRUFBRTtJQUM5RyxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMzQyxPQUFPLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDL0QsQ0FBQyxDQUFBO0FBSFksUUFBQSxxQkFBcUIseUJBR2pDO0FBRUQ7Ozs7R0FJRztBQUNJLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBWSxFQUFFLFVBQWtCLEVBQVEsRUFBRTtJQUNwRSxNQUFNLFNBQVMsR0FBOEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7SUFFOUQsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLGtCQUFrQjtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUE7S0FDckQ7U0FBTSxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDL0QsVUFBVTtRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtLQUN2RDtJQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtBQUMxQixDQUFDLENBQUE7QUFaWSxRQUFBLFdBQVcsZUFZdkIifQ==