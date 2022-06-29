
export const API_BASE_URL: string = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL:'';

export const INPUT_DEBOUNCE_TIME: number = 400;
export const STANDARD_DATE_FORMAT: string = 'DD/MM/YYYY';
export const STANDARD_DATE_FORMAT3: string = 'DD/MM';
export const STANDARD_TIME_FORMAT: string = 'HH:mm:ss';
export const STANDARD_TIME_FORMAT2: string = 'HH:mm';
export const STANDARD_DATE_TIME_FORMAT: string = `${STANDARD_TIME_FORMAT2} ${STANDARD_DATE_FORMAT}`;
export const DEFAULT_PAGE_SIZE: number = 25;
export const PAGINATION_SIZE = [DEFAULT_PAGE_SIZE, 50, 100];
export const PROFILE_KEY = 'PROFILE';
export const TOKEN_KEY = 'TOKEN_KEY';
export const PAYMENT_REQUEST_TYPE_VAT = 'CT1';
export const PAYMENT_REQUEST_TYPE_NO_VAT = 'CT2';
export const PAYMENT_REQUEST_TYPE_ADVANCE = 'CT3';
export const PAYMENT_REQUEST_TYPE_FUND = 'CT4';
export const PAYMENT_REQUEST_STATUS = [
    {
        name:'Chưa duyệt',
        color:'#F4B171',
        code:'01',
    },{
        name:'Đã chuyển',
        code:'05',
        color:'#17a2b8'
    },
    {
        name:'Đã duyệt',
        code:'02',
        color:'#4674C1'
    },
    {
        name:'Đã xử lý',
        code:'03',
        color:'#72AC4D'
    },{
        name:'Bị Trả lại',
        code:'04',
        color:'#C45920'
    },{
        name:'Hủy bỏ',
        code:'06',
        color:'#A6A6A6'
    }
];
export const PAYMENT_METHODS=[
    {name:'Tiền mặt',code:'HT1'},
    {name:'Chuyển khoản',code:'HT2'},
    {name:'Thanh toán công nợ',code:'HT3'}
]
export const PAYMENT_REQUEST_TYPE=[
    {
        name:'Chứng từ có VAT hoặc không VAT',
        code:PAYMENT_REQUEST_TYPE_VAT
    },  {
        name:'Chứng từ không VAT',
        code:PAYMENT_REQUEST_TYPE_NO_VAT
    },{
        name:'Chứng từ tạm ứng',
        code:PAYMENT_REQUEST_TYPE_ADVANCE
    },{
        code:PAYMENT_REQUEST_TYPE_FUND,
        name:'Chứng từ nộp tiền vào quỹ'
    },
];
