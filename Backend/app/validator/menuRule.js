"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    menuRule: {
        type: 'string',
        trim: true,
        format: /^(?!\s*$).+/,
        message: 'Menu name cannot be empty',
        required: true
    },
    menuDescription: {
        type: 'string',
        trim: true,
        format: /^(?!\s*$).+/,
        message: 'Menu description cannot be empty',
        required: true
    },
    level: {
        type: 'enum',
        values: [1, 2],
        message: 'Menu level must be either 1 or 2',
        required: true
    },
    menuKey: {
        type: 'string',
        format: /^(?!\s*$).+/,
        message: 'Menu key cannot be empty',
        required: true
    },
    menuIcon: {
        type: 'string',
        format: /^(?!\s*$).+/,
        message: 'Menu icon cannot be empty',
        required: false
    },
    parentId: {
        type: 'number',
        message: `Parent's id must be a number`,
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZW51UnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2IsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsa0NBQWtDO1FBQzNDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDZCxPQUFPLEVBQUUsa0NBQWtDO1FBQzNDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLGFBQWE7UUFDckIsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLDhCQUE4QjtRQUN2QyxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQSJ9