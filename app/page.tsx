"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const navigateToRegister = () => {
    router.push("/register"); // Use router.push to navigate to the "/register" page
  };
  const navigateToSignIn = () => {
    router.push("/signin"); // Use router.push to navigate to the "/signin" page
  };
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex min-h-screen flex-col items-center'>
        <h1 className='text-4xl font-bold text-center'>
          Welcome to the Authentication App
        </h1>
        <div className='h-10'></div>

        <p className='text-xl text-center'>
          This is a fullstack app with Next.js and Firebase
        </p>
        <div className='h-10'></div>

        {/*create 2 buttons in same line one is register and other is sign in with some gap between buttons*/}
        <div className='flex gap-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={navigateToRegister}
          >
            Register
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={navigateToSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </main>
  );
}
