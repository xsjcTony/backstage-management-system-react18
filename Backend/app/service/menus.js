"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const sequelize_1 = require("sequelize");
class MenusService extends egg_1.Service {
    /**
     * Get menus by query info (REST API - GET)
     */
    async getMenusByQuery(query) {
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
        if (query.menuDescription) {
            whereOptions = {
                ...whereOptions,
                menuDescription: { [sequelize_1.Op.substring]: query.menuDescription }
            };
        }
        if (query.parentId) {
            whereOptions = {
                ...whereOptions,
                parentId: query.parentId
            };
        }
        if (query.menuKey) {
            whereOptions = {
                ...whereOptions,
                menuKey: { [sequelize_1.Op.substring]: query.menuKey }
            };
        }
        if (query.level) {
            whereOptions = {
                ...whereOptions,
                level: query.level
            };
        }
        return this.ctx.model.Menu.findAndCountAll({
            ...baseOptions,
            where: whereOptions
        });
    }
    /**
     * Look for menu based on given `PRIMARY KEY`
     */
    async getMenuById(id) {
        const menu = await this.ctx.model.Menu.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (menu) {
            return menu;
        }
        else {
            throw new Error('message.menus.menu.missing');
        }
    }
    /**
     * Add menu to database (REST API - POST)
     */
    async createMenu(data) {
        const { menuName, menuDescription, menuKey } = data;
        const p1 = await this._findMenu({ menuName });
        if (p1) {
            throw new Error('message.menus.menu-name.exist');
        }
        const p2 = await this._findMenu({ menuDescription });
        if (p2) {
            throw new Error('message.menus.menu-description.exist');
        }
        const p3 = await this._findMenu({ menuKey });
        if (p3) {
            throw new Error('message.menus.menu-key.exist');
        }
        return this.ctx.model.Menu.create(data);
    }
    /**
     * Update menu in database (REST API - PUT)
     */
    async updateMenu(id, data) {
        const menu = await this.getMenuById(id);
        const { menuName, menuDescription, menuKey } = data;
        if (data.menuState === undefined) {
            // modifying details
            if (menuName !== menu.menuName) {
                const p = await this._findMenu({ menuName });
                if (p) {
                    throw new Error('message.menus.menu-name.exist');
                }
            }
            if (menuDescription !== menu.menuDescription) {
                const p = await this._findMenu({ menuDescription });
                if (p) {
                    throw new Error('message.menus.menu-description.exist');
                }
            }
            if (menuKey !== menu.menuKey) {
                const p = await this._findMenu({ menuKey });
                if (p) {
                    throw new Error('message.menus.menu-key.exist');
                }
            }
            await menu.update(data);
        }
        else {
            // modifying state
            if (menu.parentId === 0) {
                await this.ctx.model.Menu.update({ menuState: data.menuState }, { where: { parentId: menu.id } });
            }
            await menu.update(data);
        }
        const res = menu.toJSON();
        delete res.updatedAt;
        return res;
    }
    /**
     * Delete menu in database (REST API - DELETE)
     */
    async deleteMenu(id) {
        const menu = await this.getMenuById(id);
        if (menu.parentId === 0) {
            const p = await this._findMenu({ parentId: menu.id });
            if (p) {
                throw new Error('message.menus.delete.associated');
            }
        }
        await menu.destroy();
        return menu;
    }
    /**
     * Helper functions
     */
    /**
     * Look for **ONE** menu from database based on given `WHERE` options
     * @private
     */
    async _findMenu(options) {
        return this.ctx.model.Menu.findOne({ where: options });
    }
}
exports.default = MenusService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZW51cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEOztBQUU3RCw2QkFBNkI7QUFDN0IseUNBQThCO0FBTTlCLE1BQXFCLFlBQWEsU0FBUSxhQUFPO0lBRS9DOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFvQjtRQUkvQyxJQUFJLFdBQVcsR0FBdUI7WUFDcEMsVUFBVSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7YUFDcEM7U0FDRixDQUFBO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbkMsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0RCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUU5QyxXQUFXLEdBQUc7Z0JBQ1osR0FBRyxXQUFXO2dCQUNkLEtBQUssRUFBRSxRQUFRO2dCQUNmLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVE7YUFDM0MsQ0FBQTtTQUNGO1FBRUQsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ3RCLFdBQVcsR0FBRztnQkFDWixHQUFHLFdBQVc7Z0JBQ2QsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3RELENBQUE7U0FDRjtRQUVELElBQUksWUFBWSxHQUFnQyxFQUFFLENBQUE7UUFFbEQsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLFlBQVksR0FBRztnQkFDYixHQUFHLFlBQVk7Z0JBQ2YsZUFBZSxFQUFFLEVBQUUsQ0FBQyxjQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLGVBQWUsRUFBRTthQUMzRCxDQUFBO1NBQ0Y7UUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsWUFBWSxHQUFHO2dCQUNiLEdBQUcsWUFBWTtnQkFDZixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7YUFDekIsQ0FBQTtTQUNGO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2pCLFlBQVksR0FBRztnQkFDYixHQUFHLFlBQVk7Z0JBQ2YsT0FBTyxFQUFFLEVBQUUsQ0FBQyxjQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTthQUMzQyxDQUFBO1NBQ0Y7UUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDZixZQUFZLEdBQUc7Z0JBQ2IsR0FBRyxZQUFZO2dCQUNmLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzthQUNuQixDQUFBO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDekMsR0FBRyxXQUFXO1lBQ2QsS0FBSyxFQUFFLFlBQVk7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUdEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFVO1FBQ2pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsVUFBVSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7YUFDcEM7U0FDRixDQUFDLENBQUE7UUFFRixJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFBO1NBQ1o7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtTQUM5QztJQUNILENBQUM7SUFHRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBaUI7UUFDdkMsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRW5ELE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDN0MsSUFBSSxFQUFFLEVBQUU7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUE7U0FDakQ7UUFFRCxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFBO1FBQ3BELElBQUksRUFBRSxFQUFFO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO1NBQ3hEO1FBRUQsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUM1QyxJQUFJLEVBQUUsRUFBRTtZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQTtTQUNoRDtRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBR0Q7O09BRUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQVUsRUFBRSxJQUFvQjtRQUN0RCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkMsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRW5ELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDaEMsb0JBQW9CO1lBQ3BCLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0JBQzVDLElBQUksQ0FBQyxFQUFFO29CQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQTtpQkFDakQ7YUFDRjtZQUVELElBQUksZUFBZSxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzVDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUE7Z0JBQ25ELElBQUksQ0FBQyxFQUFFO29CQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtpQkFDeEQ7YUFDRjtZQUVELElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzVCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7Z0JBQzNDLElBQUksQ0FBQyxFQUFFO29CQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQTtpQkFDaEQ7YUFDRjtZQUVELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN4QjthQUFNO1lBQ0wsa0JBQWtCO1lBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUNsRztZQUVELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN4QjtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQVUsQ0FBQTtRQUNqQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUE7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBR0Q7O09BRUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQVU7UUFDaEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRXZDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7WUFDdkIsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ3JELElBQUksQ0FBQyxFQUFFO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTthQUNuRDtTQUNGO1FBRUQsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDcEIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBR0Q7O09BRUc7SUFFSDs7O09BR0c7SUFDSyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQW9DO1FBQzFELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ3hELENBQUM7Q0FDRjtBQTVMRCwrQkE0TEMifQ==