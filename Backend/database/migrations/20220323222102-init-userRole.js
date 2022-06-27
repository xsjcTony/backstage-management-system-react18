"use strict";
/* eslint 'camelcase': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        const { INTEGER, DATE } = sequelize_1.DataTypes;
        await queryInterface.createTable('user_roles', {
            user_id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
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
            created_at: {
                type: DATE
            },
            updated_at: {
                type: DATE
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('user_roles');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjAzMjMyMjIxMDItaW5pdC11c2VyUm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIjIwMjIwMzIzMjIyMTAyLWluaXQtdXNlclJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjs7QUFFL0IseUNBQXFEO0FBR3JELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixFQUFFLEVBQUUsS0FBSyxFQUFFLGNBQThCLEVBQWlCLEVBQUU7UUFDMUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxxQkFBUyxDQUFBO1FBRW5DLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDN0MsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDdEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFVBQVUsRUFBRTtvQkFDVixLQUFLLEVBQUUsT0FBTztvQkFDZCxHQUFHLEVBQUUsSUFBSTtpQkFDVjtnQkFDRCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsVUFBVSxFQUFFO29CQUNWLEtBQUssRUFBRSxPQUFPO29CQUNkLEdBQUcsRUFBRSxJQUFJO2lCQUNWO2dCQUNELFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUUsU0FBUzthQUNwQjtZQUNELFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNYO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ1g7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUE4QixFQUFpQixFQUFFO1FBQzVELE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0NBQ0YsQ0FBQSJ9