import React from 'react'
import Dashboard from '../../../Layout/Dashboard';
import { router, usePage, Link } from '@inertiajs/react'; 
import { Table,TableContainer, TableHead,TableHeadRow,TableHeadCell,TableBody,TableBodyRow,TableBodyCell,TableFooter  } from '../../../Components/Table';
import { HiEye, HiPencilAlt, HiPlusCircle, HiTrash } from 'react-icons/hi';

const TableCluster = () => { 
  const { cluster, session } = usePage().props;

  const InertiaDestroy = (id) => { 
      
      return router.delete('/cluster/'+ id );
   }

  return(
    <>
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
    { cluster.length === 0 ?
       <div className="dark:text-gray-300">You Dont Have Any Cluster... dont worry, just create a new one</div>
: <>
    <TableContainer>
      <Table>
      <TableHead>
        <TableHeadRow>
        <TableHeadCell>No.</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Devices</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
        <TableHeadCell>Devices List</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {
            cluster?.map((data,key) => {
                return (
                    <TableBodyRow>
                        <TableBodyCell>{key+1}</TableBodyCell>
                        <TableBodyCell>{data.name}</TableBodyCell>
                        <TableBodyCell>{data.devices_count}</TableBodyCell>
                        <TableBodyCell>
                          <div className="flex items-center space-x-4 text-sm">
                            <Link href={`/cluster/${data.id}/edit`}><HiPencilAlt className='std-icon'/></Link>
                            {/* Onclick btn destroy, fn InertiaDestroy */}
                            <button onClick={(e)=>InertiaDestroy(data.id)}><HiTrash className='std-icon'/></button>
                          </div>
                        </TableBodyCell>
                        <TableBodyCell><Link href={`/cluster/${data.id}`}><HiEye className='std-icon rounded-lg focus:outline-none focus:shadow-outline-gray leading-5'/></Link></TableBodyCell>
                    </TableBodyRow>
                )
            }     

        )}
      </TableBody>
      </Table>
    </TableContainer>
    <TableFooter>HI man</TableFooter> </>}
    </div>
    </>
  )
 }

function Cluster() {
  return (
    <>
    <div className="flex justify-between items-center mb-6 mt-10">
      <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>My Cluster List</h2>
      <Link href='/cluster/create'>
        <button className='px-4 py-2 flex items-center justify-between font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>
          <span>New Cluster</span>
          <HiPlusCircle className='ml-2'/>
          </button>
      </Link>
    </div>
        <TableCluster/>
    </>
  )
}

Cluster.layout = page => <Dashboard childern={page} title="Dashboardnya VetaBlock"/>
 
export default Cluster