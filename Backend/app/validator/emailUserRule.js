"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    email: {
        type: 'string',
        trim: true,
        format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: 'Email address is invalid.'
    },
    password: {
        type: 'string',
        trim: true,
        // 必须是数字字母符号组合
        format: /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxVc2VyUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtYWlsVXNlclJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsb0RBQW9EO1FBQzVELE9BQU8sRUFBRSwyQkFBMkI7S0FDckM7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsY0FBYztRQUNkLE1BQU0sRUFBRSw0RkFBNEY7UUFDcEcsT0FBTyxFQUFFLDRHQUE0RztLQUN0SDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixjQUFjO1FBQ2QsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUseUNBQXlDO0tBQ25EO0NBQ0YsQ0FBQSJ9