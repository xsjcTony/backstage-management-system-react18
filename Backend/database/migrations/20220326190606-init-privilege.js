"use strict";
/* eslint 'camelcase': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        const { INTEGER, STRING, DATE, BOOLEAN, ENUM, TINYINT } = sequelize_1.DataTypes;
        await queryInterface.createTable('privileges', {
            id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            privilege_name: {
                type: STRING,
                allowNull: false,
                unique: true
            },
            privilege_description: {
                type: STRING,
                allowNull: false,
                unique: true
            },
            privilege_state: {
                type: BOOLEAN,
                allowNull: false,
                unique: false,
                defaultValue: true
            },
            request_method: {
                type: ENUM('get', 'post', 'put', 'delete'),
                allowNull: true,
                unique: false
            },
            privilege_url: {
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
        await queryInterface.dropTable('privileges');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjAzMjYxOTA2MDYtaW5pdC1wcml2aWxlZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIyMDIyMDMyNjE5MDYwNi1pbml0LXByaXZpbGVnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCOztBQUUvQix5Q0FBcUQ7QUFHckQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBOEIsRUFBaUIsRUFBRTtRQUMxRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxxQkFBUyxDQUFBO1FBQ25FLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDN0MsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDdEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGFBQWEsRUFBRSxJQUFJO2FBQ3BCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLElBQUksRUFBRSxPQUFPO2dCQUNiLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsS0FBSztnQkFDYixZQUFZLEVBQUUsSUFBSTthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztnQkFDMUMsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsTUFBTSxFQUFFLEtBQUs7YUFDZDtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsTUFBTTtnQkFDWixTQUFTLEVBQUUsSUFBSTtnQkFDZixNQUFNLEVBQUUsS0FBSzthQUNkO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDdEIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLE1BQU0sRUFBRSxLQUFLO2FBQ2Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixTQUFTLEVBQUUsS0FBSztnQkFDaEIsTUFBTSxFQUFFLEtBQUs7YUFDZDtZQUNELFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNYO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ1g7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUE4QixFQUFpQixFQUFFO1FBQzVELE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0NBQ0YsQ0FBQSJ9