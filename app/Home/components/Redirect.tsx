"use client"
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const Redirect = () => {
    const session = useSession();
    useEffect(()=>{
        if(session.data?.user){
            redirect("/Home");
        }
    },[session])
  return (
    null
  )
}

export default Redirect