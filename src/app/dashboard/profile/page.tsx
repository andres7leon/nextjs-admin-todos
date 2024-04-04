'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {

  const {data} = useSession();

  useEffect(() => {
    console.log('useEffect')  
  }, [])
  

  return (
    <div>
      <h1 className="text-xl text-purple-900 mb-5">Profile</h1>
      <div>
        <h6  className="text-purple-700"> <strong> Name:</strong> {data?.user?.name}</h6>
        <h6  className="text-purple-700"> <strong> Email:</strong> {data?.user?.email}</h6>
        <h6  className="text-purple-700"> <strong> Rol:</strong> {data?.user?.roles}</h6>
      </div>
    </div>
  );
}