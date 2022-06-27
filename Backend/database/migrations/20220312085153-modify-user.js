"use strict";
/* eslint 'camelcase': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('users', 'user_state', {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: true
        });
        await queryInterface.addColumn('users', 'avatar_url', {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            unique: false,
            defaultValue: '/public/assets/images/avatars/avatar.jpg'
        });
        await queryInterface.changeColumn('users', 'github', {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('users', 'user_state');
        await queryInterface.removeColumn('users', 'avatar_url');
        await queryInterface.changeColumn('users', 'github', {
            type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            unique: false,
            defaultValue: 0 // 1 for true, 0 for false
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjAzMTIwODUxNTMtbW9kaWZ5LXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIyMDIyMDMxMjA4NTE1My1tb2RpZnktdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCOztBQUUvQix5Q0FBcUQ7QUFHckQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBOEIsRUFBaUIsRUFBRTtRQUMxRCxNQUFNLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtZQUNwRCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO1lBQ3ZCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7WUFDcEQsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTTtZQUN0QixTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsWUFBWSxFQUFFLDBDQUEwQztTQUN6RCxDQUFDLENBQUE7UUFFRixNQUFNLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTtZQUNuRCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO1lBQ3ZCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELElBQUksRUFBRSxLQUFLLEVBQUUsY0FBOEIsRUFBaUIsRUFBRTtRQUM1RCxNQUFNLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFBO1FBQ3hELE1BQU0sY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFDeEQsTUFBTSxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUU7WUFDbkQsSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDaEMsU0FBUyxFQUFFLEtBQUs7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixZQUFZLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQjtTQUMzQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSJ9