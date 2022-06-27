"use strict";
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCaptcha = exports.generateCaptcha = void 0;
const tslib_1 = require("tslib");
const svg_captcha_1 = tslib_1.__importDefault(require("svg-captcha"));
const generateCaptcha = (ctx) => {
    // generate captcha
    const captcha = svg_captcha_1.default.create({
        size: 4,
        width: 140,
        height: 40,
        fontSize: 50,
        ignoreChars: '0oO1ilI',
        noise: 3,
        color: true,
        background: '#fff'
    });
    // save captcha
    ctx.session.captcha = captcha.text;
    ctx.session.maxAge = 60 * 1000; // 1 min
    // send captcha to the client
    return captcha.data;
};
exports.generateCaptcha = generateCaptcha;
const verifyCaptcha = (ctx, clientCaptcha) => {
    const captchaText = ctx.session.captcha;
    if (!captchaText) {
        // captcha expired
        throw new Error('message.captcha.expired');
    }
    else if (captchaText.toLowerCase() !== clientCaptcha.toLowerCase()) {
        // invalid
        ctx.session.captcha = null;
        throw new Error('message.captcha.incorrect');
    }
    ctx.session.captcha = null;
};
exports.verifyCaptcha = verifyCaptcha;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdFQUFnRTtBQUNoRSw2REFBNkQ7Ozs7QUFFN0Qsc0VBQW9DO0FBSTdCLE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBWSxFQUFVLEVBQUU7SUFDdEQsbUJBQW1CO0lBQ25CLE1BQU0sT0FBTyxHQUFHLHFCQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksRUFBRSxDQUFDO1FBQ1AsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsRUFBRTtRQUNWLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLFNBQVM7UUFDdEIsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUMsQ0FBQTtJQUVGLGVBQWU7SUFDZixHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ2xDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUEsQ0FBQyxRQUFRO0lBRXZDLDZCQUE2QjtJQUM3QixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBbkJZLFFBQUEsZUFBZSxtQkFtQjNCO0FBRU0sTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFZLEVBQUUsYUFBcUIsRUFBUSxFQUFFO0lBQ3pFLE1BQU0sV0FBVyxHQUE4QixHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQTtJQUVsRSxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2hCLGtCQUFrQjtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUE7S0FDM0M7U0FBTSxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDcEUsVUFBVTtRQUNWLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUE7S0FDN0M7SUFFRCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7QUFDNUIsQ0FBQyxDQUFBO0FBYlksUUFBQSxhQUFhLGlCQWF6QiJ9