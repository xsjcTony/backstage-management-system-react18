"use strict";
/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePrivilege = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Privilege_1 = require("./Privilege");
const Role_1 = require("./Role");
const { INTEGER } = sequelize_typescript_1.DataType;
let RolePrivilege = class RolePrivilege extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Role_1.Role),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], RolePrivilege.prototype, "roleId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Privilege_1.Privilege),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], RolePrivilege.prototype, "privilegeId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], RolePrivilege.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], RolePrivilege.prototype, "updatedAt", void 0);
RolePrivilege = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'RolePrivilege'
    })
], RolePrivilege);
exports.RolePrivilege = RolePrivilege;
exports.default = () => RolePrivilege;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZVByaXZpbGVnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJvbGVQcml2aWxlZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNFQUFzRTtBQUN0RSw2REFBNkQ7QUFDN0QsMkRBQTJEO0FBQzNELGdFQUFnRTs7OztBQUVoRSwrREFTNkI7QUFDN0IsMkNBQXVDO0FBQ3ZDLGlDQUE2QjtBQUc3QixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsK0JBQVEsQ0FBQTtBQUs1QixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsNEJBQW9CO0NBaUJ0RCxDQUFBO0FBWkM7SUFIQyxpQ0FBVTtJQUNWLElBQUEsaUNBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLENBQUM7SUFDdEIsSUFBQSw2QkFBTSxFQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7OzZDQUNIO0FBS3RCO0lBSEMsaUNBQVU7SUFDVixJQUFBLGlDQUFVLEVBQUMsR0FBRyxFQUFFLENBQUMscUJBQVMsQ0FBQztJQUMzQixJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7a0RBQ0U7QUFHM0I7SUFEQyxnQ0FBUztzQ0FDUyxJQUFJO2dEQUFBO0FBR3ZCO0lBREMsZ0NBQVM7c0NBQ1MsSUFBSTtnREFBQTtBQWhCWixhQUFhO0lBSHpCLElBQUEsNEJBQUssRUFBQztRQUNMLFNBQVMsRUFBRSxlQUFlO0tBQzNCLENBQUM7R0FDVyxhQUFhLENBaUJ6QjtBQWpCWSxzQ0FBYTtBQW1CMUIsa0JBQWUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFBIn0=