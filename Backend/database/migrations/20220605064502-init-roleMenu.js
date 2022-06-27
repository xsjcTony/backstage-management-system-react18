"use strict";
/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        const { INTEGER, DATE } = sequelize_1.DataTypes;
        await queryInterface.createTable('role_menus', {
            role_id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                references: {
                    model: 'roles',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            menu_id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                references: {
                    model: 'menus',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            created_at: {
                type: DATE
            },
            updated_at: {
                type: DATE
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('role_menus');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjA2MDUwNjQ1MDItaW5pdC1yb2xlTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIjIwMjIwNjA1MDY0NTAyLWluaXQtcm9sZU1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDhCQUE4Qjs7QUFFOUIseUNBQXFDO0FBSXJDLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLEtBQUssRUFBRSxjQUE4QixFQUFpQixFQUFFO1FBQzFELE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcscUJBQVMsQ0FBQTtRQUVuQyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFO1lBQzdDLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQ3RCLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixVQUFVLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLE9BQU87b0JBQ2QsR0FBRyxFQUFFLElBQUk7aUJBQ1Y7Z0JBQ0QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFFBQVEsRUFBRSxTQUFTO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDdEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFVBQVUsRUFBRTtvQkFDVixLQUFLLEVBQUUsT0FBTztvQkFDZCxHQUFHLEVBQUUsSUFBSTtpQkFDVjtnQkFDRCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNELFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELElBQUksRUFBRSxLQUFLLEVBQUUsY0FBOEIsRUFBaUIsRUFBRTtRQUM1RCxNQUFNLGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDOUMsQ0FBQztDQUNGLENBQUEifQ==