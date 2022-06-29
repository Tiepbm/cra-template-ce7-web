import React from "react";
import {CopyOutlined} from "@ant-design/icons";
import {message, Button, Space, Popover, Tooltip} from 'antd';

export interface ClipboardProps{
    value: any;
}
function Clipboard(props: ClipboardProps){
    const {value} = props;
    return(
            <CopyOutlined className={'mgl5 mgr5 _btCopy'} onClick={()=>{
                const textField = document.createElement('textarea');
                textField.innerText = value;
                document.body.appendChild(textField);
                textField.select();
                document.execCommand('copy');
                textField.remove();
                message.success('Copied');
            }}/>
    );
}
export default Clipboard;
