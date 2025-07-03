'use client'

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import { signOut} from 'firebase/auth';
import GigList from './GigList';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isNavOpen,setIsNavOpen] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    }catch(error){
      console.error('Logout error:',error);
    }
  }


  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p4">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
         <img src="/logo.png" className="h-8 rounded-3xl" alt="Gighub Logo"/>
      </a>
     <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button 
      onClick={() => setIsNavOpen(!isNavOpen)}
      title="NavBar" type="button" className="md:hidden block text-gray-300 hover:text-white focus:outline-none"
      >
        <svg  
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isNavOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
             />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />

          )}
        </svg>
      </button>
      </div>
      <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isNavOpen ? 'block' : 'hidden'} w-full` } id="navbar-menu" >

      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a
          href="/dashboard"
          className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
        >
          Home
        </a>
      </li>
       <li>
        <a
          href="/#"
          className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
        >
          About
        </a>
      </li>
      <li>
        <a
          href="/#"
          className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
        >
          Services
        </a>
      </li>
         <li>
        <button
          type="submit"
          onClick={handleLogout}
          className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded hover:bg-gray-800 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
        >
          {loading ? 'Logging out... ' : 'Logout'}
        </button>
      </li>
      </ul>
      </div>
    </div>
    </nav>
    <GigList/>
  </>
  );
}
