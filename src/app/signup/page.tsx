"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const postReq = await axios.post("/api/users/signup", user);
      console.log("postReqSuccess ", postReq.data.error);
      setLoading(false);
      if(!postReq.data.error){
        toast.success("Signup Successful");
        router.push("/login")
      }else{
        toast.error("User already exist");
      };
    } catch (e) {
      setLoading(false);
      toast.error("Signup Failed");
      // console.log("Signup Failed");
    }
  };
  return (
    <div>
      <h1>
        {loading ? (
          <div className="text-center text-2xl font-bold border-red-900 border-2 rounded-xl">
            Processing
          </div>
        ) : (
          <div className="text-center text-2xl font-bold border-red-900 border-2 rounded-xl">
            Signup
          </div>
        )}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(user.password.length<6){ 
            toast.error("Password atleast of 6 characters")
          }else handleSignUp();
        }}
      >
        <label htmlFor="username" className="font-bold">
          {" "}
          Username:{" "}
        </label>
        <input
          required
          type="text"
          name="username"
          className="m-3 border rounded-tr-xl h-8 p-2"
          value={user.username}
          placeholder="Enter Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <br />
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
            className="bg-blue-500 mt-4 text-white font-bold py-2 px-4 rounded items-center"
            type="submit"
          >
            {" "}
            Signup{" "}
          </button>
        </div>
      </form>
      <Link href="/login">
        <div className="flex justify-center my-4">
          <button className="bg-blue-500 mt-4 text-white font-bold m-2 py-2 px-4 rounded">
            Visit Login Page
          </button>
        </div>
      </Link>
    </div>
  );
}
