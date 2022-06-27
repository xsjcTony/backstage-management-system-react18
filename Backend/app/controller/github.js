"use strict";
/* eslint 'camelcase': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_url_1 = require("node:url");
const egg_1 = require("egg");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
class GithubController extends egg_1.Controller {
    /**
     * @api {get} /github Login by GitHub
     * @apiVersion 1.0.0
     * @apiName githubLogin
     * @apiGroup GitHub
     *
     * @apiDescription This page will redirect to the github authorization page.
     */
    async getLoginView() {
        const baseURL = 'https://github.com/login/oauth/authorize';
        const options = {
            client_id: 'f9c9bc30f7f29b46a30a',
            scope: 'user'
        };
        const url = `${baseURL}?${new node_url_1.URLSearchParams(options).toString()}`;
        this.ctx.redirect(url);
    }
    /**
     * @api {get} /github/callback Callback page of GitHub login
     * @apiVersion 1.0.0
     * @apiName githubCallback
     * @apiGroup GitHub
     *
     * @apiDescription This is the callback page that is going to be redirected by GitHub.
     * Fill the sample URL into GitHub's OAuth App's settings page.
     */
    async getAccessToken() {
        const { ctx } = this;
        const code = ctx.query.code;
        const baseURL = 'https://github.com/login/oauth/access_token';
        const options = {
            client_id: 'f9c9bc30f7f29b46a30a',
            client_secret: '37f38f5f231a0510cda6c65da08f88948caaa0dc',
            code
        };
        const res = await ctx.curl(baseURL, {
            method: 'POST',
            data: options,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
        await this._getGithubUserInfo(res.data['access_token']);
    }
    /**
     * Helper functions
     */
    async _getGithubUserInfo(accessToken) {
        const baseURL = 'https://api.github.com/user';
        const res = await this.ctx.curl(baseURL, {
            method: 'GET',
            dataType: 'json',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${accessToken}`
            }
        });
        await this._goToAdmin({ ...res.data, provider: 'github' }, accessToken);
    }
    async _goToAdmin(data, accessToken) {
        const { ctx } = this;
        try {
            const oauth = await ctx.service.oauth.getOAuth(data);
            const user = oauth.user;
            if (!user.userState) {
                await ctx.service.oauth.deleteOAuth(oauth.id);
                throw new Error('Account is closed, create a new account');
            }
            /**
             * User already exists -> login straight away
             */
            const token = jwt.sign(user.toJSON(), this.config.keys, { expiresIn: '7d' });
            ctx.cookies.set('token', token, {
                path: '/',
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: false,
                signed: false
            });
            ctx.redirect('http://127.0.0.1:3000/admin');
        }
        catch (err) {
            /**
             * User doesn't exist
             * 1. Save user's OAuth info (1 for temp userId)
             */
            const oauth = await ctx.service.oauth.createOAuth(accessToken, data.provider, data.id, 1);
            /**
             * 2. Bind username, e-mail and password (redirect to '/oauth/github')
             */
            const params = { oauthId: oauth.id.toString() };
            ctx.redirect(`http://127.0.0.1:3000/oauth/github?${new node_url_1.URLSearchParams(params).toString()}`);
        }
    }
}
exports.default = GithubController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2l0aHViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0IsNkRBQTZEO0FBQzdELDJEQUEyRDtBQUMzRCxnRUFBZ0U7OztBQUVoRSx1Q0FBMEM7QUFDMUMsNkJBQWdDO0FBQ2hDLDBEQUFtQztBQUluQyxNQUFxQixnQkFBaUIsU0FBUSxnQkFBVTtJQUV0RDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLFlBQVk7UUFDdkIsTUFBTSxPQUFPLEdBQUcsMENBQTBDLENBQUE7UUFDMUQsTUFBTSxPQUFPLEdBQUc7WUFDZCxTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQTtRQUVELE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxJQUFJLElBQUksMEJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFBO1FBQ25FLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFHRDs7Ozs7Ozs7T0FRRztJQUNJLEtBQUssQ0FBQyxjQUFjO1FBQ3pCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDcEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUE7UUFFM0IsTUFBTSxPQUFPLEdBQUcsNkNBQTZDLENBQUE7UUFDN0QsTUFBTSxPQUFPLEdBQUc7WUFDZCxTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLGFBQWEsRUFBRSwwQ0FBMEM7WUFDekQsSUFBSTtTQUNMLENBQUE7UUFFRCxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsTUFBTSxFQUFFLGtCQUFrQjthQUMzQjtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFXLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBR0Q7O09BRUc7SUFFSyxLQUFLLENBQUMsa0JBQWtCLENBQUMsV0FBbUI7UUFDbEQsTUFBTSxPQUFPLEdBQUcsNkJBQTZCLENBQUE7UUFDN0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDdkMsTUFBTSxFQUFFLEtBQUs7WUFDYixRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLGdDQUFnQztnQkFDeEMsYUFBYSxFQUFFLFNBQVMsV0FBVyxFQUFFO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBR08sS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFtQixFQUFFLFdBQW1CO1FBQy9ELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFFcEIsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRXBELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUE7WUFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO2FBQzNEO1lBRUQ7O2VBRUc7WUFDSCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBRTVFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7Z0JBQzlCLElBQUksRUFBRSxHQUFHO2dCQUNULE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJO2dCQUMzQixRQUFRLEVBQUUsS0FBSztnQkFDZixNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQTtZQUVGLEdBQUcsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtTQUM1QztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1o7OztlQUdHO1lBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUV6Rjs7ZUFFRztZQUNILE1BQU0sTUFBTSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQTtZQUMvQyxHQUFHLENBQUMsUUFBUSxDQUFDLHNDQUFzQyxJQUFJLDBCQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1NBQzdGO0lBQ0gsQ0FBQztDQUNGO0FBbkhELG1DQW1IQyJ9