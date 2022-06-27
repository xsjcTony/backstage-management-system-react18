"use strict";
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_xlsx_1 = tslib_1.__importDefault(require("node-xlsx"));
const captcha_1 = require("../util/captcha");
const verificationEmail_1 = require("../util/verificationEmail");
exports.default = {
    generateCaptcha() {
        return (0, captcha_1.generateCaptcha)(this.ctx);
    },
    verifyCaptcha(clientCaptcha) {
        (0, captcha_1.verifyCaptcha)(this.ctx, clientCaptcha);
    },
    async sendVerificationEmail(to) {
        return (0, verificationEmail_1.sendVerificationEmail)(this.ctx, to);
    },
    verifyEmail(clientCode) {
        (0, verificationEmail_1.verifyEmail)(this.ctx, clientCode);
    },
    encryptByMd5(password) {
        // 加盐处理
        return this._md5(`${password}${this.app.config.keys}`);
    },
    excelToUsers(excel) {
        const w = node_xlsx_1.default.parse(excel.filepath);
        const data = w[0] ? w[0].data : [];
        const keys = data.shift();
        if (!keys.includes('password')
            || !keys.includes('username') && !keys.includes('email')) {
            throw new Error('message.users.import.invalid');
        }
        const users = [];
        data.forEach((row) => {
            if (row instanceof Array) {
                const user = {};
                row.forEach((col, index) => {
                    Object.defineProperty(user, keys[index], {
                        value: col === 0 ? false : col === 1 ? true : col,
                        enumerable: true
                    });
                });
                users.push(user);
            }
        });
        return users;
    },
    userToExcel(user) {
        const res = [];
        for (const key in user) {
            const data = user[key];
            if (typeof data === 'boolean') {
                res.push(data ? 1 : 0);
            }
            else {
                res.push(data);
            }
        }
        return res;
    },
    async removeFile(path) {
        if ((0, node_fs_1.existsSync)(path)) {
            await (0, promises_1.unlink)(path);
        }
    },
    uniqueArray(arr, key) {
        // primitive array
        if (key === undefined) {
            return [...new Set(arr)];
        }
        // object array
        const map = new Map();
        arr.forEach((item) => {
            if (!map.has(item[key])) {
                map.set(item[key], item);
            }
        });
        return [...map.values()];
    },
    /**
     * Helper Functions
     */
    _md5(password) {
        return (0, node_crypto_1.createHash)('md5')
            .update(password)
            .digest('hex');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBNkQ7OztBQUU3RCw2Q0FBd0M7QUFDeEMscUNBQW9DO0FBQ3BDLCtDQUF5QztBQUN6QyxrRUFBNEI7QUFDNUIsNkNBQWdFO0FBQ2hFLGlFQUE4RTtBQVE5RSxrQkFBZTtJQUNiLGVBQWU7UUFDYixPQUFPLElBQUEseUJBQWUsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUdELGFBQWEsQ0FBZ0IsYUFBcUI7UUFDaEQsSUFBQSx1QkFBYSxFQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUdELEtBQUssQ0FBQyxxQkFBcUIsQ0FBZ0IsRUFBVTtRQUNuRCxPQUFPLElBQUEseUNBQXFCLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBR0QsV0FBVyxDQUFnQixVQUFrQjtRQUMzQyxJQUFBLCtCQUFXLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBR0QsWUFBWSxDQUFnQixRQUFnQjtRQUMxQyxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUdELFlBQVksQ0FBQyxLQUFjO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLG1CQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUNs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