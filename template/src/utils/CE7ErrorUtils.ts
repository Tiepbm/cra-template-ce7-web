import lodash from "lodash";
import CE7Notification from "./CE7Notification";

export default class CE7ErrorUtils {
    static showError(error: any){
        let isWarning= typeof error !=='string'?lodash.get(error,'data.code',''): false;
        let message = typeof error ==='string'?error: lodash.get(error,'data.message','Xảy ra lỗi. Vui lòng thử lại');
        if(isWarning===406)
            CE7Notification.notifyError('Cảnh báo',
                message,
                '_notify-warning'
            );
        else CE7Notification.notifyError('Thất bại',
            message,
            '_notify-error'
        );
    }
}
