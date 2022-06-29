import {InputMoneySeparatorType} from "./index";

export const formatter = (value: any, decimalSeparator: InputMoneySeparatorType | undefined, thousandSeparator: InputMoneySeparatorType | undefined, precision?: number | undefined) => {
    const pattern = /\B(?=(\d{3})+(?!\d))/gi;
    let newValue = value;

    if (newValue !== undefined && newValue !== null) {
        let [_int, _decimal] = newValue.toString().split(decimalSeparator);
        if (_int) _int = parser(_int, thousandSeparator);
        if (_decimal) _decimal = parser(_decimal, thousandSeparator);

        if (!isNaN(_decimal)) {
            if (precision) {
                _decimal = _decimal.toString().substr(0, precision);
            }
            _int = _int.replace(pattern, thousandSeparator);
            _decimal = _decimal.toString().replace(pattern, thousandSeparator);
            newValue = [_int, _decimal].join(decimalSeparator);
        }
        else {
            newValue = _int.toString().replace(pattern, thousandSeparator);
        }

        return newValue;
    }

    return undefined;
}

export const parser = (value: any, thousandSeparator: InputMoneySeparatorType | undefined) => {
    return value !== undefined && value !== null
        ? removeUtf8(value).toString().replace(/\s+/g, '')
            .toString().replace(/\$\s?/gi, '')
            .toString().replace(/[a-zA-Z]/gi, '')
            .toString().replace(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, '')
            .toString().replace(new RegExp(`([${thousandSeparator}\]+)`,'g'), '')
        : undefined;
};

export const removeUtf8 = (input: any) => {
    let output = "";
    for (let i=0; i< input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}
