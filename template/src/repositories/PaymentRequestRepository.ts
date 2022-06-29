import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL} from "../core/config";
import lodash from "lodash";
import moment from "moment";

export class PaymentRequestRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.setBaseURL(API_BASE_URL);
    }

    public getList = (filter?: any): Promise<any> => {
        let filterTemp: any = {};
        if(filter?.month){
            let temp = filter.month.split('/');
            filterTemp={
                // thang: parseInt(temp[0]),
                nam: temp[1]
            }
        }else{
            filterTemp={
                // thang:moment().month()+1,
                nam: moment().year()
            }
        }
        return this.http
            .get(`/Main/ShowCtu`, {params: filterTemp})
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getStaffs = (): Promise<any> => {
        return this.http
            .get(`/Main/ShowMa_cbcnv`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public onSave = (body: any): Promise<any> => {
        let temp = {
            "ngay_ctu": "",
            "don_vi": "",
            "nguoi_gdich": "",
            "ma_httoan": "",
            "nguoi_huong": "",
            "so_tknh": "",
            "ten_tknh": "",
            "dia_chi_nh": "",
            "ttin_lquan": "",
            "ctu_ktheo": "",
            "ma_user": "",
            "ngay_cnhat": "",
            "nhang_code": "",
            "so_ctu": "",
            "tong_tien_kvat": 0,
            "han_ttoan": "",
            "ten_nhang_tg": "",
            "code_nhang_tg": "",
            "diachi_nhang_tg": "",
            "diachi_nguoi_th": "",
            "chi_tiet": [],
                ...body,
        }
        if(body.ds_ttrinh&&body.ds_ttrinh.length>0){
            body.ds_ttrinh = body.ds_ttrinh.toString();
        }else{
            body.ds_ttrinh="";
        }
        return this.http
            .post(`/Main/Save_Ttoan`, temp)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };

    public getDetail = (prKey: any): Promise<any> => {
        return this.http
            .get(`/Main/ShowDetail_Ctu?pr_key=${prKey}`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public onDelete = (body: any): Promise<any> => {
        return this.http
            .post(`/Main/DeleteCtu`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public assign = (body: any): Promise<any> => {
        return this.http
            .post(`/Main/Assign_ttoan`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public onReturn = (body: any): Promise<any> => {
        return this.http
            .post(`/Main/Return_ttoan`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getDebt = (date: string, ma_cbcnv: string): Promise<any> => {
        return this.http
            .get(`/Main/Congno_Ttoan?den_ngay=${date}&ma_cbcnv=${ma_cbcnv}`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
}

export const paymentRequestRepository: PaymentRequestRepository = new PaymentRequestRepository();
