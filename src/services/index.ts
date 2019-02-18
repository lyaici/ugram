import axios, { AxiosInstance } from 'axios';
import config from '@/config';

const { api, unsplashApi } = config;

const ugram: AxiosInstance = axios.create({
  baseURL: api.baseUrl,
  headers: { Authorization: `Bearer ${api.token}` },
});

const unsplash: AxiosInstance = axios.create({
  baseURL: unsplashApi.baseUrl,
  headers: { Authorization: `Client-ID ${unsplashApi.acesskey}` },
});

export {
  ugram,
  unsplash,
};
