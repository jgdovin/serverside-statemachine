'use client'
import { useQuery } from "convex/react";
import { api } from '@/convex/_generated/api'

export default function Home() {
  const state = useQuery(api.trafficflow.get);
  console.log(state);
  return (
    <div>

    </div>
  )
}
