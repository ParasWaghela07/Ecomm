import React from 'react';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-100">
      {/* Infinite scrolling background */}
      <div className="seamless-vertical-scroll"></div>
      
      <div className="relative flex justify-center items-center min-h-screen bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
          {/* Header */}
          <div className="text-center mb-6 flex flex-col items-center">
            <div className="bg-gray-400 w-5 h-5 rounded-full mb-1"></div>
            <h1 className="text-2xl font-bold text-[#333333] mb-2 poppins-medium">Create an account</h1>
            <p className="poppins-regular text-[#333333]">
              Already have an account?{' '}
              <span className="cursor-pointer underline">Log in</span>
            </p>
          </div>

          {/* Email form */}
          <div className="space-y-4 mb-6">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#666666] mb-2">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#666666] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <button className="w-full bg-[#c3c3c3] text-white py-2 px-4 rounded-full hover:bg-[#b7b7b7] transition cursor-pointer">
              Send OTP
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-[#666666]">OR</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social buttons */}
          
            
            <button className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-50 transition">
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>
          

        </div>
      </div>
    </div>
  );
};

export default Register;