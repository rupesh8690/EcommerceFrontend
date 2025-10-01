import React from 'react'
import { useState } from 'react'
const ForgotPassowrd = () => {
  const [email,setEmail]=useState("");

  
  return (
    <section id='forgot-password'>
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold text-center mt-6'>Forgot Password</h1>
        <form className='pt-6 flex flex-col gap-2'>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className='w-full h-full outline-none bg-transparent'
              placeholder='Enter your email'
              required
            />
          </div>
          <button
            type='submit'
            className=' bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  )
}

export default ForgotPassowrd;