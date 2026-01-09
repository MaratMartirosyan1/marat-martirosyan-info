declare const process: any;

export const environment = {
  production: true,
  apiUrl: typeof process !== 'undefined' && process.env ? (process.env['API_URL'] || 'http://localhost:3000/api') : 'http://localhost:3000/api',
};
