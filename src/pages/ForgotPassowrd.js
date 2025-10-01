import React from 'react'
import { useState } from 'react'
const ForgotPassowrd = () => {
  const [email,setEmail]=useState("");
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    //add api later
  }

  
  return (
     <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
       

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>


            <button className="d-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Send Reset Link
            </button>
          </form>

     
        </div>
      </div>
    </section>
  )
}

export default ForgotPassowrd;