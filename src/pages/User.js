import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import UserTable from '../components/User/UserTable';
import useSWR from 'swr';
import { fetcher } from '../service/fetchconfig';

const User = () => {
  const { data:usersData, error:usersError} = useSWR('https://localhost:7137/api/User', fetcher,  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    })
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />
      {
        usersData 
        ? <UserTable users = {usersData}></UserTable>
        : <></>
      }
    </DefaultLayout>
  );
};

export default User;
