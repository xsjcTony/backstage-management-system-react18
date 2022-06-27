"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class RolePrivilegeService extends egg_1.Service {
    /**
     * Add rolePrivilege to database (REST API - POST)
     * @param {ModifyRolePrivilegeData} data
     * @param {ICreateOptions} options
     * @return {Promise<UserRole>}
     */
    async createRolePrivilege(data, options) {
        const { roleId, privilegeId } = data;
        const rolePrivilege = await this._findUserRole({ roleId, privilegeId });
        if (rolePrivilege) {
            throw new Error(`Privilege (ID: ${privilegeId}) has already been assigned to role (ID: ${roleId})`);
        }
        return this.ctx.model.RolePrivilege.create(data, options);
    }
    /**
     * Delete rolePrivilege from database (REST API - POST)
     * @param {ModifyRolePrivilegeData} data
     * @param {InstanceDestroyOptions} options
     * @return {Promise<RolePrivilege>}
     */
    async deleteRolePrivilege(data, options) {
        const { roleId, privilegeId } = data;
        const rolePrivilege = await this._findUserRole({ roleId, privilegeId });
        if (!rolePrivilege) {
            throw new Error(`Privilege (ID: ${privilegeId}) isn't assigned to role (ID: ${roleId})`);
        }
        await rolePrivilege.destroy(options);
        return rolePrivilege;
    }
    /**
     * Helper functions
     */
    /**
     * Look for **ALL** rolePrivileges from database based on given `WHERE` options
     * @param {IFindOptions<RolePrivilege>["where"]} where
     * @return {Promise<RolePrivilege[]>}
     */
    async findRolePrivileges(where) {
        return this.ctx.model.RolePrivilege.findAll({
            where,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }
    /**
     * Look for **ONE** rolePrivilege from database based on given `WHERE` options
     * @param {IFindOptions<RolePrivilege>["where"]} where
     * @return {Promise<RolePrivilege|null>}
     * @private
     */
    async _findUserRole(where) {
        return this.ctx.model.RolePrivilege.findOne({
            where,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }
}
exports.default = RolePrivilegeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZVByaXZpbGVnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvbGVQcml2aWxlZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE2RDs7QUFFN0QsNkJBQTZCO0FBTzdCLE1BQXFCLG9CQUFxQixTQUFRLGFBQU87SUFFdkQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBNkIsRUFBRSxPQUF1QjtRQUNyRixNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUVwQyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUN2RSxJQUFJLGFBQWEsRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixXQUFXLDRDQUE0QyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1NBQ3BHO1FBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0lBR0Q7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBNkIsRUFBRSxPQUErQjtRQUM3RixNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUVwQyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUN2RSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLFdBQVcsaUNBQWlDLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDekY7UUFFRCxNQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEMsT0FBTyxhQUFhLENBQUE7SUFDdEIsQ0FBQztJQUdEOztPQUVHO0lBRUg7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUEyQztRQUN6RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDMUMsS0FBSztZQUNMLFVBQVUsRUFBRTtnQkFDVixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUdEOzs7OztPQUtHO0lBQ0ssS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUEyQztRQUNyRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDMUMsS0FBSztZQUNMLFVBQVUsRUFBRTtnQkFDVixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBeEVELHVDQXdFQyJ9