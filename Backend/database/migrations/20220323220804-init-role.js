"use strict";
/* eslint 'camelcase': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        const { INTEGER, STRING, DATE, BOOLEAN } = sequelize_1.DataTypes;
        await queryInterface.createTable('roles', {
            id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            role_name: {
                type: STRING,
                allowNull: false,
                unique: true
            },
            role_description: {
                type: STRING,
                allowNull: false,
                unique: true
            },
            role_state: {
                type: BOOLEAN,
                allowNull: false,
                unique: false,
                defaultValue: true
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
        await queryInterface.dropTable('roles');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjAzMjMyMjA4MDQtaW5pdC1yb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiMjAyMjAzMjMyMjA4MDQtaW5pdC1yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7O0FBRS9CLHlDQUFxRDtBQUdyRCxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsRUFBRSxFQUFFLEtBQUssRUFBRSxjQUE4QixFQUFpQixFQUFFO1FBQzFELE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxxQkFBUyxDQUFBO1FBQ3BELE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDeEMsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDdEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGFBQWEsRUFBRSxJQUFJO2FBQ3BCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxPQUFPO2dCQUNiLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsS0FBSztnQkFDYixZQUFZLEVBQUUsSUFBSTthQUNuQjtZQUNELFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNYO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ1g7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUE4QixFQUFpQixFQUFFO1FBQzVELE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0NBQ0YsQ0FBQSJ9