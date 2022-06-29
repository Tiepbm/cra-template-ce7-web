import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL} from "../core/config";

export class ProfileRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.setBaseURL(API_BASE_URL);
    }
    public getProfile = (username: string): Promise<any> => {
        return this.http
            .get(`/Main/Show_DetailUser?ten_user=${username}`)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
}

export const profileRepository: ProfileRepository = new ProfileRepository();
