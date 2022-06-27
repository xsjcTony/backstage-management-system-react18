"use strict";
/* eslint 'camelcase': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        const { INTEGER, DATE } = sequelize_1.DataTypes;
        await queryInterface.createTable('role_privileges', {
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
            privilege_id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                references: {
                    model: 'privileges',
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
        await queryInterface.dropTable('role_privileges');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjAzMjkwNjAzMDAtaW5pdC1yb2xlUHJpdmlsZWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiMjAyMjAzMjkwNjAzMDAtaW5pdC1yb2xlUHJpdmlsZWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7O0FBRS9CLHlDQUFxRDtBQUdyRCxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsRUFBRSxFQUFFLEtBQUssRUFBRSxjQUE4QixFQUFpQixFQUFFO1FBQzFELE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcscUJBQVMsQ0FBQTtRQUVuQyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUU7WUFDbEQsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDdEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFVBQVUsRUFBRTtvQkFDVixLQUFLLEVBQUUsT0FBTztvQkFDZCxHQUFHLEVBQUUsSUFBSTtpQkFDVjtnQkFDRCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsVUFBVSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZO29CQUNuQixHQUFHLEVBQUUsSUFBSTtpQkFDVjtnQkFDRCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNELFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELElBQUksRUFBRSxLQUFLLEVBQUUsY0FBOEIsRUFBaUIsRUFBRTtRQUM1RCxNQUFNLGNBQWMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0NBQ0YsQ0FBQSJ9