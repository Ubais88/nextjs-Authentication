"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  

  const handleVerify = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      toast.success(response.data.message)
      setVerified(true);
    } catch (error) {
      console.log(error);
      toast.error("Error During User Verification");
      setError(true);
    }
  };

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false)
    if (token) {
      handleVerify();
    }
  }, [token]);



  return(
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black">
      {token ? `${token}` : "No Token"}
    </h2>
    {verified && (
      <div>
        <h2>Verified</h2>
        <Link href={"/login"}>Login</Link>
      </div>
    )}

    {error && (
      <div>
        <h2>Error</h2>
      </div>
    )}
  </div>
  )
};

export default VerifyEmailPage;
