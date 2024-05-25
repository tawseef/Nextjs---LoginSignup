"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "../../../public/next.svg";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("noData");

  useEffect(() => {
    const handleUser = async () => {
      const userData = await axios.get("/api/users/profile");
      // console.log(userData.data.data._id);
      setData(userData.data.data._id);
    };
    handleUser();
  }, [data]);

  const handleLogout = async () => {
    const userLogout = await axios.post("/api/users/logout");
    toast.success("Logout Successful")
    // console.log("Logout Success");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center text-2xl font-bold border-red-900 border-2 rounded-xl pl-20 pr-20">
        Profile Page
      </div>
      <div>
        <Image src={logo} alt="notFound"/>
      </div>
      {data === "noData" ? (
        false
      ) : (
        <div className="font-bold">userId: `${data}`</div>
      )}
      <br />
      <button
        className="bg-blue-500 mt-4 text-white font-bold m-2 py-2 mt-0 mb-10 px-4 rounded"
        onClick={handleLogout}
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
}
