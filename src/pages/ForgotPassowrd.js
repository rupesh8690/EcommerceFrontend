import React from 'react'
import { useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ForgotPassowrd = () => {
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    //add api later
    const dataResponse= await fetch(SummaryApi.forgotPassword.url,{
      method: SummaryApi.forgotPassword.method,
      credentials: "include", //useful if we are using cookie
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({email}),
    });
    setLoading(false);
    const res= await dataResponse.json();
    if(res.success){
      toast.success(res.message);
      setEmail("");
    }else{
      toast.error(res.message);
    }

    

  }

  
  return (
  <section id="forgot-password">
  <div className="mx-auto container p-4">
    <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-lg shadow-md">
      
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Reset Password
      </h2>

      <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label className="mb-1 font-medium text-gray-700">Email :</label>
          <div className="bg-slate-100 p-2 rounded-md">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Button Fixed */}
        <button
          type="submit"
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all mx-auto mt-6 text-sm font-medium"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  </div>
</section>

  )
}

export default ForgotPassowrd;