import * as React from "react";
import {Button, Modal} from "antd";

export interface ConfirmModalProps {
    title?: string;
    content: string;
    visible: boolean;
    loading?: boolean;
    className?: any;
    onCancel: () => void;
    onSubmit: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
    const {title, visible, onCancel, onSubmit, content, loading, className} = props;
    return (
        <Modal
            title={title?title:'Xác nhận'}
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button
                    className={" btn_cancel _btn-cancel"}
                    key="cancel"
                    onClick={onCancel}
                >
                    <span className="mgr10"> <i className="fal fa-times"></i></span> Hủy

                </Button>,
                <Button
                    className={"_btn-submit btn_check"} key="submit" type="primary"
                    autoFocus={true}
                    onClick={onSubmit}
                    icon={<span className="mgr10"><i className="fal fa-check"></i></span>}
                    loading={loading ? loading : false}
                    ghost
                >
                    Xác nhận
                </Button>,
            ]}
        >
            <p className={'_p-content'} dangerouslySetInnerHTML={{__html: content}}/>
        </Modal>
    );
}
export default ConfirmModal;
