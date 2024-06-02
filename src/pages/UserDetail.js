import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import OrderInfo from '../components/Orders/OrderInfo';
import useSWR from 'swr';
import { fetcher } from '../service/fetchconfig';
import UserInfo from '../components/User/UserInfo';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
    const {userId} = useParams();
    const { data:userData, error:userError} = useSWR(`https://localhost:7137/api/User/${userId}`, fetcher,  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    })
    return (
        <DefaultLayout>
        <Breadcrumb pageName={`User Detail`} />
        {userData  
        ? <UserInfo userInfo={userData}></UserInfo>
        : <></>
        }
    </DefaultLayout>
    );
};

export default UserDetail;