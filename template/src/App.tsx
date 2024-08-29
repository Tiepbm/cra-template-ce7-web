import React, {useEffect, useState} from 'react';
import './App.css';
import './resources/styles/custom.scss';
import {ConfigProvider, Layout, Spin} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import viVN from 'antd/lib/locale/vi_VN'
import moment from "moment";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import {localStorageRead, localStorageSave} from "./utils/LocalStorageUtils";
import {PROFILE_KEY} from "./core/config";
import {profileRepository} from "./repositories/ProfileRepository";

import {LoadingOutlined} from "@ant-design/icons";
import numeral from 'numeral';

moment.locale('vi', {
    months: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ],
    monthsShort: [
        'Th1',
        'Th2',
        'Th3',
        'Th4',
        'Th5',
        'Th6',
        'Th7',
        'Th8',
        'Th9',
        'Th10',
        'Th11',
        'Th12',
    ],
    weekdays: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    relativeTime: {
        future: 'trong %s',
        past: '%s trước',
        s: 'vài giây trước',
        ss: '%d giây',
        m: '1 phút',
        mm: '%d phút',
        h: '1 giờ',
        hh: '%d giờ',
        d: '1 ngày',
        dd: '%d ngày',
        w: '1 tuần',
        ww: '%d tuần',
        M: '1 tháng',
        MM: '%d tháng',
        y: '1 năm',
        yy: '%d năm',
    },
});

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (numeral.locales.vi === undefined) {
            numeral.register('locale', 'vi', {
                delimiters: {
                    thousands: '.',
                    decimal: ',',
                },
                abbreviations: {
                    thousand: 'k',
                    million: 'm',
                    billion: 'b',
                    trillion: 't',
                },
                ordinal: function (number) {
                    return '';
                },
                currency: {
                    symbol: '₫',
                },
            });
            numeral.locale('vi');
        }
    }, []);
    useEffect(() => {
        let profile = localStorageRead(PROFILE_KEY);
        if (profile) {
            profileRepository.getProfile(profile.ten_user).then(res => {
                localStorageSave(PROFILE_KEY, res);
                setLoading(false);
            }).catch(err => {
                localStorageSave(PROFILE_KEY, null);
                window.location.href = '#/login';
            });
        } else setLoading(false);
    }, []);
    return (
        <div id={"app-main"} className={""}>
            {loading ?  <Layout className={"splash-container"}>
                    <Layout className="layout_white txt-center _layout-loading justify-content-center" style={{height: "100vh"}}>
                        <Spin indicator={<LoadingOutlined />} />
                        <span>{'Đang tải'}</span>
                    </Layout>
                </Layout>:
                <ConfigProvider locale={viVN}>
                    <BrowserRouter>
                        <div className={'main-body'}>
                            <Routes>
                                <Route path={'/'} element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
                                <Route path={'/login'} element={<Signin/>}></Route>
                            </Routes>
                        </div>
                    </BrowserRouter>
                </ConfigProvider>
            }
        </div>);
}

export default App;
