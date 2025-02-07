/* tslint:disable:variable-name */
import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {createHttpService} from '../helpers/http';
import {PROFILE_KEY, TOKEN_KEY} from "../config";
import {localStorageRead, localStorageSave} from "../../utils/LocalStorageUtils";

export class Repository {

  private static _defaultRequestInterceptor: (v: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

  private static _defaultResponseInterceptor: (v: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>;

  protected http: AxiosInstance;

  constructor(
    config: AxiosRequestConfig,
    isAuthen: boolean = true,
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    responseInterceptor?: <T>(response: AxiosResponse<T>) => AxiosResponse<T>,
  ) {
    this.http = createHttpService(config, requestInterceptor, responseInterceptor);
    if (typeof Repository._defaultRequestInterceptor === 'function') {
      // if(!isAuthen)
      // this.http.interceptors.request.use(Repository._defaultRequestInterceptor);
      // else
        this.http.interceptors.request.use(async config => {
        let profile: any =  localStorageRead(TOKEN_KEY);
        config.headers = {
          ...config.headers,
        };
        if (profile&& profile.token && config && isAuthen) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${profile.token}`,
          };
        }
        return config;
      });
    }
    if (typeof Repository._defaultResponseInterceptor === 'function') {
      this.http.interceptors.response.use((res: AxiosResponse<any>)=>{
        return res;
      },(error: AxiosError)=>{
        if (error?.response?.status) {
          switch (error.response.status) {
            case 401:
              localStorageSave(TOKEN_KEY,null);
              localStorageSave(PROFILE_KEY,null);
              window.location.href='/login';
              break;
            case 500:
              // M24Notification.notifyError('Thất bại','Xảy ra lỗi. Vui lòng liên hệ kỹ thuật');
              break;
          }
        }
        return Promise.reject(error);
      });
    }
  }

  public setBaseURL(baseURL: string) {
    this.http.defaults.baseURL = baseURL;
  }

  public getHttpInstance(): AxiosInstance {
    return this.http;
  }

  static set defaultRequestInterceptor(value: (v: AxiosRequestConfig) => (AxiosRequestConfig | Promise<AxiosRequestConfig>)) {
    this._defaultRequestInterceptor = value;
  }

  static set defaultResponseInterceptor(value: (v: AxiosResponse<any>) => (AxiosResponse<any> | Promise<AxiosResponse<any>>)) {
    this._defaultResponseInterceptor = value;
  }
}
