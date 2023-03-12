
import { Link, usePage, router } from '@inertiajs/react'
import React from 'react'
import Dashboard from '../../Layout/Dashboard'

function Monitor() {
  
  const {data} = usePage().props
  const monitor = data.monitors;
  const [monitorList, setMonitorList] = React.useState(0);
  
  React.useEffect(() => {
    let rotationInterval = setTimeout(() => {
      console.log(monitorList);
      const e = router.reload();
      setMonitorList(monitorList + 1)
    }, 1248)
    

}, [monitorList]);

  return (
    <>
    <div className="container xl:max-w-[1280px] px-0 lg:px-6 mx-auto dark:text-white">
      <h5 className='mt-10'><Link onClick={()=>history.back()} >{'< '}back</Link></h5>
      <h2 className='mt-10 mb-8 px-6 text-3xl text-center font-bold text-slate-700 dark:text-slate-200 sm:text-left'>{data?.cluster_name}</h2>
      <div className="mt-10 mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5">
      {monitor.map((monitor, index) => {
        const name= monitor? monitor.name : 'error';
        const temperature = monitor.current_temperature?.temperature ? monitor.current_temperature.temperature : 'N/A';

      return <>
        
        <div key={index} className='hover:ring-4 ring-purple-800/10 dark:ring-purple-400/20 px-6 py-6 ring rounded-2xl shadow-sm bg-white dark:bg-gray-800 flex flex-col justify-center align-middle gap-6'>
          <div className="text-center text-xl dark:text-slate-200 text-slate-700">{monitor?.name}</div>
          <div className="text-center text-xl dark:text-slate-200 text-slate-700">Temperature</div>
          <div className="text-center text-8xl dark:text-slate-200 text-slate-600 font-semibold mx-auto">{temperature}<span className='text-3xl dark:text-white text-slate-600'>&#8451;</span></div>
          <div className="text-center text-base dark:text-slate-200 text-slate-500">{monitor?.mac_address? monitor.mac_address : 'unverified'}</div>
          <div className={`text-center text-lg font-bold ${monitor.current_temperature?.status === 'online' ? 'text-green-400' : 'text-slate-500'}`}>{monitor.current_temperature?.status}</div>
        </div>
        
        </>
      })}
      </div>
    </div>
    </>
  )
}

Monitor.layout = page => <Dashboard childern={page} title="Monitoring Cluster"/>

export default Monitor