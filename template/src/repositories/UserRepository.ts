import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL} from "../core/config";

export class UserRepository extends Repository {
    constructor() {
        super(httpConfig, false);
        this.setBaseURL(API_BASE_URL);
    }

    public login = (body: any): Promise<any> => {
        return this.http
            .post(`/Account/login`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
}

export const userRepository: UserRepository = new UserRepository();
