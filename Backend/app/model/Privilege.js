"use strict";
/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-call': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Privilege = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Role_1 = require("./Role");
const RolePrivilege_1 = require("./RolePrivilege");
const { INTEGER, STRING, BOOLEAN, ENUM, TINYINT } = sequelize_typescript_1.DataType;
let Privilege = class Privilege extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], Privilege.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Is)(/^(?!\s*$).+/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Privilege.prototype, "privilegeName", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Is)(/^(?!\s*$).+/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Privilege.prototype, "privilegeDescription", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)(BOOLEAN),
    tslib_1.__metadata("design:type", Boolean)
], Privilege.prototype, "privilegeState", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(ENUM('get', 'post', 'put', 'delete')),
    tslib_1.__metadata("design:type", String)
], Privilege.prototype, "requestMethod", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Is)(/^\/\S*$/),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Privilege.prototype, "privilegeUrl", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], Privilege.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(TINYINT.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], Privilege.prototype, "level", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Role_1.Role, () => RolePrivilege_1.RolePrivilege),
    tslib_1.__metadata("design:type", Array)
], Privilege.prototype, "roles", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], Privilege.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], Privilege.prototype, "updatedAt", void 0);
Privilege = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'Privilege'
    })
], Privilege);
exports.Privilege = Privilege;
exports.default = () => Privilege;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpdmlsZWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJpdmlsZWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzRUFBc0U7QUFDdEUsNkRBQTZEO0FBQzdELDJEQUEyRDtBQUMzRCxnRUFBZ0U7QUFDaEUsdURBQXVEOzs7O0FBRXZELCtEQWM2QjtBQUM3QixpQ0FBNkI7QUFDN0IsbURBQStDO0FBRy9DLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsK0JBQVEsQ0FBQTtBQUs1RCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsNEJBQWdCO0NBc0Q5QyxDQUFBO0FBakRDO0lBSEMsaUNBQVU7SUFDVixvQ0FBYTtJQUNiLElBQUEsNkJBQU0sRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDOztxQ0FDUDtBQU1sQjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLElBQUksQ0FBQztJQUNaLElBQUEseUJBQUUsRUFBQyxhQUFhLENBQUM7SUFDakIsSUFBQSw2QkFBTSxFQUFDLE1BQU0sQ0FBQzs7Z0RBQ2M7QUFNN0I7SUFKQyxJQUFBLGdDQUFTLEVBQUMsS0FBSyxDQUFDO0lBQ2hCLElBQUEsNkJBQU0sRUFBQyxJQUFJLENBQUM7SUFDWixJQUFBLHlCQUFFLEVBQUMsYUFBYSxDQUFDO0lBQ2pCLElBQUEsNkJBQU0sRUFBQyxNQUFNLENBQUM7O3VEQUNxQjtBQU1wQztJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEsOEJBQU8sRUFBQyxJQUFJLENBQUM7SUFDYixJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDOztpREFDZTtBQUsvQjtJQUhDLElBQUEsZ0NBQVMsRUFBQyxJQUFJLENBQUM7SUFDZixJQUFBLDZCQUFNLEVBQUMsS0FBSyxDQUFDO0lBQ2IsSUFBQSw2QkFBTSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7Z0RBQ1c7QUFNeEQ7SUFKQyxJQUFBLGdDQUFTLEVBQUMsSUFBSSxDQUFDO0lBQ2YsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEseUJBQUUsRUFBQyxTQUFTLENBQUM7SUFDYixJQUFBLDZCQUFNLEVBQUMsTUFBTSxDQUFDOzsrQ0FDYTtBQUs1QjtJQUhDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEsNkJBQU0sRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDOzsyQ0FDRDtBQUt4QjtJQUhDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEsNkJBQU0sRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDOzt3Q0FDTDtBQUdwQjtJQURDLElBQUEsb0NBQWEsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsNkJBQWEsQ0FBQzs7d0NBQ1c7QUFHMUQ7SUFEQyxnQ0FBUztzQ0FDUyxJQUFJOzRDQUFBO0FBR3ZCO0lBREMsZ0NBQVM7c0NBQ1MsSUFBSTs0Q0FBQTtBQXJEWixTQUFTO0lBSHJCLElBQUEsNEJBQUssRUFBQztRQUNMLFNBQVMsRUFBRSxXQUFXO0tBQ3ZCLENBQUM7R0FDVyxTQUFTLENBc0RyQjtBQXREWSw4QkFBUztBQXdEdEIsa0JBQWUsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFBIn0=