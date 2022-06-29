import {Badge, Button, Card, Dropdown, Menu, Row, Skeleton, Space, Table} from "antd";
import MainLayout from "../../components/Layout";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {DEFAULT_PAGE_SIZE} from "../../core/config";

const Home = () => {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const navigate = useNavigate();
    const [filter, setFilter] = useState<any>({});
    const [dataSource, setDatasource] = useState<any>([]);
    const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
    const onSearch = (filter?: any) => {

    }
    const onReset = () => {
        setFilter({})
    }
    const onShowSizeChange=(current: number, size: number)=>{
        setPageSize(size);
    }
    return <MainLayout showProgressBar={showProgressBar} title={'Trang chủ'}>
        <div>
            <Card>
            </Card>
       </div>
    </MainLayout>
}

export default Home;
