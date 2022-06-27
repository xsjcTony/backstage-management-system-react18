"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const sequelize_1 = require("sequelize");
class PrivilegesService extends egg_1.Service {
    /**
     * Get roles by query info (REST API - GET)
     * @param {RoleQueryData} query
     * @return {Promise<{rows: Privilege[], count: number}>}
     */
    async getPrivilegesByQuery(query) {
        let baseOptions = {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        };
        if (query.current && query.pageSize) {
            const currentPageNumber = parseInt(query.current) || 1;
            const pageSize = parseInt(query.pageSize) || 5;
            baseOptions = {
                ...baseOptions,
                limit: pageSize,
                offset: (currentPageNumber - 1) * pageSize
            };
        }
        if (query.levelSorting) {
            baseOptions = {
                ...baseOptions,
                order: [['level', query.levelSorting], ['id', 'asc']]
            };
        }
        let whereOptions = {};
        if (query.privilegeName) {
            whereOptions = {
                ...whereOptions,
                privilegeName: { [sequelize_1.Op.substring]: query.privilegeName }
            };
        }
        if (query.parentId) {
            whereOptions = {
                ...whereOptions,
                parentId: query.parentId
            };
        }
        if (query.requestMethod) {
            whereOptions = {
                ...whereOptions,
                requestMethod: query.requestMethod
            };
        }
        if (query.level) {
            whereOptions = {
                ...whereOptions,
                level: query.level
            };
        }
        return this.ctx.model.Privilege.findAndCountAll({
            ...baseOptions,
            where: whereOptions
        });
    }
    /**
     * Look for privilege based on given `PRIMARY KEY`
     */
    async getPrivilegeById(id) {
        const privilege = await this.ctx.model.Privilege.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (privilege) {
            return privilege;
        }
        else {
            throw new Error('message.privileges.privilege.missing');
        }
    }
    /**
     * Add privilege to database (REST API - POST)
     * @param {ModifyPrivilegeData} data
     * @return {Promise<Privilege>}
     */
    async createPrivilege(data) {
        const { privilegeName, privilegeDescription } = data;
        const p1 = await this._findPrivilege({ privilegeName });
        if (p1) {
            throw new Error('message.privileges.privilege-name.exist');
        }
        const p2 = await this._findPrivilege({ privilegeDescription });
        if (p2) {
            throw new Error('message.privileges.privilege-description.exist');
        }
        return this.ctx.model.Privilege.create(data);
    }
    /**
     * Update privilege in database (REST API - PUT)
     */
    async updatePrivilege(id, data) {
        const privilege = await this.getPrivilegeById(id);
        const { privilegeName, privilegeDescription } = data;
        if (data.privilegeState === undefined) {
            // modifying details
            if (privilegeName !== privilege.privilegeName) {
                const p = await this._findPrivilege({ privilegeName });
                if (p) {
                    throw new Error('message.privileges.privilege-name.exist');
                }
            }
            if (privilegeDescription !== privilege.privilegeDescription) {
                const p = await this._findPrivilege({ privilegeDescription });
                if (p) {
                    throw new Error('message.privileges.privilege-description.exist');
                }
            }
            await privilege.update(data);
        }
        else {
            // modifying state
            if (privilege.parentId === 0) {
                await this.ctx.model.Privilege.update({ privilegeState: data.privilegeState }, { where: { parentId: privilege.id } });
            }
            await privilege.update(data);
        }
        const res = privilege.toJSON();
        delete res.updatedAt;
        return res;
    }
    /**
     * Delete privilege in database (REST API - DELETE)
     * @param {string} id
     * @return {Promise<Privilege>}
     */
    async deletePrivilege(id) {
        const privilege = await this.getPrivilegeById(id);
        if (privilege.parentId === 0) {
            const p = await this._findPrivilege({ parentId: privilege.id });
            if (p) {
                throw new Error('message.privileges.delete.associated');
            }
        }
        await privilege.destroy();
        return privilege;
    }
    /**
     * Helper functions
     */
    /**
     * Look for **ONE** privilege from database based on given `WHERE` options
     * @param {IFindOptions<Role>["where"]} options
     * @return {Promise<Privilege|null>}
     * @private
     */
    async _findPrivilege(options) {
        return this.ctx.model.Privilege.findOne({ where: options });
    }
}
exports.default = PrivilegesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmlsZWdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByaXZpbGVnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE2RDs7QUFFN0QsNkJBQTZCO0FBQzdCLHlDQUE4QjtBQVU5QixNQUFxQixpQkFBa0IsU0FBUSxhQUFPO0lBRXBEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsS0FBeUI7UUFJekQsSUFBSSxXQUFXLEdBQTRCO1lBQ3pDLFVBQVUsRUFBRTtnQkFDVixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO2FBQ3BDO1NBQ0YsQ0FBQTtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ25DLE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFOUMsV0FBVyxHQUFHO2dCQUNaLEdBQUcsV0FBVztnQkFDZCxLQUFLLEVBQUUsUUFBUTtnQkFDZixNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRO2FBQzNDLENBQUE7U0FDRjtRQUVELElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtZQUN0QixXQUFXLEdBQUc7Z0JBQ1osR0FBRyxXQUFXO2dCQUNkLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN0RCxDQUFBO1NBQ0Y7UUFFRCxJQUFJLFlBQVksR0FBcUMsRUFBRSxDQUFBO1FBRXZELElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUN2QixZQUFZLEdBQUc7Z0JBQ2IsR0FBRyxZQUFZO2dCQUNmLGFBQWEsRUFBRSxF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