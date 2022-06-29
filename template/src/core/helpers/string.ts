import numeral from 'numeral';
import lodash from "lodash";
export function url(baseURL: string, segments: string) {
  return `${baseURL}/${segments}`;
}

export function formatNumber(value: any) {
  if(value===null||value===''||value===undefined) return '';
  return numeral(value).format('0,0.[0000]');
}
export function formatMoneyBySuffix(value?: any, prefix: string='', suffix: string='') {
  if(value===null||value===''||value==='---'||value===undefined) return '---';
  let isNegative=false;
  if(value.toString().indexOf('-')===0){
    isNegative=true;
    value = value.toString().replace('-','');
  }
  return `${isNegative?'-':''}${prefix}${formatNumber(value)}${suffix}`;
}
export function formatMoneyByUnit(value?: any, unit?: string) {
  if(value===null||value===''||value==='---'||value===undefined) return '--';
  let suffix='';
  let prefix='';
  if(unit==='CNY')
    prefix='¥';
  else
    suffix='₫';
  return formatMoneyBySuffix(value,prefix,suffix);
}
export function formatNumberDay(value: any) {
  return `${formatNumber(value)} ngày`;
}
/**
 * Format số theo định dạng
 * @param value
 * @param isAllowNegative số âm
 * @param isFloat nhập dấu ","
 * @param decimal lấy sau dấu phẩy mấy chữ s
 * @returns {string|number}
 */
export function formatAmountTyping(value: any, isAllowNegative = false, isFloat = true, decimal = 4) {
  let raw: any = typeof value === 'string' ? value : '';
  let isNegative = false;
  if (raw.indexOf('-') === 0 && isAllowNegative)
    isNegative = true;
  if (isFloat)
    raw = raw.replace(/[^\d+\^,]/g, "");
  else
    raw = raw.replace(/[^\d]/g, "");
  if (raw.indexOf(',') < 0 && raw.length > 0)
    raw = parseInt(raw);
  else if (raw.indexOf(',') === 0) raw = '';
  else if (raw.indexOf(',') > 0) {
    let temp = raw.split(',');
    let firstNumber = parseInt(temp[0]).toString();
    let secondNumber = temp[1];
    if (secondNumber.length > decimal) {
      secondNumber = secondNumber.substring(0, decimal)
    }
    raw = `${firstNumber},${secondNumber}`;
  }
  if (isNegative) raw = '-' + raw;
  return raw;
}
  /**
 * format đơn giá
 * @param value
 * @param key: , hoặc . theo locale
 * @returns {*}
 */
  export function formatPrice(value: any, key = ',') {
  if (value === null || value === undefined) return '';
  value = value.toString();
  if (key === ',')
    value = value.replace(/[.]/g, '');
  if (value.indexOf(key) > 0) {
    let temp = value.split(key);
    return `${temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${key}${temp[1]}`;
  } else {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
export function formatPriceSpace(value: any, currency: string='') {
  if (value === null || value === undefined) return '';
  value = value.toString();
  // if (key === ',')
  //   value = value.replace(/[.]/g, '');
  if (value.indexOf(' ') > 0) {
    let temp = value.split(' ');
    return `${temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}${' '}${temp[1]} ${currency}`;
  } else {
    return `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${currency}`;
  }
}
export function normalize(value: any, prevValue?: any){
  let raw = formatAmountTyping(value, true);
  return !lodash.isNil(value) ? formatPrice(raw) : value;
}
export function convertStringToNumber(value: any, defaultValue?: any){
  if (value === null || value === '' || value === undefined) return defaultValue?defaultValue:null;
  value = value.toString().replace(/[.]/g, '');
  value = value.toString().replace(/[,]/g, '.');
  return parseFloat(value)
}
const WORD_NUMBERS = [
  "không",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín"
]

// console.log(convertToText.defaults)

function readDozen(no: number, isWhole: boolean) {
  let dozen = ''
  const quotient = Math.floor(no / 10)
  const remainder = no % 10
  if (quotient > 1) {
    dozen = ` ${WORD_NUMBERS[quotient]} mươi`
    if (remainder === 1) {
      dozen += ' mốt'
    }
  } else if (quotient === 1) {
    dozen = ' mười'
    if (remainder === 1) {
      dozen += ' một'
    }
  } else if (isWhole && remainder > 0) {
    dozen = ' linh'
  }
  if (remainder === 5 && quotient > 1) {
    dozen += ' lăm'
  } else if (remainder > 1 || (remainder === 1 && quotient === 0)) {
    dozen += ` ${WORD_NUMBERS[remainder]}`
  }
  return dozen
}

function readHundred(no: number, isWhole: boolean) {
  let text = ''
  const tram = Math.floor(no / 100)
  no = no % 100
  if (isWhole || tram > 0) {
    text = ` ${WORD_NUMBERS[tram]} trăm`
    text += readDozen(no, true)
  } else {
    text = readDozen(no, false)
  }
  return text
}

function readMillion(no: number, isWhole: boolean) {
  let text = ''
  const million = Math.floor(no / 1000000)
  no = no % 1000000
  if (million > 0) {
    text = `${readHundred(million, isWhole)} triệu`
    isWhole = true
  }
  const thousand = Math.floor(no / 1000)
  no = no % 1000
  if (thousand > 0) {
    text += `${readHundred(thousand, isWhole)} nghìn`
    isWhole = true
  }
  if (no > 0) {
    text += readHundred(no, isWhole)
  }
  return text
}

function convertVietnamese(no: number) {
  if (no === 0) return WORD_NUMBERS[0].trim().charAt(0).toLowerCase() + WORD_NUMBERS[0].slice(1);
  if (!Number(no)) return 'không phải số'
  if (no < 0) return 'số âm'
  let text = '',
      postFix = ''
  do {
    const billion = no % 1000000000
    no = Math.floor(no / 1000000000)
    if (no > 0) {
      text = readMillion(billion, true) + postFix + text
    } else {
      text = readMillion(billion, false) + postFix + text
    }
    postFix = ' tỷ'
  } while (no > 0)
  return text.trim().toLowerCase()
}

export function convertNumberToText(n: any): string {
  if (typeof n !== 'number' && typeof  n !== 'string') {
    return 'không phải số'
  } else {
    n = n.toString()
    if (n.length === 0 || hasWhiteSpace(n)) {
      return 'không hợp lệ'
    }

    if (n.length > 15) {
      return 'không hợp lệ'
    }
    let temp = convertVietnamese(+n);
    temp = temp[0].toUpperCase() + temp.slice(1);
    return temp+' đồng';
  }
}

const hasWhiteSpace = (s: string) => {
  return /\s/g.test(s);
};
