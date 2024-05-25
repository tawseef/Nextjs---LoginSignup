"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toast } from "react-hot-toast"; 

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const postReq = await axios.post("/api/users/login", user);
      console.log(" Login postReqSuccess ", postReq.data.message);
      if(postReq.data.error){
        toast.error("Check credentials") 
        setLoading(false);
      };
      if(!postReq.data.error) toast.success("Login Successful");
      if(postReq.data.message==="Logged-in")router.push("/profile");
    } catch (e) {
      setLoading(false);
      toast.error("Login Error");
      console.log("Login  Failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        {loading ? (
          <div className="text-center text-2xl font-bold border-red-900 border-2 rounded-xl pl-20 pr-20">
            Processing
          </div>
        ) : (
          <div className="text-center text-2xl font-bold border-red-900 border-2 rounded-xl pl-20 pr-20">
            Login
          </div>
        )}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label htmlFor="email" className="font-bold">
          {" "}
          Email:{" "}
        </label>
        <input
          required
          type="email"
          name="email"
          className="m-3 border rounded-tr-xl h-8 p-2"
          value={user.email}
          placeholder="Enter Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <label htmlFor="password" className="font-bold">
          {" "}
          Password:{" "}
        </label>
        <input
          required
          type="password"
          name="password"
          className="m-3 border rounded-tr-xl h-8 p-2"
          value={user.password}
          placeholder="Enter password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <div className="flex justify-center my-4">
          <button
            type="submit"
            className="bg-blue-500 mt-4 text-white font-bold m-2 py-2 px-4 rounded"
          >
            {" "}
            Login{" "}
          </button>
        </div>
      </form>
      <Link href="/">
        <div className="flex justify-center my-4">
          <button className="bg-blue-500 mt-4 text-white font-bold m-2 py-2 mt-0 mb-10 px-4 rounded">
            Visit Signup Page
          </button>
        </div>
      </Link>
    </div>
  );
}
