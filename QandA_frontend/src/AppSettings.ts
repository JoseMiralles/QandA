export const server = 'http://localhost:5000';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-hx1ned6w.us.auth0.com',
  client_id: '7cwCQaXy6FEgk1KoNWa93LXDjmbZAWJH',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};