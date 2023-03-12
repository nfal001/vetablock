import { Link, usePage, router } from '@inertiajs/react'
import React, { useState } from 'react'
import Dashboard from '../../../Layout/Dashboard'

// EditCircle
const Edit = () => {
    const { cluster, data, error } = usePage().props;

    const [inputDisabled,setInputDisabled] = useState(false);
    const [name,setName] = useState(data.device.name);


    const onSubmit = async (e) => {
      e.preventDefault(); 
      router.patch('/cluster/'+ data.cluster_id + '/device/'+ data.device_id ,{ name: name });
      return;
     }
    return (
    <div className="mt-10 px-6 max-w-xl py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <h2 className='mb-4 mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Edit {data.device.name}</h2>
    <form onSubmit={onSubmit} className='flex flex-col gap-3 max-w-xl' method='post'>
    <label htmlFor="clusterName" className='mt-3'>
        <span className='dark:text-gray-300'>Device Name</span>
    <input value={name} required={true} minLength='4' onChange={(e)=>setName(e.currentTarget.value)}
    className="block w-full mt-5 text-sm form-input disabled:bg-slate-400/10"
    placeholder="your device name"
    type="text" name='deviceName'
    />
    </label>

    <label htmlFor="submit" className='mt-3 mb-4'>
    <input type="submit" name="submit" id="submit" className='cursor-pointer px-4 py-2 flex items-center justify-between font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple' value="Update" />
    </label>
    </form>
    </div>
  )
}

Edit.layout = page => <Dashboard childern={page} title="Update Device  - VetaBlock"/>

export default Edit;
