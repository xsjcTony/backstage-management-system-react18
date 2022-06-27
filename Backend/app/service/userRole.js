"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class UserRoleService extends egg_1.Service {
    /**
     * Add userRole to database (REST API - POST)
     * @param {ModifyUserRoleData} data
     * @param {ICreateOptions} options
     * @return {Promise<UserRole>}
     */
    async createUserRole(data, options) {
        const { userId, roleId } = data;
        const userRole = await this._findUserRole({ userId, roleId });
        if (userRole) {
            throw new Error('message.users.assign-roles.already-assigned');
        }
        return this.ctx.model.UserRole.create(data, options);
    }
    async deleteUserRole(data, options) {
        const { userId, roleId } = data;
        const userRole = await this._findUserRole({ userId, roleId });
        if (!userRole) {
            throw new Error('message.users.assign-roles.not-assigned');
        }
        await userRole.destroy(options);
        return userRole;
    }
    /**
     * Helper functions
     */
    /**
     * Look for **ALL** userRoles from database based on given `WHERE` options
     * @param {IFindOptions<UserRole>["where"]} where
     * @return {Promise<UserRole[]>}
     */
    async findUserRoles(where) {
        return this.ctx.model.UserRole.findAll({
            where,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }
    /**
     * Look for **ONE** userRole from database based on given `WHERE` options
     * @param {IFindOptions<UserRole>["where"]} where
     * @return {Promise<UserRole|null>}
     * @private
     */
    async _findUserRole(where) {
        return this.ctx.model.UserRole.findOne({
            where,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }
}
exports.default = UserRoleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyUm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEOztBQUU3RCw2QkFBNkI7QUFPN0IsTUFBcUIsZUFBZ0IsU0FBUSxhQUFPO0lBRWxEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUF3QixFQUFFLE9BQXVCO1FBQzNFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRS9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzdELElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO1NBQy9EO1FBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBR00sS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUF3QixFQUFFLE9BQStCO1FBQ25GLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRS9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzdELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7U0FDM0Q7UUFFRCxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDL0IsT0FBTyxRQUFRLENBQUE7SUFDakIsQ0FBQztJQUdEOztPQUVHO0lBRUg7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBc0M7UUFDL0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3JDLEtBQUs7WUFDTCxVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQzthQUNwQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNLLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBc0M7UUFDaEUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3JDLEtBQUs7WUFDTCxVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQzthQUNwQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQWxFRCxrQ0FrRUMifQ==