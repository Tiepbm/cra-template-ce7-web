import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL} from "../core/config";

export class ContractRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.setBaseURL(API_BASE_URL);
    }

    public getList = (filter: any): Promise<any> => {
        return this.http
            .get(`/Main/ShowHdong`, {params: filter})
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getDetail = (prKey: any): Promise<any> => {
        return this.http
            .get(`/Main/ShowDetail_Hdong?pr_key=${prKey}`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getPeriodList = (filter: any): Promise<any> => {
        return this.http
            .get(`/Main/ShowHdong_Kyphi`, {params: filter})
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public onSave = (body: any): Promise<any> => {
        return this.http
            .post(`/Main/Save_Hdong`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public onDelete = (body: any): Promise<any> => {
        return this.http
            .post(`/Main/DeleteHdong`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
}

export const contractRepository: ContractRepository = new ContractRepository();
