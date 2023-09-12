"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";

export default function Register() {
  // Importing 'crypto' module
  const crypto = require("crypto");
  const hash = crypto.getHashes();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //verify that all fields are filled
    if (!name || !email || !roll || !phone || !password) {
      alert("Please fill all the fields");
      return;
    }
    //check if email is valid and phone is 10 digit or more and hask the password
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      phone.length < 10 ||
      password.length < 6
    ) {
      alert("Please enter valid email, phone number and password");
      return;
    }
    //check if password is strong and it contains atleast one uppercase, one lowercase, one number and one special character
    if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g) ||
      !password.match(/[^a-zA-Z\d]/g)
    ) {
      alert(
        "Please enter a strong password with atleast one uppercase, one lowercase, one number and one special character"
      );
      return;
    }
    const hashPwd = crypto.createHash("sha1").update(password).digest("hex");

    try {
      // Add data to Firestore using addDoc
      const docRef = await addDoc(collection(db, "user"), {
        name: name,
        email: email,
        roll: roll,
        phone: phone,
        password: hashPwd,
      });
      // Clear form fields
      setName("");
      setEmail("");
      setRoll("");
      setPhone("");
      setPassword("");

      router.push("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
          <input
            type='text'
            placeholder='Name'
            className='w-80 h-10 border-2 border-gray-300 rounded-lg p-2'
            style={{ color: "black" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='off'
          />
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
            type='text'
            placeholder='Roll Number'
            className='w-80 h-10 border-2 border-gray-300 rounded-lg p-2'
            style={{ color: "black" }}
            onChange={(e) => setRoll(e.target.value)}
            autoComplete='off'
          />
          <div className='h-5'></div>
          <input
            type='text'
            placeholder='Phone Number'
            className='w-80 h-10 border-2 border-gray-300 rounded-lg p-2'
            style={{ color: "black" }}
            onChange={(e) => setPhone(e.target.value)}
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
            Register
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
