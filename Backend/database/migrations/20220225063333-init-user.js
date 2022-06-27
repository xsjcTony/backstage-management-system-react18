"use strict";
/* eslint 'camelcase': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        const { INTEGER, STRING, DATE } = sequelize_1.DataTypes;
        await queryInterface.createTable('users', {
            id: {
                type: INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: STRING,
                allowNull: true,
                unique: true
            },
            email: {
                type: STRING,
                allowNull: true,
                unique: true
            },
            password: {
                type: STRING,
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
        await queryInterface.dropTable('users');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMjAyMjUwNjMzMzMtaW5pdC11c2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiMjAyMjAyMjUwNjMzMzMtaW5pdC11c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7O0FBRS9CLHlDQUFxRDtBQUdyRCxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsRUFBRSxFQUFFLEtBQUssRUFBRSxjQUE4QixFQUFpQixFQUFFO1FBQzFELE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLHFCQUFTLENBQUE7UUFDM0MsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUN4QyxFQUFFLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsYUFBYSxFQUFFLElBQUk7YUFDcEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLElBQUk7Z0JBQ2YsTUFBTSxFQUFFLElBQUk7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsTUFBTTtnQkFDWixTQUFTLEVBQUUsSUFBSTtnQkFDZixNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsS0FBSzthQUNkO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ1g7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQThCLEVBQWlCLEVBQUU7UUFDNUQsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FDRixDQUFBIn0=