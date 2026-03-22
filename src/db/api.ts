const isDev = import.meta.env.DEV;
const baseUrl = 'https://api-federalbloodwave.onrender.com/api/v1';

export const api = isDev ? '/api' : baseUrl;