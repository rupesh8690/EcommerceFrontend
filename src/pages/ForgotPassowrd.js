import React from 'react'

const ForgotPassowrd = () => {
  return (
    <section id='forgot-password'>
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold text-center mt-6'>Forgot Password</h1>
        <form className='max-w-md mx-auto mt-6 p-6 border border-gray-300 rounded-lg shadow-md'>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  )
}

export default ForgotPassword;