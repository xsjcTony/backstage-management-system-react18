"use strict";
/* eslint 'camelcase': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        const { INTEGER, STRING, DATE, BIGINT } = sequelize_1.DataTypes;
        await queryInterface.createTable('oauths', {
            id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            access_token: {
                type: STRING,
                allowNull: false
            },
            provider: {
                type: STRING,
                allowNull: false
            },
            uid: {
                type: BIGINT.UNSIGNED,
                allowNull: false,
                unique: false
            },
            user_id: {
                type: INTEGER.UNSIGNED,
                allowNull: false,
                unique: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
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
        await queryInterface.dropTable('oauths');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjAzMDgwNDI3MzYtaW5pdC1vYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIjIwMjIwMzA4MDQyNzM2LWluaXQtb2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjs7QUFFL0IseUNBQXFEO0FBR3JELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixFQUFFLEVBQUUsS0FBSyxFQUFFLGNBQThCLEVBQWlCLEVBQUU7UUFDMUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLHFCQUFTLENBQUE7UUFDbkQsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN6QyxFQUFFLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsYUFBYSxFQUFFLElBQUk7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRO2dCQUNyQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsTUFBTSxFQUFFLEtBQUs7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQ3RCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsS0FBSztnQkFDYixVQUFVLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLE9BQU87b0JBQ2QsR0FBRyxFQUFFLElBQUk7aUJBQ1Y7YUFDRjtZQUNELFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNYO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ1g7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUE4QixFQUFpQixFQUFFO1FBQzVELE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0NBQ0YsQ0FBQSJ9