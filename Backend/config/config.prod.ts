import type { EggAppConfig, PowerPartial } from 'egg'


export default (): PowerPartial<EggAppConfig> => {
  const config: PowerPartial<EggAppConfig> = {}

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '34.116.91.48',
    username: 'root',
    password: 'BMSdemo1-',
    port: 3306,
    database: 'backstage-management-system-react18',
    timezone: '+11:00'
  }

  // temporarily disable CSRF
  config.security = {
    csrf: {
      enable: false
    }
  }

  // redis
  config.redis = {
    client: {
      host: '34.116.91.48',
      port: 6379,
      password: '',
      db: 0
    }
  }

  // nodemailer smtp.126.com
  config.smtp = {
    host: 'smtp.126.com',
    port: 465,
    user: 'xsjcTony@126.com',
    pass: 'WAYJJHTOHRIXSZXG'
  }

  // CORS no longer needed because of Nginx

  // cluster
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '34.116.91.48'
    }
  }

  return config
}
