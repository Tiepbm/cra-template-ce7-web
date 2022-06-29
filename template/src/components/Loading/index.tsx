import React from "react";
import {Layout, Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

function Loading(props: any) {
    const {message, height} = props;
    return (
        <Layout className="layout_white txt-center _layout-loading justify-content-center" style={{height: height || "100vh"}}>
            <Spin indicator={<LoadingOutlined />} />
            <span>{message}</span>
        </Layout>
    );
}

export default Loading;
