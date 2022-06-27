"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const Role_1 = require("../model/Role");
class UserService extends egg_1.Service {
    /**
     * Create user in database.
     * @param {RegisterData} data
     * @return {Promise<object>}
     */
    async createUser(data) {
        const encryptedPassword = this.ctx.helper.encryptByMd5(data.password);
        if ('username' in data) {
            // Normal Register
            return this._createUserByUsername(data.username, encryptedPassword, data.github);
        }
        else {
            // Email Register
            return this._createUserByEmail(data.email, encryptedPassword);
        }
    }
    /**
     * Login user
     * @param {LoginData} data
     * @return {Promise<object>}
     */
    async loginUser(data) {
        const { password } = data;
        const encryptedPassword = this.ctx.helper.encryptByMd5(password);
        if ('username' in data) {
            return this._loginUserByUsername(data.username, encryptedPassword);
        }
        else {
            return this._loginUserByEmail(data.email, encryptedPassword);
        }
    }
    async createFullUser(data) {
        const encryptedPassword = this.ctx.helper.encryptByMd5(data.password);
        const { username, email } = data;
        return this._createUser(username, email, encryptedPassword);
    }
    async findByEmail(email) {
        const res = await this._findUser({ email });
        if (res) {
            return res;
        }
        else {
            throw new Error('message.reset-password.verify.email.invalid');
        }
    }
    async resetPassword(email, password) {
        const encryptedPassword = this.ctx.helper.encryptByMd5(password);
        const user = await this._findUser({ email });
        if (!user) {
            throw new Error('message.reset-password.verify.email.invalid');
        }
        await user.update({ password: encryptedPassword });
        const res = user.toJSON();
        delete res.updatedAt;
        return res;
    }
    /**
     * Helper functions
     */
    /**
     * Look for **ONE** user from database based on given where options.
     * @param {WhereOptions} options
     * @return {Promise<User | null>}
     * @private
     */
    async _findUser(options) {
        return this.ctx.model.User.findOne({
            where: options,
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
    }
    /**
     * Create user in database by USERNAME.
     * @param {string} username
     * @param {string} password
     * @param {boolean} [github = false]
     * @return {Promise<User>}
     * @private
     */
    async _createUserByUsername(username, password, github = false) {
        const user = await this._findUser({ username });
        if (user) {
            throw new Error('message.register.username.exist');
        }
        const data = await this.ctx.model.User.create({
            username,
            password,
            github
        });
        const res = await this.ctx.model.User.findByPk(data.id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            include: [{
                    model: Role_1.Role,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    }
                }]
        });
        if (res) {
            return res;
        }
        else {
            throw new Error();
        }
    }
    /**
     * Create user in database by EMAIL.
     * @param {string} email
     * @param {string} password
     * @return {Promise<User>}
     * @private
     */
    async _createUserByEmail(email, password) {
        const user = await this._findUser({ email });
        if (user) {
            throw new Error('message.register.email.exist');
        }
        const data = await this.ctx.model.User.create({
            email,
            password
        });
        const res = await this.ctx.model.User.findByPk(data.id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            include: [{
                    model: Role_1.Role,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    }
                }]
        });
        if (res) {
            return res;
        }
        else {
            throw new Error();
        }
    }
    async _createUser(username, email, password) {
        let user = await this._findUser({ username });
        if (user) {
            throw new Error('message.register.username.exist');
        }
        user = await this._findUser({ email });
        if (user) {
            throw new Error('message.register.email.exist');
        }
        const data = await this.ctx.model.User.create({
            username,
            email,
            password,
            github: true
        });
        const res = await this.ctx.model.User.findByPk(data.id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
        if (res) {
            return res;
        }
        else {
            throw new Error();
        }
    }
    /**
     * Login user by USERNAME
     * @param {string} username
     * @param {string} password
     * @return {Promise<User>}
     * @private
     */
    async _loginUserByUsername(username, password) {
        const user = await this._findUser({ username, password });
        if (!user || !user.userState) {
            throw new Error('message.login.wrong-username');
        }
        return user;
    }
    /**
     * Login user by EMAIL
     * @param {string} email
     * @param {string} password
     * @return {Promise<User>}
     * @private
     */
    async _loginUserByEmail(email, password) {
        const user = await this._findUser({ email, password });
        if (!user || !user.userState) {
            throw new Error('message.login.wrong-email');
        }
        return user;
    }
}
exports.default = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFDN0Isd0NBQW9DO0FBTXBDLE1BQXFCLFdBQVksU0FBUSxhQUFPO0lBRTlDOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQWtCO1FBQ3hDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVyRSxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsa0JBQWtCO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ2pGO2FBQU07WUFDTCxpQkFBaUI7WUFDakIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1NBQzlEO0lBQ0gsQ0FBQztJQUdEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQWU7UUFDcEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUN6QixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVoRSxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1NBQ25FO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUE7U0FDN0Q7SUFDSCxDQUFDO0lBR00sS0FBSyxDQUFDLGNBQWMs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