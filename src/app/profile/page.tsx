'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();

  const [data, setData] = useState(null);

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id)
}

  const Logout = async() => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
  } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === null ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-5 rounded" onClick={getUserDetails}>Get User Details</button>

      <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded" onClick={Logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
