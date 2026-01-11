export const auth0Config = {
 clientId: 'lx4TIvzInqTqEuauGY8nFElUKOKbzd83',
 issuer: 'dev-tijrtha6cwckmy1o.us.auth0.com',
 audience: process.env.REACT_APP_AUDIENCE,
 redirectUri: process.env.REACT_APP_REDIRECT_URL,
 scope: 'openid profile email'
}