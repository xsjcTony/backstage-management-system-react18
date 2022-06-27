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
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkVXNlclJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRVc2VyUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2IsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLFdBQVc7UUFDWCxNQUFNLEVBQUUscUJBQXFCO1FBQzdCLE9BQU8sRUFBRSxpR0FBaUc7UUFDMUcsUUFBUSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsTUFBTSxFQUFFLG9EQUFvRDtRQUM1RCxPQUFPLEVBQUUsMkJBQTJCO1FBQ3BDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsY0FBYztRQUNkLE1BQU0sRUFBRSwwRkFBMEY7UUFDbEcsT0FBTyxFQUFFLDRHQUE0RztRQUNySCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQSJ9