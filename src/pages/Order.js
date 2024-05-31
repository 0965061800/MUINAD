import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableTwo from '../components/Tables/TableTwo';
import TableThree from '../components/Tables/TableThree';
import OrderTable from '../components/Orders/OrderTable';

const Order = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Orders" />
            <OrderTable></OrderTable>
        </DefaultLayout>
    );
};

export default Order;