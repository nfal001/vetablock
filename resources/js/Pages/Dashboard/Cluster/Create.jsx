import { usePage, router } from '@inertiajs/react'
import React, { useRef } from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import Dashboard from '../../../Layout/Dashboard'

// CreateCluster
const Create = () => {
    const { error } = usePage().props;
    const name = useRef();
    
    const onSubmit = async (e) => {
      e.preventDefault(); 
      console.log(name.current.value);
      router.post('/cluster',{ name: name.current.value});
      return;
     }
    return (
    <>
    <h2 className='mt-10 my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Create New Cluster</h2>
    <form onSubmit={onSubmit} className='flex flex-col gap-3 max-w-xl' method='post'>

    <label htmlFor="clusterName" className='mt-3'>
        <span className='dark:text-gray-300'>Cluster Name</span>
    <input ref={name}
    className="block w-full mt-5 text-sm form-input "
    placeholder="your cluster name"
    type="text" name='clusterName'
    />
    </label>
    <label htmlFor="submit" className='mt-3'>
    <input type="submit" name="submit" id="submit" className='cursor-pointer px-4 py-2 flex items-center justify-between font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple' value="Add New Cluster" />
    </label>
    </form>
    </>
  )
}

Create.layout = page => <Dashboard childern={page} title="Add New Cluster - VetaBlock"/>

export default Create;
