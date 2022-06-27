"use strict";
/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Role_1 = require("./Role");
const User_1 = require("./User");
const { INTEGER } = sequelize_typescript_1.DataType;
let UserRole = class UserRole extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], UserRole.prototype, "userId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Role_1.Role),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], UserRole.prototype, "roleId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], UserRole.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], UserRole.prototype, "updatedAt", void 0);
UserRole = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'UserRole'
    })
], UserRole);
exports.UserRole = UserRole;
exports.default = () => UserRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2VyUm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0VBQXNFO0FBQ3RFLDZEQUE2RDtBQUM3RCwyREFBMkQ7QUFDM0QsZ0VBQWdFOzs7O0FBRWhFLCtEQVM2QjtBQUM3QixpQ0FBNkI7QUFDN0IsaUNBQTZCO0FBRzdCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRywrQkFBUSxDQUFBO0FBSzVCLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVMsU0FBUSw0QkFBZTtDQWlCNUMsQ0FBQTtBQVpDO0lBSEMsaUNBQVU7SUFDVixJQUFBLGlDQUFVLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxDQUFDO0lBQ3RCLElBQUEsNkJBQU0sRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDOzt3Q0FDSDtBQUt0QjtJQUhDLGlDQUFVO0lBQ1YsSUFBQSxpQ0FBVSxFQUFDLEdBQUcsRUFBRSxDQUFDLFdBQUksQ0FBQztJQUN0QixJQUFBLDZCQUFNLEVBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7d0NBQ0g7QUFHdEI7SUFEQyxnQ0FBUztzQ0FDUyxJQUFJOzJDQUFBO0FBR3ZCO0lBREMsZ0NBQVM7c0NBQ1MsSUFBSTsyQ0FBQTtBQWhCWixRQUFRO0lBSHBCLElBQUEsNEJBQUssRUFBQztRQUNMLFNBQVMsRUFBRSxVQUFVO0tBQ3RCLENBQUM7R0FDVyxRQUFRLENBaUJwQjtBQWpCWSw0QkFBUTtBQW1CckIsa0JBQWUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFBIn0=