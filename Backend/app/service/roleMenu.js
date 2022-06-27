"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class RoleMenuService extends egg_1.Service {
    /**
     * Add roleMenu to database (REST API - POST)
     */
    async createRoleMenu(data, options) {
        const { roleId, menuId } = data;
        const roleMenu = await this._findRoleMenu({ roleId, menuId });
        if (roleMenu) {
            throw new Error(`Menu (ID: ${menuId}) has already been assigned to role (ID: ${roleId})`);
        }
        return this.ctx.model.RoleMenu.create(data, options);
    }
    /**
     * Delete roleMenu from database (REST API - POST)
     */
    async deleteRoleMenu(data, options) {
        const { roleId, menuId } = data;
        const roleMenu = await this._findRoleMenu({ roleId, menuId });
        if (!roleMenu) {
            throw new Error(`Menu (ID: ${menuId}) isn't assigned to role (ID: ${roleId})`);
        }
        await roleMenu.destroy(options);
        return roleMenu;
    }
    /**
     * Helper functions
     */
    /**
     * Look for **ALL** roleMenus from database based on given `WHERE` options
     */
    async findRoleMenus(where) {
        return this.ctx.model.RoleMenu.findAll({
            where,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }
    /**
     * Look for **ONE** roleMenu from database based on given `WHERE` options
     * @private
     */
    async _findRoleMenu(where) {
        return this.ctx.model.RoleMenu.findOne({
            where,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
    }
}
exports.default = RoleMenuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZU1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb2xlTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEOztBQUU3RCw2QkFBNkI7QUFPN0IsTUFBcUIsZUFBZ0IsU0FBUSxhQUFPO0lBRWxEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUF3QixFQUFFLE9BQXVCO1FBQzNFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRS9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzdELElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLE1BQU0sNENBQTRDLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDMUY7UUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFHRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBd0IsRUFBRSxPQUErQjtRQUNuRixNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUUvQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLE1BQU0saUNBQWlDLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDL0U7UUFFRCxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDL0IsT0FBTyxRQUFRLENBQUE7SUFDakIsQ0FBQztJQUdEOztPQUVHO0lBRUg7O09BRUc7SUFDSSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQXNDO1FBQy9ELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNyQyxLQUFLO1lBQ0wsVUFBVSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7YUFDcEM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBR0Q7OztPQUdHO0lBQ0ssS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFzQztRQUNoRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDckMsS0FBSztZQUNMLFVBQVUsRUFBRTtnQkFDVixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBOURELGtDQThEQyJ9