"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const sequelize_1 = require("sequelize");
const Menu_1 = require("../model/Menu");
const Privilege_1 = require("../model/Privilege");
class RolesService extends egg_1.Service {
    /**
     * Get roles by query info (REST API - GET)
     * @param {RoleQueryData} query
     * @return {Promise<{rows: Role[], count: number}>}
     */
    async getRolesByQuery(query) {
        let baseOptions = {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
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
        let whereOptions = {};
        if (query.roleName) {
            whereOptions = {
                ...whereOptions,
                roleName: { [sequelize_1.Op.substring]: query.roleName }
            };
        }
        const rows = await this.ctx.model.Role.findAll({
            ...baseOptions,
            where: whereOptions
        });
        const count = await this.ctx.model.Role.count({
            where: whereOptions
        });
        return {
            rows,
            count
        };
    }
    /**
     * Add role to database (REST API - POST)
     * @param {ModifyRoleData} data
     * @return {Promise<Role>}
     */
    async createRole(data) {
        const { roleName, roleDescription } = data;
        const r1 = await this._findRole({ roleName });
        if (r1) {
            throw new Error('message.roles.role-name.exist');
        }
        const r2 = await this._findRole({ roleDescription });
        if (r2) {
            throw new Error('message.roles.role-description.exist');
        }
        return this.ctx.model.Role.create(data);
    }
    /**
     * Delete role in database (REST API - DELETE)
     * @param {string} id
     * @return {Promise<Role>}
     */
    async deleteRole(id) {
        const role = await this.getRoleById(id);
        await role.destroy();
        return role;
    }
    /**
     * Update role in database (REST API - PUT)
     * @param {string} id
     * @param {ModifyRoleData} data
     * @return {Promise<Role>}
     */
    async updateRole(id, data) {
        const role = await this.getRoleById(id);
        const { roleName, roleDescription } = data;
        if (roleName) {
            const r = await this._findRole({ roleName });
            if (r && r.roleName !== roleName) {
                throw new Error('message.roles.role-name.exist');
            }
        }
        if (roleDescription) {
            const r = await this._findRole({ roleDescription });
            if (r && r.roleDescription !== roleDescription) {
                throw new Error('message.roles.role-description.exist');
            }
        }
        await role.update(data);
        const res = role.toJSON();
        delete res.updatedAt;
        return res;
    }
    /**
     * Look for role based on given `PRIMARY KEY`
     * @param {string} id
     * @return {Promise<Role>}
     * @private
     */
    async getRoleById(id) {
        const role = await this.ctx.model.Role.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
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
        });
        if (role) {
            return role;
        }
        else {
            throw new Error('message.roles.role.missing');
        }
    }
    /**
     * Helper functions
     */
    /**
     * Look for **ONE** role from database based on given `WHERE` options
     * @param {IFindOptions<Role>["where"]} options
     * @return {Promise<Role|null>}
     * @private
     */
    async _findRole(options) {
        return this.ctx.model.Role.findOne({ where: options });
    }
}
exports.default = RolesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb2xlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEOztBQUU3RCw2QkFBNkI7QUFDN0IseUNBQThCO0FBQzlCLHdDQUFvQztBQUNwQyxrREFBOEM7QUFVOUMsTUFBcUIsWUFBYSxTQUFRLGFBQU87SUFFL0M7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBb0I7UUFJL0MsSUFBSSxXQUFXLEdBQXVCO1lBQ3BDLFVBQVUsRUFBRTtnQkFDVixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQO29CQUNFLEtBQUssRUFBRSxxQkFBUztvQkFDaEIsVUFBVSxFQUFFO3dCQUNWLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7cUJBQ3BDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxVQUFVLEVBQUUsRUFBRTtxQkFDZjtpQkFDRjtnQkFDRDtvQkFDRSxLQUFLLEVBQUUsV0FBSTtvQkFDWCxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztxQkFDcEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFVBQVUsRUFBRSxFQUFFO3FCQUNmO2lCQUNGO2FBQ0Y7U0FDRixDQUFBO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbkMsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0RCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUU5QyxXQUFXLEdBQUc7Z0JBQ1osR0FBRyxXQUFXO2dCQUNkLEtBQUssRUFBRSxRQUFRO2dCQUNmLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixHQUFHLENB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