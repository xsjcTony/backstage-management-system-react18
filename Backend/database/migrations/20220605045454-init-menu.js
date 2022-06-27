"use strict";
/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        const { INTEGER, STRING, DATE, TINYINT, BOOLEAN } = sequelize_1.DataTypes;
        await queryInterface.createTable('menus', {
            id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            menu_name: {
                type: STRING,
                allowNull: false,
                unique: true
            },
            menu_description: {
                type: STRING,
                allowNull: false,
                unique: true
            },
            menu_state: {
                type: BOOLEAN,
                allowNull: false,
                unique: false,
                defaultValue: true
            },
            menu_key: {
                type: STRING,
                allowNull: false,
                unique: true
            },
            menu_icon: {
                type: STRING,
                allowNull: true,
                unique: false
            },
            parent_id: {
                type: INTEGER.UNSIGNED,
                allowNull: false,
                unique: false
            },
            level: {
                type: TINYINT.UNSIGNED,
                allowNull: false,
                unique: false
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
        await queryInterface.dropTable('menus');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjA2MDUwNDU0NTQtaW5pdC1tZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiMjAyMjA2MDUwNDU0NTQtaW5pdC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4QkFBOEI7O0FBRTlCLHlDQUFxQztBQUlyQyxrQkFBZTtJQUNiLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBOEIsRUFBaUIsRUFBRTtRQUMxRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLHFCQUFTLENBQUE7UUFFN0QsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUN4QyxFQUFFLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsYUFBYSxFQUFFLElBQUk7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2FBQ2I7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFlBQVksRUFBRSxJQUFJO2FBQ25CO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2dCQUNmLE1BQU0sRUFBRSxLQUFLO2FBQ2Q7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixTQUFTLEVBQUUsS0FBSztnQkFDaEIsTUFBTSxFQUFFLEtBQUs7YUFDZDtZQUNELEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQ3RCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsS0FBSzthQUNkO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ1g7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQThCLEVBQWlCLEVBQUU7UUFDNUQsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FDRixDQUFBIn0=