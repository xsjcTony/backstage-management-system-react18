"use strict";
/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMenu = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Menu_1 = require("./Menu");
const Role_1 = require("./Role");
const { INTEGER } = sequelize_typescript_1.DataType;
let RoleMenu = class RoleMenu extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Role_1.Role),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], RoleMenu.prototype, "roleId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Menu_1.Menu),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], RoleMenu.prototype, "menuId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], RoleMenu.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], RoleMenu.prototype, "updatedAt", void 0);
RoleMenu = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'RoleMenu'
    })
], RoleMenu);
exports.RoleMenu = RoleMenu;
exports.default = () => RoleMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZU1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSb2xlTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0VBQXNFO0FBQ3RFLDZEQUE2RDtBQUM3RCwyREFBMkQ7QUFDM0QsZ0VBQWdFOzs7O0FBRWhFLCtEQVM2QjtBQUM3QixpQ0FBNkI7QUFDN0IsaUNBQTZCO0FBRzdCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRywrQkFBUSxDQUFBO0FBSzVCLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVMsU0FBUSw0QkFBZTtDQWlCNUMsQ0FBQTtBQVpDO0lBSEMsaUNBQVU7SUFDVixJQUFBLGlDQUFVLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxDQUFDO0lBQ3RCLElBQUEsNkJBQU0sRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDOzt3Q0FDSDtBQUt0QjtJQUhDLGlDQUFVO0lBQ1YsSUFBQSxpQ0FBVSxFQUFDLEdBQUcsRUFBRSxDQUFDLFdBQUksQ0FBQztJQUN0QixJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7d0NBQ0g7QUFHdEI7SUFEQyxnQ0FBUztzQ0FDUyxJQUFJOzJDQUFBO0FBR3ZCO0lBREMsZ0NBQVM7c0NBQ1MsSUFBSTsyQ0FBQTtBQWhCWixRQUFRO0lBSHBCLElBQUEsNEJBQUssRUFBQztRQUNMLFNBQVMsRUFBRSxVQUFVO0tBQ3RCLENBQUM7R0FDVyxRQUFRLENBaUJwQjtBQWpCWSw0QkFBUTtBQW1CckIsa0JBQWUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFBIn0=