"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const egg_1 = require("egg");
const sequelize_1 = require("sequelize");
const Menu_1 = require("../model/Menu");
const Privilege_1 = require("../model/Privilege");
const Role_1 = require("../model/Role");
class UsersService extends egg_1.Service {
    /**
     * Get all users from database (REST API - GET)
     * @return {Promise<User[]>}
     */
    async getAllUsers() {
        return this.ctx.model.User.findAll({
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
    }
    /**
     * Get users by query info (REST API - GET)
     * @param {UserQueryData} query
     * @return {Promise<{rows: User[], count: number}>}
     */
    async getUsersByQuery(query) {
        let baseOptions = {
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
        };
        if (query.current && query.pageSize) {
            const currentPageNumber = parseInt(query.current) || 1;
            const pageSize = parseInt(query.pageSize) || 10;
            baseOptions = {
                ...baseOptions,
                limit: pageSize,
                offset: (currentPageNumber - 1) * pageSize
            };
        }
        const { username, email } = query;
        let whereOptions = {};
        if (username) {
            whereOptions = {
                ...whereOptions,
                username: { [sequelize_1.Op.substring]: username }
            };
        }
        if (email) {
            whereOptions = {
                ...whereOptions,
                email: { [sequelize_1.Op.substring]: email }
            };
        }
        const rows = await this.ctx.model.User.findAll({
            ...baseOptions,
            where: whereOptions
        });
        const count = await this.ctx.model.User.count({
            where: whereOptions
        });
        return {
            rows,
            count
        };
    }
    /**
     * Add user to database (REST API - POST)
     * @param {AddUserData | ImportUserData} data
     * @param {ICreateOptions} options
     * @return {Promise<User>}
     */
    async createUser(data, options) {
        const obj = { ...data };
        const { username, email } = obj;
        obj.password = this.ctx.helper.encryptByMd5(data.password);
        if (email) {
            const user = await this._findUser({ email });
            if (user) {
                throw new Error(`message.register.email.exist`);
            }
        }
        if (username) {
            const user = await this._findUser({ username });
            if (user) {
                throw new Error(`message.register.username.exist`);
            }
        }
        if (!username && !email) {
            throw new Error('Require at least one of username and email');
        }
        return this.ctx.model.User.create(obj, options);
    }
    /**
     * Delete user in database (REST API - DELETE)
     * @param {string} id
     * @return {Promise<User>}
     */
    async deleteUser(id) {
        const user = await this.ctx.model.User.findByPk(id, {
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
        if (user) {
            await user.destroy();
            if (!user.avatarUrl.endsWith('avatar.jpg')) {
                const avatarFile = node_path_1.default.join(this.config.baseDir, 'app', user.avatarUrl);
                await this.ctx.helper.removeFile(avatarFile);
            }
            return user;
        }
        else {
            throw new Error('message.users.user.missing');
        }
    }
    /**
     * Update user in database (REST API - PUT)
     * @param {string} id
     * @param {AddUserData} data
     * @return {Promise<User>}
     */
    async updateUser(id, data) {
        const user = await this.getUserById(id);
        const { username, email } = data;
        if (data.password) {
            data.password = this.ctx.helper.encryptByMd5(data.password);
        }
        if (email) {
            const u = await this._findUser({ email });
            if (u && u.email !== email) {
                throw new Error(`message.register.email.exist`);
            }
        }
        if (username) {
            const u = await this._findUser({ username });
            if (u && u.username !== username) {
                throw new Error(`message.register.username.exist`);
            }
        }
        if (data.userState === undefined && !username && !email) {
            throw new Error('Require at least one of username and email');
        }
        await user.update(data);
        const res = user.toJSON();
        delete res.updatedAt;
        return res;
    }
    /**
     * Get user by ID (Primary key) (REST API - GET)
     * @param {string} id
     * @return {Promise<User>}
     */
    async getUserById(id) {
        const user = await this.ctx.model.User.findByPk(id, {
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
                    },
                    include: [
                        {
                            model: Privilege_1.Privilege,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                            through: {
                                attributes: []
                            }
                        },
                        {
                            model: Menu_1.Menu,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                            through: {
                                attributes: []
                            }
                        }
                    ]
                }]
        });
        if (user) {
            return user;
        }
        else {
            throw new Error('message.users.user.missing');
        }
    }
    /**
     * Helper functions
     */
    /**
     * Look for **ONE** user from database based on given `WHERE` options.
     * @param {WhereOptions} options
     * @return {Promise<User | null>}
     * @private
     */
    async _findUser(options) {
        return this.ctx.model.User.findOne({ where: options });
    }
}
exports.default = UsersService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEOzs7QUFFN0Qsa0VBQTRCO0FBQzVCLDZCQUE2QjtBQUM3Qix5Q0FBOEI7QUFDOUIsd0NBQW9DO0FBQ3BDLGtEQUE4QztBQUM5Qyx3Q0FBb0M7QUFhcEMsTUFBcUIsWUFBYSxTQUFRLGFBQU87SUFFL0M7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLFdBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLFVBQVUsRUFBRTtnQkFDVixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQzthQUNoRDtZQUNELE9BQU8sRUFBRSxDQUFDO29CQUNSLEtBQUssRUFBRSxXQUFJO29CQUNYLFVBQVUsRUFBRTt3QkFDVixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO3FCQUNwQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsVUFBVSxFQUFFLEVBQUU7cUJBQ2Y7aUJBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQTtJQUNKLENBQUM7SUFHRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFvQjtRQUkvQyxJQUFJLFdBQVcsR0FBdUI7WUFDcEMsVUFBVSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO2FBQ2hEO1lBQ0QsT0FBTyxFQUFFLENBQUM7b0JBQ1IsS0FBSyxFQUFFLFdBQUk7b0JBQ1gsVUFBVSxFQUFFO3dCQUNWLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7cUJBQ3BDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxVQUFVLEVBQUUsRUFBRTtxQkFDZjtpQkFDRixDQUFDO1NBQ0gsQ0FBQTtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sSUFB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