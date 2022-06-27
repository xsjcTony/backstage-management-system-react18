"use strict";
/* eslint 'camelcase': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('users', 'github', {
            type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            unique: false,
            defaultValue: 0 // 1 for true, 0 for false
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('users', 'github');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjAzMDgwNDI1MDEtbW9kaWZ5LXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIyMDIyMDMwODA0MjUwMS1tb2RpZnktdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCOztBQUUvQix5Q0FBcUQ7QUFHckQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBOEIsRUFBaUIsRUFBRTtRQUMxRCxNQUFNLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTtZQUNoRCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNoQyxTQUFTLEVBQUUsS0FBSztZQUNoQixNQUFNLEVBQUUsS0FBSztZQUNiLFlBQVksRUFBRSxDQUFDLENBQUMsMEJBQTBCO1NBQzNDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQThCLEVBQWlCLEVBQUU7UUFDNUQsTUFBTSxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0NBQ0YsQ0FBQSJ9