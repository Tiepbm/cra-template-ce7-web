import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL} from "../core/config";

export class CategoryRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.setBaseURL(API_BASE_URL);
    }

    public getCurrencies = (year: number): Promise<any> => {
        return this.http
            .get(`/Main/ShowMa_Tte?nam_db=${year}`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getCustomers = (): Promise<any> => {
        return this.http
            .get(`/Main/ShowMa_khachhang`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getMaCtu = (code: string): Promise<any> => {
        return this.http
            .get(`/Main/NewID?ma_ctu=${code}`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getPaySource = (): Promise<any> => {
        return this.http
            .get(`/Main/ShowMa_nguonchi`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public download = (code: string): Promise<any> => {
        return this.http
            .get(`/Content/Get?id=${code}`, {responseType:'blob'})
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
}

export const categoryRepository: CategoryRepository = new CategoryRepository();
