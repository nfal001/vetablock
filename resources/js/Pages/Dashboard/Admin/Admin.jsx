import React from 'react'
import { usePage } from '@inertiajs/react'
import { Table, TableBody, TableBodyCell, TableBodyRow, TableContainer, TableFooter, TableHead, TableHeadCell, TableHeadRow } from '../../../Components/Table'
import Dashboard from '../../../Layout/Dashboard'
const TableAdmin = () => { 
    const { users } = usePage().props;
    
    return <>
    <TableContainer>
        <Table>
            <TableHead>
                <TableHeadRow>
                    <TableHeadCell>n.</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>Level</TableHeadCell>
                    <TableHeadCell>Cluster Total</TableHeadCell>
                    <TableHeadCell>Device Total</TableHeadCell>
                </TableHeadRow>
            </TableHead>
            <TableBody>
                { users?.map((user,i)=>{
                    return (
                        <TableBodyRow key={i}>
                            <TableBodyCell>{i+1}.</TableBodyCell>
                            <TableBodyCell>{user.name}</TableBodyCell>
                            <TableBodyCell>{user.email}</TableBodyCell>
                            <TableBodyCell>{user.role}</TableBodyCell>
                            <TableBodyCell>{user.clusters_count}</TableBodyCell>
                            <TableBodyCell>{user.devices_count}</TableBodyCell>
                        </TableBodyRow>)
                })}
            </TableBody>
        </Table>
    </TableContainer>
    <TableFooter>test</TableFooter>
           </>
 }

const Admin = () => {
    return (
        <>
        <div className="flex flex-col my-10 gap-6">
            <h2 className=' text-2xl font-semibold text-gray-700 dark:text-gray-200'>Manage User</h2>
            <div className="">
                <TableAdmin />
            </div>
        </div>
        </>
        )
    }
    
Admin.layout = page => <Dashboard childern={page} title='manage users - VetaBlock'/>
export default Admin