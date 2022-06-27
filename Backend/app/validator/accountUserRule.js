"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    username: {
        type: 'string',
        trim: true,
        // 只能是数字或字母
        format: /^[A-Za-z0-9]{6,20}$/,
        message: 'Username must be any of a-z, A-Z or 0-9, and between 6 and 20 (both inclusive) characters long.'
    },
    password: {
        type: 'string',
        trim: true,
        // 必须是数字字母符号组合
        format: /^((?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/,
        message: 'Password must include characters, numbers, symbols, and between 8 and 20 (both inclusive) characters long.'
    },
    captcha: {
        type: 'string',
        trim: true,
        // 必须是数字字母符号组合
        format: /^[A-Za-z0-9]{4}$/,
        message: 'Captcha does not meet the requirements.'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudFVzZXJSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjb3VudFVzZXJSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsV0FBVztRQUNYLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsT0FBTyxFQUFFLGlHQUFpRztLQUMzRztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixjQUFjO1FBQ2QsTUFBTSxFQUFFLDBGQUEwRjtRQUNsRyxPQUFPLEVBQUUsNEdBQTRHO0tBQ3RIO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLGNBQWM7UUFDZCxNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE9BQU8sRUFBRSx5Q0FBeUM7S0FDbkQ7Q0FDRixDQUFBIn0=