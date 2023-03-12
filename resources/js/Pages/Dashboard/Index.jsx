//import React
import React from 'react';
import { TableContainer, Table, TableHead, TableHeadRow, TableHeadCell, TableBody, TableBodyRow, TableBodyCell,TableFooter } from '../../Components/Table';
//import layout
import Dashboard from '../../Layout/Dashboard';

//import Head, usePage
import { Head, usePage, Link } from '@inertiajs/react';
import { HiAdjustments, HiArchive, HiChartBar, HiExclamationCircle, HiEye, HiStatusOnline } from 'react-icons/hi';
import { Card } from '../../Components/Card';

const DashboardTables = () => {
    const { auth , cluster } = usePage().props;
    const clusters = cluster.clusters;
    // console.log(clusters.length)    ;
    return (
        <>
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
       { clusters.length === 0 ?
       <div className="dark:text-gray-300">You Dont Have Any Cluster... dont worry, just create a new one</div>
:
     <>   
    <TableContainer>
      <Table>
      <TableHead>
        <TableHeadRow>
        <TableHeadCell>No.</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Total Devices</TableHeadCell>
        <TableHeadCell className="flex justify-center"><span className='block text-center'>Manage</span></TableHeadCell>
        <TableHeadCell>Monitor</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {
            clusters?.map((data,i) => {
                return (
                    <TableBodyRow key={i}>
                        <TableBodyCell>{i+1}.</TableBodyCell>
                        <TableBodyCell>{data.name}</TableBodyCell>
                        <TableBodyCell>{data.devices_count}</TableBodyCell>
                        <TableBodyCell><Link className='block' href={`/cluster/${data.id}`}><HiAdjustments className='std-icon mx-auto'/></Link></TableBodyCell>
                        <TableBodyCell><Link href={`/cluster/${data.id}/monitor`} ><HiEye className='std-font rounded-lg focus:outline-none focus:shadow-outline-gray leading-5'/></Link></TableBodyCell>
                    </TableBodyRow>
                )
            }     

        )}
      </TableBody>
      </Table>
    </TableContainer>
    <TableFooter>Cluster List   </TableFooter>
    </> }
    </div> 
        </>
    )
}

function Index() {

    function ObjectLength( object ) {
        var length = 0;
        for( var key in object ) {
            if( object.hasOwnProperty(key) ) {
                ++length;
            }
        }
        return length;
    };

    //destruct props "auth"
    const { auth, cluster, devices } = usePage().props;

    return (
        <>
        <h2 className='mt-10 my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Hello {auth.user.name}!</h2>
        <div className="flex items-center px-4 py-4 mb-8 gap-2 bg-white rounded-lg shadow-md dark:bg-purple-700  text-gray-700 dark:text-white font-bold"><HiExclamationCircle /> <span>This Project Was Still In Development, please expect some bug</span></div>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <Card icon={<HiArchive/>} theContext="My Cluster Total" amount={cluster.total}/>
            <Card icon={<HiChartBar/>} theContext="Total Devices or Rooms" setVariant={'blue'} amount={devices.total}/>
            <Card icon={<HiStatusOnline/>} theContext="Online Devices or Rooms" setVariant={'green'} amount={devices.active}/>
        </div>
        <h2 className='my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Monitor</h2>
        <DashboardTables/>
        </>
    )

}

Index.layout = page => <Dashboard childern={page} title="Dashboard - Vetablock"/>

export default Index
