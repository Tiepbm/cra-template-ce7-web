import React from 'react';
import {Input, InputProps} from "antd";
import {omit} from 'lodash';
import {formatter, parser} from './utils';

export enum InputMoneySeparatorType {
    dot = '.',
    comma = ','
}

export interface InputMoneyProps extends Omit<InputProps, 'onChange' | 'value'> {
    precision?: number,
    decimalSeparator?: InputMoneySeparatorType,
    thousandSeparator?: InputMoneySeparatorType,
    value?: string|number,
    onChange?: (value: any) => void
}

interface InputMoneyState {
    value: string|number,
    validValue: string|number|undefined
}

class InputMoney extends React.Component<InputMoneyProps, InputMoneyState> {

    static defaultProps: InputMoneyProps = {
        decimalSeparator: InputMoneySeparatorType.comma,
        thousandSeparator: InputMoneySeparatorType.dot,
        precision: 2
    }

    state = {
        value: "",
        validValue: ""
    }

    static getDerivedStateFromProps(props: any, state: any) {
        const s = {...state};
        if ('value' in props) {
            return {value: props.value};
        }
        return null;
    }

    formatter = (value: any) => {
        return formatter(value, this.props.decimalSeparator, this.props.thousandSeparator, this.props.precision);
    }

    parser = (value: any) => {
        return parser(value, this.props.thousandSeparator);
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        this.setState({
            value,
            validValue: this.parser(value)
        }, () => {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.state.validValue);
            }
        });
    }

    render = () => {
        const {value} = this.state;
        const formattedValue = this.formatter(value);
        let inputProps = {
            ...omit(this.props, ['decimalSeparator', 'thousandSeparator']),
            value: formattedValue,
            onChange: this.onChange
        }
        return (
            <Input
                {...inputProps}
            />
        );
    }
}

export default InputMoney;
