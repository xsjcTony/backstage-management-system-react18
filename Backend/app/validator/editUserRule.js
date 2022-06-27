"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    username: {
        type: 'string',
        trim: true,
        // 只能是数字或字母
        format: /^[A-Za-z0-9]{6,20}$/,
        message: 'Username must be any of a-z, A-Z or 0-9, and between 6 and 20 (both inclusive) characters long.',
        required: false
    },
    email: {
        type: 'string',
        trim: true,
        format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: 'Email address is invalid.',
        required: true
    },
    password: {
        type: 'string',
        trim: true,
        // 必须是数字字母符号组合
        format: /^((?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/,
        message: 'Password must include characters, numbers, symbols, and between 8 and 20 (both inclusive) characters long.',
        required: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdFVzZXJSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdFVzZXJSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsV0FBVztRQUNYLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsT0FBTyxFQUFFLGlHQUFpRztRQUMxRyxRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsb0RBQW9EO1FBQzVELE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixjQUFjO1FBQ2QsTUFBTSxFQUFFLDBGQUEwRjtRQUNsRyxPQUFPLEVBQUUsNEdBQTRHO1FBQ3JILFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0NBQ0YsQ0FBQSJ9