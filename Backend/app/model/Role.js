"use strict";
/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Menu_1 = require("./Menu");
const Privilege_1 = require("./Privilege");
const RoleMenu_1 = require("./RoleMenu");
const RolePrivilege_1 = require("./RolePrivilege");
const User_1 = require("./User");
const UserRole_1 = require("./UserRole");
const { INTEGER, STRING, BOOLEAN } = sequelize_typescript_1.DataType;
let Role = class Role extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Is)(/^(?!\s*$).+/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "roleName", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Is)(/^(?!\s*$).+/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "roleDescription", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)(BOOLEAN),
    tslib_1.__metadata("design:type", Boolean)
], Role.prototype, "roleState", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.User, () => UserRole_1.UserRole),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "users", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Privilege_1.Privilege, () => RolePrivilege_1.RolePrivilege),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "privileges", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Menu_1.Menu, () => RoleMenu_1.RoleMenu),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "menus", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], Role.prototype, "updatedAt", void 0);
Role = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'Role'
    })
], Role);
exports.Role = Role;
exports.default = () => Role;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNFQUFzRTtBQUN0RSw2REFBNkQ7QUFDN0QsMkRBQTJEO0FBQzNELGdFQUFnRTs7OztBQUVoRSwrREFjNkI7QUFDN0IsaUNBQTZCO0FBQzdCLDJDQUF1QztBQUN2Qyx5Q0FBcUM7QUFDckMsbURBQStDO0FBQy9DLGlDQUE2QjtBQUM3Qix5Q0FBcUM7QUFHckMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsK0JBQVEsQ0FBQTtBQUs3QyxJQUFhLElBQUksR0FBakIsTUFBYSxJQUFLLFNBQVEsNEJBQVc7Q0F1Q3BDLENBQUE7QUFsQ0M7SUFIQyxpQ0FBVTtJQUNWLG9DQUFhO0lBQ2IsSUFBQSw2QkFBTSxFQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O2dDQUNQO0FBTWxCO0lBSkMsSUFBQSxnQ0FBUyxFQUFDLEtBQUssQ0FBQztJQUNoQixJQUFBLDZCQUFNLEVBQUMsSUFBSSxDQUFDO0lBQ1osSUFBQSx5QkFBRSxFQUFDLGFBQWEsQ0FBQztJQUNqQixJQUFBLDZCQUFNLEVBQUMsTUFBTSxDQUFDOztzQ0FDUztBQU14QjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLElBQUksQ0FBQztJQUNaLElBQUEseUJBQUUsRUFBQyxhQUFhLENBQUM7SUFDakIsSUFBQSw2QkFBTSxFQUFDLE1BQU0sQ0FBQzs7NkNBQ2dCO0FBTS9CO0lBSkMsSUFBQSxnQ0FBUyxFQUFDLEtBQUssQ0FBQztJQUNoQixJQUFBLDZCQUFNLEVBQUMsS0FBSyxDQUFDO0lBQ2IsSUFBQSw4QkFBTyxFQUFDLElBQUksQ0FBQztJQUNiLElBQUEsNkJBQU0sRUFBQyxPQUFPLENBQUM7O3VDQUNVO0FBRzFCO0lBREMsSUFBQSxvQ0FBYSxFQUFDLEdBQUcsRUFBRSxDQUFDLFdBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxtQkFBUSxDQUFDOzttQ0FDTTtBQUdoRDtJQURDLElBQUEsb0NBQWEsRUFBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLDZCQUFhLENBQUM7O3dDQUNnQjtBQUdwRTtJQURDLElBQUEsb0NBQWEsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsbUJBQVEsQ0FBQzs7bUNBQ007QUFHaEQ7SUFEQyxnQ0FBUztzQ0FDUyxJQUFJO3VDQUFBO0FBR3ZCO0lBREMsZ0NBQVM7c0NBQ1MsSUFBSTt1Q0FBQTtBQXRDWixJQUFJO0lBSGhCLElBQUEsNEJBQUssRUFBQztRQUNMLFNBQVMsRUFBRSxNQUFNO0tBQ2xCLENBQUM7R0FDVyxJQUFJLENBdUNoQjtBQXZDWSxvQkFBSTtBQXlDakIsa0JBQWUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBIn0=