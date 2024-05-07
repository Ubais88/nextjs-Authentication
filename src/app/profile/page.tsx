'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProfilePage = () => {
  const router = useRouter();

  const [data, setData] = useState(null);

  const handleUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("api/users/me", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data.data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const Logout = () => {
    localStorage.removeItem('token');
    router.push("/login");
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
      <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-5 rounded" onClick={handleUser}>Get User Details</button>

      <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded" onClick={Logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
