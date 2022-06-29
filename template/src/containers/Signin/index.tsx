import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Col, Row, Card} from 'antd';
import DocumentTitle from "react-document-title";
import {Link, useNavigate} from "react-router-dom";
import {useSessionStorage} from "../../hooks/useSessionStorage";
import {userRepository} from "../../repositories/UserRepository";
import CE7Notification from "../../utils/CE7Notification";
import CE7ErrorUtils from "../../utils/CE7ErrorUtils";
import {PROFILE_KEY} from "../../core/config";
function Login(){
  const navigate = useNavigate();
  const [loading, setLoading]= useState<boolean>(false);
  const [profile, setProfile] = useSessionStorage(PROFILE_KEY, false);
  const onFinish = (values: any) => {
    setLoading(true);
    // userRepository.login(values.username, values.password).then(res=>{
    //   CE7Notification.messageSuccess('Đăng nhập thành công');
    //   setProfile(res.data);
    //   setTimeout(()=>{
    //     navigate('/');
    //   },1000);
    // }).catch(err=>{
    //   console.log(err);
    //   CE7ErrorUtils.showError(err.data.Message);
    // }).finally(()=> setLoading(false))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return <DocumentTitle title={`Đăng nhập`}>
    <div className="scroll-wrapper">
      <div className="wrapper login-wrapper width100 min-width-page position-re dpl-flex ">
        <div className="boxform bg-color-white">
          <h1 className="txt-center mgbt20">
            {/*<img style={{width:70, height:100}} src={require('../../resources/images/Logo.png')} />*/}
          </h1>
          <span className="txt-size-h7 txt-color-black robotoregular dpl-block mgt20">
                                {'Chào mừng bạn đã quay trở lại! Đăng nhập ngay dưới đây!'}
                            </span>
          <div className="boxform__content mgt25">
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
              <Form.Item
                  label=""
                  name="username"
                  className={''}
                  rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
              >
                <Input autoFocus style={{height: 45}} prefix={<i className="far fa-user"></i>} className={'width100'} placeholder={'Tên đăng nhập'} />
              </Form.Item>

              <Form.Item
                  label=""
                  name="password"
                  className={'mgt10'}
                  rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
              >
                <Input.Password  style={{height: 45}} prefix={<i className="far fa-lock"></i>} placeholder={'Mật khẩu'} />
              </Form.Item>

              <Form.Item className={'mgt10'} wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={loading} disabled={loading} shape={'round'} size={'large'} type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
              {/*<Row className={'align-items-center justify-content-center'}>*/}
              {/*    <span>Bạn chưa có tài khoản?</span>*/}
              {/*    <Button onClick={()=> navigate('/register')} type={'link'}>Đăng ký ngay</Button>*/}
              {/*</Row>*/}
            </Form>
          </div>
        </div>
      </div>
    </div>
  </DocumentTitle>
};
export default Login;
