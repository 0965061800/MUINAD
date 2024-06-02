import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableTwo from '../components/Tables/TableTwo';
import TableThree from '../components/Tables/TableThree';
import OrderTable from '../components/Orders/OrderTable';
import useSWR from 'swr';
import { fetcher } from '../service/fetchconfig';

const Order = () => {
    const { data:orderData, error:orderError} = useSWR('https://localhost:7137/api/Order', fetcher,  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    })
    console.log(orderData);
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Orders" />
            <OrderTable orders={orderData}></OrderTable>
        </DefaultLayout>
    );
};

export default Order;