export const auth0Config = {
 clientId: process.env.REACT_APP_AUTH0_CLIENT_ID!,
 issuer: 'dev-tijrtha6cwckmy1o.us.auth0.com',
 audience: "https://library.penghuang.dev",
 redirectUri: process.env.REACT_APP_REDIRECT_URL!,
 scope: 'openid profile email'
}