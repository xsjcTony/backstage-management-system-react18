"use strict";
/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const { INTEGER, STRING, BIGINT } = sequelize_typescript_1.DataType;
let Oauth = class Oauth extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    tslib_1.__metadata("design:type", Number)
], Oauth.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Oauth.prototype, "accessToken", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(STRING),
    tslib_1.__metadata("design:type", String)
], Oauth.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(BIGINT.UNSIGNED),
    tslib_1.__metadata("design:type", String)
], Oauth.prototype, "uid", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(false),
    (0, sequelize_typescript_1.Column)(INTEGER.UNSIGNED),
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    tslib_1.__metadata("design:type", Number)
], Oauth.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    tslib_1.__metadata("design:type", User_1.User)
], Oauth.prototype, "user", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], Oauth.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], Oauth.prototype, "updatedAt", void 0);
Oauth = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'Oauth'
    })
], Oauth);
exports.Oauth = Oauth;
exports.default = () => Oauth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0VBQXNFO0FBQ3RFLDZEQUE2RDtBQUM3RCwyREFBMkQ7QUFDM0QsZ0VBQWdFOzs7O0FBRWhFLCtEQWE2QjtBQUM3QixpQ0FBNkI7QUFHN0IsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsK0JBQVEsQ0FBQTtBQUs1QyxJQUFhLEtBQUssR0FBbEIsTUFBYSxLQUFNLFNBQVEsNEJBQVk7Q0FvQ3RDLENBQUE7QUEvQkM7SUFIQyxpQ0FBVTtJQUNWLG9DQUFhO0lBQ2IsSUFBQSw2QkFBTSxFQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O2lDQUNQO0FBS2xCO0lBSEMsSUFBQSxnQ0FBUyxFQUFDLEtBQUssQ0FBQztJQUNoQixJQUFBLDZCQUFNLEVBQUMsS0FBSyxDQUFDO0lBQ2IsSUFBQSw2QkFBTSxFQUFDLE1BQU0sQ0FBQzs7MENBQ1k7QUFLM0I7SUFIQyxJQUFBLGdDQUFTLEVBQUMsS0FBSyxDQUFDO0lBQ2hCLElBQUEsNkJBQU0sRUFBQyxLQUFLLENBQUM7SUFDYixJQUFBLDZCQUFNLEVBQUMsTUFBTSxDQUFDOzt1Q0FDUztBQUt4QjtJQUhDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEsNkJBQU0sRUFBQyxNQUFNLENBQUMsUUFBUSxDQUFDOztrQ0FDTDtBQU1uQjtJQUpDLElBQUEsZ0NBQVMsRUFBQyxLQUFLLENBQUM7SUFDaEIsSUFBQSw2QkFBTSxFQUFDLEtBQUssQ0FBQztJQUNiLElBQUEsNkJBQU0sRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3hCLElBQUEsaUNBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLENBQUM7O3FDQUNEO0FBR3RCO0lBREMsSUFBQSxnQ0FBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLFdBQUksQ0FBQztzQ0FDUixXQUFJO21DQUFBO0FBR2xCO0lBREMsZ0NBQVM7c0NBQ1MsSUFBSTt3Q0FBQTtBQUd2QjtJQURDLGdDQUFTO3NDQUNTLElBQUk7d0NBQUE7QUFuQ1osS0FBSztJQUhqQixJQUFBLDRCQUFLLEVBQUM7UUFDTCxTQUFTLEVBQUUsT0FBTztLQUNuQixDQUFDO0dBQ1csS0FBSyxDQW9DakI7QUFwQ1ksc0JBQUs7QUFzQ2xCLGtCQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQSJ9