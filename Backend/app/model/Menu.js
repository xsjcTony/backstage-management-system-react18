"use strict";
/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-call': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Role_1 = require("./Role");
const RoleMenu_1 = require("./RoleMenu");
const { INTEGER, STRING, BOOLEAN, TINYINT } = sequelize_typescript_1.DataType;
let Menu = class Menu extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], Menu.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Is)(/^(?!\s*$).+/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Menu.prototype, "menuName", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Is)(/^(?!\s*$).+/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Menu.prototype, "menuDescription", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)(BOOLEAN),
    tslib_1.__metadata("design:type", Boolean)
], Menu.prototype, "menuState", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Is)(/^(?!\s*$).+/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Menu.prototype, "menuKey", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Is)(/^(?!\s*$).+/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Menu.prototype, "menuIcon", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], Menu.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(TINYINT.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], Menu.prototype, "level", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Role_1.Role, () => RoleMenu_1.RoleMenu),
    tslib_1.__metadata("design:type", Array)
], Menu.prototype, "roles", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], Menu.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], Menu.prototype, "updatedAt", void 0);
Menu = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'Menu'
    })
], Menu);
exports.Menu = Menu;
exports.default = () => Menu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNFQUFzRTtBQUN0RSw2REFBNkQ7QUFDN0QsMkRBQTJEO0FBQzNELGdFQUFnRTtBQUNoRSx1REFBdUQ7Ozs7QUFFdkQsK0RBYzZCO0FBQzdCLGlDQUE2QjtBQUM3Qix5Q0FBcUM7QUFHckMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLCtCQUFRLENBQUE7QUFLdEQsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSyxTQUFRLDRCQUFXO0NBdURwQyxDQUFBO0FBbERDO0lBSEMsaUNBQVU7SUFDVixvQ0FBYTtJQUNiLElBQUEsNkJBQU0sRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDOztnQ0FDUDtBQU1sQjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLElBQUksQ0FBQztJQUNaLElBQUEseUJBQUUsRUFBQyxhQUFhLENBQUM7SUFDakIsSUFBQSw2QkFBTSxFQUFDLE1BQU0sQ0FBQzs7c0NBQ1M7QUFNeEI7SUFKQyxJQUFBLGdDQUFTLEVBQUMsS0FBSyxDQUFDO0lBQ2hCLElBQUEsNkJBQU0sRUFBQyxJQUFJLENBQUM7SUFDWixJQUFBLHlCQUFFLEVBQUMsYUFBYSxDQUFDO0lBQ2pCLElBQUEsNkJBQU0sRUFBQyxNQUFNLENBQUM7OzZDQUNnQjtBQU0vQjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEsOEJBQU8sRUFBQyxJQUFJLENBQUM7SUFDYixJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDOzt1Q0FDVTtBQU0xQjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLElBQUksQ0FBQztJQUNaLElBQUEseUJBQUUsRUFBQyxhQUFhLENBQUM7SUFDakIsSUFBQSw2QkFBTSxFQUFDLE1BQU0sQ0FBQzs7cUNBQ1E7QUFNdkI7SUFKQyxJQUFBLGdDQUFTLEVBQUMsSUFBSSxDQUFDO0lBQ2YsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEseUJBQUUsRUFBQyxhQUFhLENBQUM7SUFDakIsSUFBQSw2QkFBTSxFQUFDLE1BQU0sQ0FBQzs7c0NBQ1M7QUFLeEI7SUFIQyxJQUFBLGdDQUFTLEVBQUMsS0FBSyxDQUFDO0lBQ2hCLElBQUEsNkJBQU0sRUFBQyxLQUFLLENBQUM7SUFDYixJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7c0NBQ0Q7QUFLeEI7SUFIQyxJQUFBLGdDQUFTLEVBQUMsS0FBSyxDQUFDO0lBQ2hCLElBQUEsNkJBQU0sRUFBQyxLQUFLLENBQUM7SUFDYixJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7bUNBQ0w7QUFHcEI7SUFEQyxJQUFBLG9DQUFhLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLG1CQUFRLENBQUM7O21DQUNNO0FBR2hEO0lBREMsZ0NBQVM7c0NBQ1MsSUFBSTt1Q0FBQTtBQUd2QjtJQURDLGdDQUFTO3NDQUNTLElBQUk7dUNBQUE7QUF0RFosSUFBSTtJQUhoQixJQUFBLDRCQUFLLEVBQUM7UUFDTCxTQUFTLEVBQUUsTUFBTTtLQUNsQixDQUFDO0dBQ1csSUFBSSxDQXVEaEI7QUF2RFksb0JBQUk7QUF5RGpCLGtCQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQSJ9