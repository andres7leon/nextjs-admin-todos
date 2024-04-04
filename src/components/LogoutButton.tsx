'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import { CiCircleInfo, CiLogout } from 'react-icons/ci'

export const LogoutButton = () => {

  const {data: session, status } = useSession();

  const signOutUser = async() => {
    await signOut();
    redirect('/api/auth/signin');
  }

  if (status === 'loading'){
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiCircleInfo />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    )
  };

  if (status === 'unauthenticated'){
    return (
      <button onClick={() => signIn()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Ingresar</span>
      </button>
    )
  };

  return (
    <button onClick={() => signOutUser()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  )
}
