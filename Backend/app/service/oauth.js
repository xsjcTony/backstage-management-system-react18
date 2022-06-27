"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const User_1 = require("../model/User");
class OauthService extends egg_1.Service {
    async getOAuth(data) {
        const res = await this.ctx.model.Oauth.findOne({
            where: {
                uid: data.id,
                provider: data.provider
            },
            include: [{
                    model: User_1.User,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }]
        });
        if (res) {
            return res;
        }
        else {
            throw new Error('message.oauth.invalid');
        }
    }
    async getOAuthById(data) {
        const res = await this.ctx.model.Oauth.findOne({
            where: {
                id: data.id,
                provider: data.provider
            }
        });
        if (res) {
            return res;
        }
        else {
            throw new Error('message.oauth.invalid');
        }
    }
    async createOAuth(accessToken, provider, uid, userId) {
        return this.ctx.model.Oauth.create({
            accessToken,
            provider,
            uid,
            userId
        });
    }
    async updateOAuthUser(id, userId) {
        const oauth = await this.ctx.model.Oauth.findByPk(id);
        if (!oauth) {
            throw new Error(`OAuth doesn't exist`);
        }
        await oauth.update({ userId });
    }
    async deleteOAuth(id) {
        await this.ctx.model.Oauth.destroy({ where: { id } });
    }
}
exports.default = OauthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qix3Q0FBb0M7QUFLcEMsTUFBcUIsWUFBYSxTQUFRLGFBQU87SUFFeEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFtQjtRQUN2QyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDN0MsS0FBSyxFQUFFO2dCQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDeEI7WUFDRCxPQUFPLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsV0FBSTtvQkFDWCxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7cUJBQ2hEO2lCQUNGLENBQUM7U0FDSCxDQUFDLENBQUE7UUFFRixJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sR0FBRyxDQUFBO1NBQ1g7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtTQUN6QztJQUNILENBQUM7SUFHTSxLQUFLLENBQUMsWUFBWSxDQUFDLElBQW1CO1FBQzNDLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUM3QyxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QjtTQUNGLENBQUMsQ0FBQTtRQUVGLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxHQUFHLENBQUE7U0FDWDthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1NBQ3pDO0lBQ0gsQ0FBQztJQUdNLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBbUIsRUFBRSxRQUFnQixFQUFFLEdBQVcsRUFBRSxNQUFjO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNqQyxXQUFXO1lBQ1gsUUFBUTtZQUNSLEdBQUc7WUFDSCxNQUFNO1NBQ1AsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUdNLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBVSxFQUFFLE1BQWM7UUFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRXJELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7U0FDdkM7UUFFRCxNQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFHTSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQVU7UUFDakMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7Q0FDRjtBQWhFRCwrQkFnRUMifQ==