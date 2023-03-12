import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import Dashboard from '../../../Layout/Dashboard'

const Create = () => {
    const { cluster } = usePage().props;
    const [name,setName] = useState(cluster.name);
    const onSubmit = async (e) => {
      e.preventDefault(); 
      console.log(name);
      router.patch(`/cluster/${cluster.id}`,{ name: name });
      return;
     }

    return (
    <>
    <h2 className='mt-10 my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Update Cluster</h2>
    <form onSubmit={onSubmit} className='flex flex-col gap-3 max-w-xl' method='post'>
    <input type="hidden" name="_method" value="patch"/>
    <label htmlFor="clusterName" className='mt-3'>
        <span className='dark:text-gray-300'>Cluster Name</span>
    <input 
    className="block w-full mt-5 text-sm form-input "
    placeholder="your cluster name"
    type="text" name='clusterName'
    value={name} onChange={(e)=> setName(e.currentTarget.value)}
    />
    </label>
    <label htmlFor="submit" className='mt-3'>  
    <input type="submit" name="submit" id="submit" className='cursor-pointer px-4 py-2 flex items-center justify-between font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple' value="Update" />
    </label>
    </form>
    </>
  )
}

Create.layout = page => <Dashboard childern={page} title="Add New Cluster - VetaBlock"/>

export default Create;
