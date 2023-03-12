import React from 'react'
import { usePage, Link, router } from '@inertiajs/react'; 
import { Table,TableContainer, TableHead,TableHeadRow,TableHeadCell,TableBody,TableBodyRow,TableBodyCell,TableFooter  } from '../../../Components/Table';
import { HiFingerPrint, HiPencilAlt, HiPlusCircle, HiTrash } from 'react-icons/hi';
import Dashboard from '../../../Layout/Dashboard';

const TableDevice = () => { 
  const { data, session } = usePage().props;
  const clusterID = data.cluster_id;
  const devices = data.devices;  
  const InertiaDestroy = async (id) => { 
      console.log('deleting');
      router.delete(window.location.href + '/device/' + id);
      // console.log('deleted');
   }

  return(
    <>
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
    { devices.length === 0 ?
       <div className="dark:text-gray-300">You Dont Have Any Device... dont worry, just create a new one</div>
: <>
    <TableContainer>
      <Table>
      <TableHead>
        <TableHeadRow>
        <TableHeadCell>No.</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>MAC Address</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
        <TableHeadCell>Access Key</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {
            devices?.map((data,i) => {
                return (
                    <TableBodyRow>
                        <TableBodyCell>{i+1}</TableBodyCell>
                        <TableBodyCell>{data.name}</TableBodyCell>
                        <TableBodyCell>{data.mac_address?data.mac_address:"unverified*"}</TableBodyCell>
                        <TableBodyCell>
                          <div className="flex items-center space-x-4 text-sm">
                            <Link href={`${window.location.href}/device/${data.current_temperature?.device_id}/edit`}><HiPencilAlt className='std-icon'/></Link>
                            {/* Onclick btn destroy, fn InertiaDestroy */}
                            <button onClick={()=>InertiaDestroy(data?.current_temperature?.device_id)}><HiTrash className='std-icon'/></button>
                          </div>
                        </TableBodyCell>
                        <TableBodyCell><Link href={`${window.location.href}/device/${data.current_temperature?.device_id}`}><HiFingerPrint className='std-icon rounded-lg focus:outline-none focus:shadow-outline-gray leading-5'/></Link></TableBodyCell>
                    </TableBodyRow>
                )
            }     

        )}
      </TableBody>
      </Table>
    </TableContainer>
    <TableFooter>
      <div className="col-span-3">
      * make your first http request to generate mac address 
      </div>
      </TableFooter> </>}
    </div>
    </>
  )
 }

function Device() {
  const {data, session} = usePage().props;
  return (
    <>
    <div className="flex justify-between items-center mb-6 mt-10">
      <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>[{data.cluster_name}] - Device List</h2>
      <Link href={window.location.href+'/device/create'}>
        <button rel='referer' className='px-4 py-2 flex items-center justify-between font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>
          <span>New Device</span>
          <HiPlusCircle className='ml-2'/>
          </button>
      </Link>
    </div>
        <TableDevice/>
    </>
  )
}

Device.layout = page => <Dashboard childern={page} title="Device List VetaBlock"/>
 
export default Device