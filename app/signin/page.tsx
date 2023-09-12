"use client";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";

export default function Register() {
  // Importing 'crypto' module
  const crypto = require("crypto");
  const hash = crypto.getHashes();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const hashPwd = crypto.createHash("sha1").update(password).digest("hex");
    //get the document with the email entered by the user and hash the user input password and check with password from backend
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //check the password and hashPwd
      if (doc.data().password == hashPwd) {
        //if password is correct then navigate to the home page
        alert("Login Successful");
        router.push("/");
      } else {
        //if password is incorrect then alert the user
        alert("Incorrect Password");
      }
    });
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

        <form
          className='flex flex-col items-center justify-center'
          onSubmit={handleSubmit}
        >
          <div className='h-5'></div>
          <input
            type='text'
            placeholder='Email'
            className='w-80 h-10 border-2 border-gray-300 rounded-lg p-2'
            style={{ color: "black" }}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
          />
          <div className='h-5'></div>
          <input
            type='password'
            placeholder='Password'
            className='w-80 h-10 border-2 border-gray-300 rounded-lg p-2'
            style={{ color: "black" }}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
          />
          <div className='h-5'></div>
          <button
            type='submit'
            className='w-80 h-10 bg-blue-500 text-white rounded-lg'
          >
            Sign In
          </button>
        </form>
        <div className='h-5'></div>
        <button
          className='w-40 h-10 bg-blue-500 text-white rounded-lg'
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go Back
        </button>
      </div>
    </main>
  );
}
