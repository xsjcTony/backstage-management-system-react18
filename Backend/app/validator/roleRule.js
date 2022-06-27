"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    roleName: {
        type: 'string',
        trim: true,
        format: /^(?!\s*$).+/,
        message: 'Role name cannot be empty',
        required: true
    },
    roleDescription: {
        type: 'string',
        trim: true,
        format: /^(?!\s*$).+/,
        message: 'Role description cannot be empty',
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb2xlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2IsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsa0NBQWtDO1FBQzNDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFBIn0=