"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const config = {};
    // sequelize
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        username: 'root',
        password: '123456',
        port: 3306,
        database: 'backstage-management-system-react18',
        timezone: '+11:00'
    };
    // temporarily disable CSRF
    config.security = {
        csrf: {
            enable: false
        }
    };
    // redis
    config.redis = {
        client: {
            host: '127.0.0.1',
            port: 6379,
            password: '',
            db: 0
        }
    };
    // nodemailer smtp.126.com
    config.smtp = {
        host: 'smtp.126.com',
        port: 465,
        user: 'xsjcTony@126.com',
        pass: 'WAYJJHTOHRIXSZXG'
    };
    // CORS
    config.cors = {
        origin: 'http://127.0.0.1:3000',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        credentials: true
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLmxvY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBQWUsR0FBK0IsRUFBRTtJQUM5QyxNQUFNLE1BQU0sR0FBK0IsRUFBRSxDQUFBO0lBRTdDLFlBQVk7SUFDWixNQUFNLENBQUMsU0FBUyxHQUFHO1FBQ2pCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLElBQUksRUFBRSxXQUFXO1FBQ2pCLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLHFDQUFxQztRQUMvQyxRQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFBO0lBRUQsMkJBQTJCO0lBQzNCLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLEtBQUs7U0FDZDtLQUNGLENBQUE7SUFFRCxRQUFRO0lBQ1IsTUFBTSxDQUFDLEtBQUssR0FBRztRQUNiLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixFQUFFLEVBQUUsQ0FBQztTQUNOO0tBQ0YsQ0FBQTtJQUVELDBCQUEwQjtJQUMxQixNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1osSUFBSSxFQUFFLGNBQWM7UUFDcEIsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLElBQUksRUFBRSxrQkFBa0I7S0FDekIsQ0FBQTtJQUVELE9BQU87SUFDUCxNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1osTUFBTSxFQUFFLHVCQUF1QjtRQUMvQixZQUFZLEVBQUUsZ0NBQWdDO1FBQzlDLFdBQVcsRUFBRSxJQUFJO0tBQ2xCLENBQUE7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9