import React, {useEffect, useState} from 'react';
import {Avatar, Col, Drawer, Layout, List, Menu, Popover, Row, Tooltip} from 'antd';
import './styles.scss';
import {
    DashOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    DownOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import ProgressBar from "../Spinner/ProgressBar";
import lodash from 'lodash';
import DocumentTitle from 'react-document-title';
import {useLocation, useNavigate} from 'react-router-dom';
import useWindowDimensions from "../../hooks";
import ConfirmModal from "../Modal/ConfirmModal";
import {localStorageRead, localStorageSave} from '../../utils/LocalStorageUtils';
import {PROFILE_KEY, TOKEN_KEY} from '../../core/config';
import {useSessionStorage} from "../../hooks/useSessionStorage";
import MediaQuery, {useMediaQuery} from 'react-responsive'

const {Header, Sider, Content} = Layout;
const PERCENT_COMPLETE = 100;

export interface MainLayoutProps {
    children: any;
    showProgressBar?: boolean;
    title?: any;
}

function MainLayout(props: MainLayoutProps) {
    const {children, showProgressBar, title} = props;
    const [collapsed, setCollapsed] = useState(true);
    const [percent, setPercent] = useState<number>(-1);
    const [autoIncrement, setAutoIncrement] = useState<boolean>(false);
    const [isShowMenuDropDown, setShowMenuDropDown] = useState<boolean>(false);
    const [intervalTime, setIntervalTime] = useState<number>(200);
    const [activeKey, setActiveKey] = useState<string>('');
    const [profile] = useSessionStorage(PROFILE_KEY, null);
    const location = useLocation();
    const navigate = useNavigate();
    const {height} = useWindowDimensions();
    const [drawMenu, setDrawMenu] = useState<boolean>(false);
    const data = [
        {
            title: 'Trang chủ',
            key:'',
            icon: <i className="fal fa-home"></i>
        },
        {
            title: 'Đăng xuất',
            key:'logout',
            icon: <i className="fas fa-sign-out"></i>
        },
    ];
    useEffect(() => {
        if (showProgressBar) {
            startWithAutoIncrement();
        } else {
            setPercentValue(PERCENT_COMPLETE);
        }
    }, [showProgressBar]);
    useEffect(() => {
        if (location.pathname && location.pathname !== '/') {
            let pathname: string[] = location.pathname.split('/');
            setActiveKey(pathname[pathname.length - 1])
        }
    }, []);
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    const [confirmLogOut, setConfirmLogOut] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const onConfirmLogOut = () => {
        localStorageSave(PROFILE_KEY, null);
        localStorageSave(TOKEN_KEY, null);
        navigate('/login');

    }

    const onCancelLogOut = () => {
        setConfirmLogOut(false);
        setLoading(false)
    }


    /**
     * hiển thị progressbar
     **/
    const startWithAutoIncrement = () => {
        setPercent(0);
        setAutoIncrement(true);
        setIntervalTime(Math.random() * 150);
    };

    /**
     * Dừng progressbar
     **/
    const stopWithAutoIncrement = () => {
        setPercent(-1);
        setAutoIncrement(false);
        setIntervalTime(150);
    };

    const setPercentValue = (percent: number) => {
        setPercent(percent);
        if (percent === PERCENT_COMPLETE) {
            setTimeout(() => {
                stopWithAutoIncrement();
            }, 500);

        }
    };
    const handleClickMenu = (e: any) => {
        if(e.key==='logout'){
            setConfirmLogOut(true);
        }else
        navigate(`/${e.key}`,);
    }


    const handleVisibleChange = (visible: boolean) => {
        setShowMenuDropDown(visible);
    };
    const renderDropDownAvatar = () => {
        return <div style={{width: 200}}>
            <Row className={'dpl-flex align-items-center pdt5 pdbt10'} key={"logout"}>
                <span onClick={() => setConfirmLogOut(true)} className="_logout-btn txt-color-black cursor-pointer">
                    <i className="far fa-sign-out-alt mgr5"></i><span>{'Đăng xuất'}</span></span>
            </Row>
        </div>;
    };
    const renderMenu = () => {
        return (
            <Drawer width={'100%'} placement="left"
                    className={'menu-mobile-container'}
                    onClose={() => setDrawMenu(false)} visible={drawMenu}
                    bodyStyle={{padding: 0, backgroundColor: '#0083ca', paddingLeft: 20, paddingRight: 20}}
                    title={<Row className={'dpl-flex justify-content-center align-items-center'}>
                        <span style={{position: 'absolute', left: 20}} onClick={() => setDrawMenu(false)}
                              className={'cursor-pointer txt-color-white'}><i className="fas fa-arrow-left"></i></span>
                        <span
                            className={'robotobold txt-size-h5 txt-color-white'}>{'Menu'}</span>

                        <p></p>
                    </Row>}
                    headerStyle={{backgroundColor: '#0083ca'}}
                    closable={false}
            >
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item onClick={()=> handleClickMenu(item)}>
                                <List.Item.Meta
                                    avatar={<span className={`${activeKey===item.key?'txt-color-orange':'txt-color-white'} robotomedium`}>{item.icon}</span>}
                                    title={<span className={`${activeKey===item.key?'txt-color-orange':'txt-color-white'} robotomedium`}>{item.title}</span>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Drawer>
        );
    }
    return (
        <DocumentTitle title={`${title ? title : 'M24'}`}>
            <Layout className={'main-layout'}>
                <MediaQuery minWidth={768}>
                    <Sider className={'sidebar-left'} theme="light" trigger={<span className={'txt-color-white'}><i
                        className="far fa-sign-out mgr5"></i>{!collapsed && ` Đăng xuất`}</span>}
                           onCollapse={() => setConfirmLogOut(true)} collapsible collapsed={collapsed}>
                        {!collapsed ? <div
                            className={'header-sider dpl-flex flex-row justify-content-between align-items-center pdr10'}>

                            <Row className={'justify-content-center align-items-center width100'}>
                                <img className="logo" src={require('../../resources/images/logo2.png')}></img>
                            </Row>
                            <DoubleLeftOutlined style={{color: '#FFFFFF'}} onClick={toggle}/>
                        </div> : <div className={'header-sider logo-collapse '}><DoubleRightOutlined
                            style={{color: '#FFFFFF'}} onClick={toggle}/></div>
                        }
                        <Menu onClick={handleClickMenu} selectedKeys={[activeKey]} mode="inline"
                              defaultSelectedKeys={['1']}>

                            <Menu.Item key="" icon={<i className="fal fa-home"></i>}>
                                <span className={'robotomedium'}>{'Trang chủ'}</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </MediaQuery>
                <MediaQuery maxWidth={767}>
                    {
                        renderMenu()
                    }
                </MediaQuery>
                <Layout>

                        <MediaQuery minWidth={768}>
                            <Header className="header">
                            <div className={'dpl-flex justify-content-between align-items-center'}>
                                <span className={'txt-size-h5 robotomedium'}>{title ? title : ''}</span>
                                <Popover
                                    visible={isShowMenuDropDown}
                                    onVisibleChange={handleVisibleChange}
                                    placement="bottomRight" content={renderDropDownAvatar()}
                                    trigger="click">
                                    <div style={{height: 64}}
                                         className={'dpl-flex justify-content-end align-items-center'}>
                                        <Avatar src={lodash.get(profile, 'avatar', null)}
                                                className={"_avatar-1 mgr10"}/>
                                        <p className={'_user-name mgt15 txt-size-h7 robotoregular txt-color-black mgr10 mgl5'}>{lodash.get(profile, 'full_name', null)}
                                            <DownOutlined
                                                className={'txt-size-h9 txt-color-gray mgl5'}/>
                                        </p>


                                    </div>
                                </Popover>
                            </div>
                            </Header>
                        </MediaQuery>
                        <MediaQuery maxWidth={767}>
                            <Header className="header-mobile">
                            <Row style={{backgroundColor: '#0083ca'}}
                                 className={'dpl-flex justify-content-between align-items-center width100 pdl20 pdr20'}>
                                <span onClick={() => setDrawMenu(true)}
                                      className={'cursor-pointer txt-color-white'}><i
                                        className="fas fa-bars"></i></span>
                                {/*<span>{`Xin chào ${lodash.get(profile, 'full_name', '')}`}</span>*/}
                                {/*<Avatar src={lodash.get(profile, 'avatar', null)}*/}
                                {/*        className={"_avatar-1 mgr10"}/>*/}
                                {/*<Popover*/}
                                {/*    visible={isShowMenuDropDown}*/}
                                {/*    onVisibleChange={handleVisibleChange}*/}
                                {/*    placement="bottomRight" content={renderDropDownAvatar()}*/}
                                {/*    trigger="click">*/}
                                {/*    <div style={{height: 64}}*/}
                                {/*         className={'dpl-flex justify-content-end align-items-center'}>*/}
                                {/*        <Avatar src={lodash.get(profile, 'avatar', null)}*/}
                                {/*                className={"_avatar-1 mgr10"}/>*/}
                                {/*        /!*<p className={'_user-name mgt15 txt-size-h7 robotoregular txt-color-black mgr10 mgl5'}>{lodash.get(profile, 'full_name', null)}*!/*/}
                                {/*        /!*    <DownOutlined className={'txt-size-h9 txt-color-gray mgl5'}/>*!/*/}
                                {/*        /!*</p>*!/*/}


                                {/*    </div>*/}
                                {/*</Popover>*/}
                                <span className={'txt-color-white'}>{`Xin chào ${lodash.get(profile, 'full_name', '')}`}</span>
                            </Row>
                            </Header>
                        </MediaQuery>
                    <ProgressBar
                        percent={percent}
                        autoIncrement={autoIncrement}
                        intervalTime={intervalTime}
                        spinner={false}
                    />
                    <MediaQuery maxWidth={767}>
                    <Content style={{minHeight: height - 64}}
                             className="content-mobile"
                    >
                        {children}
                    </Content>
                    </MediaQuery>
                    <MediaQuery minWidth={768}>
                        <Content style={{minHeight: height - 64}}
                                 className="content"
                        >
                            {children}
                        </Content>
                    </MediaQuery>
                    {confirmLogOut && <ConfirmModal
                        title={'Đăng xuất'}
                        content={'Bạn có chắc muốn đăng xuất khỏi hệ thống?'}
                        visible={confirmLogOut}
                        loading={isLoading}
                        onCancel={onCancelLogOut}
                        onSubmit={onConfirmLogOut}
                    />}
                </Layout>
            </Layout>
        </DocumentTitle>
    );
}

export default MainLayout;
