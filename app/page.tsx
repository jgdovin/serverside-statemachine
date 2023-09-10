'use client'
import { useQuery } from "convex/react";
import { api } from '@/convex/_generated/api'

export default function Home() {
  const state = useQuery(api.trafficflow.getState);
  if (!state) return (<div>loading...</div>)
  const { activeState } = state;
  return (
    <div className='w-screen h-screen flex flex-col gap-4 items-center justify-center'>
      <div className='w-36 h-96 bg-slate-800 flex flex-col justify-evenly items-center rounded-xl'>
        <div className={`w-28 h-28 rounded-full ${activeState === 'red' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
        <div className={`w-28 h-28 rounded-full ${activeState === 'yellow' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
        <div className={`w-28 h-28 rounded-full ${activeState === 'green' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
      </div>
      <button className='bg-slate-800 text-white px-4 py-2 rounded-xl' onClick={async () => {
        await fetch('/api/trafficflow', { method: 'POST', body: JSON.stringify({ type: 'NEXT' }) })
      }}>Activate Light</button>
    </div>
  )
}
