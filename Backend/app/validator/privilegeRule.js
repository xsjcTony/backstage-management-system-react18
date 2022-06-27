"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    privilegeName: {
        type: 'string',
        trim: true,
        format: /^(?!\s*$).+/,
        message: 'Privilege name cannot be empty',
        required: true
    },
    privilegeDescription: {
        type: 'string',
        trim: true,
        format: /^(?!\s*$).+/,
        message: 'Privilege description cannot be empty',
        required: true
    },
    level: {
        type: 'enum',
        values: [1, 2],
        message: 'Privilege level must be either 1 or 2',
        required: true
    },
    privilegeUrl: {
        type: 'string',
        format: /^\/\S*$/,
        message: 'Privilege URL cannot be empty',
        required: false
    },
    parentId: {
        type: 'number',
        message: `Parent's id must be a number`,
        required: true
    },
    requestMethod: {
        type: 'enum',
        values: ['get', 'post', 'put', 'delete'],
        message: 'Request method must be one of get, post, put or delete',
        required: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmlsZWdlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByaXZpbGVnZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsZ0NBQWdDO1FBQ3pDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxvQkFBb0IsRUFBRTtRQUNwQixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsTUFBTSxFQUFFLGFBQWE7UUFDckIsT0FBTyxFQUFFLHVDQUF1QztRQUNoRCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2QsT0FBTyxFQUFFLHVDQUF1QztRQUNoRCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsU0FBUztRQUNqQixPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsOEJBQThCO1FBQ3ZDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztRQUN4QyxPQUFPLEVBQUUsd0RBQXdEO1FBQ2pFLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0NBQ0YsQ0FBQSJ9