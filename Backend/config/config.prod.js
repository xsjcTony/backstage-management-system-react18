"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const config = {};
    // sequelize
    config.sequelize = {
        dialect: 'mysql',
        host: '34.116.91.48',
        username: 'root',
        password: 'BMSdemo1-',
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
            host: '34.116.91.48',
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
    // CORS no longer needed because of Nginx
    // cluster
    config.cluster = {
        listen: {
            port: 7001,
            hostname: '34.116.91.48'
        }
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcucHJvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlLEdBQStCLEVBQUU7SUFDOUMsTUFBTSxNQUFNLEdBQStCLEVBQUUsQ0FBQTtJQUU3QyxZQUFZO0lBQ1osTUFBTSxDQUFDLFNBQVMsR0FBRztRQUNqQixPQUFPLEVBQUUsT0FBTztRQUNoQixJQUFJLEVBQUUsY0FBYztRQUNwQixRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUUsV0FBVztRQUNyQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxxQ0FBcUM7UUFDL0MsUUFBUSxFQUFFLFFBQVE7S0FDbkIsQ0FBQTtJQUVELDJCQUEyQjtJQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2hCLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxLQUFLO1NBQ2Q7S0FDRixDQUFBO0lBRUQsUUFBUTtJQUNSLE1BQU0sQ0FBQyxLQUFLLEdBQUc7UUFDYixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsY0FBYztZQUNwQixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxFQUFFO1lBQ1osRUFBRSxFQUFFLENBQUM7U0FDTjtLQUNGLENBQUE7SUFFRCwwQkFBMEI7SUFDMUIsTUFBTSxDQUFDLElBQUksR0FBRztRQUNaLElBQUksRUFBRSxjQUFjO1FBQ3BCLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixJQUFJLEVBQUUsa0JBQWtCO0tBQ3pCLENBQUE7SUFFRCx5Q0FBeUM7SUFFekMsVUFBVTtJQUNWLE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDZixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxjQUFjO1NBQ3pCO0tBQ0YsQ0FBQTtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=