import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL} from "../core/config";

export class ReportRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.setBaseURL(API_BASE_URL);
    }

    public getList = (filter: any): Promise<any> => {
        return this.http
            .get(`/Main/ShowTtrinh`, {params: filter})
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public onSave = (body: any): Promise<any> => {
        return this.http
            .post(`/Main/Save_Ttrinh`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public onDelete = (body: any): Promise<any> => {
        return this.http
            .post(`/Main/DeleteTtrinh`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getDetail = (prKey: any): Promise<any> => {
        return this.http
            .get(`/Main/ShowDetail_Ttrinh?pr_key=${prKey}`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
}

export const reportRepository: ReportRepository = new ReportRepository();
