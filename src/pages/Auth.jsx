import React, { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import {FirebaseContext} from '../context/FirebaseContext';
import { useContext } from 'react';
import { useState } from 'react';
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('email');
  const [login,setlogin] = useState(false);

  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setOTP("");
    setPassword("");
  },[login])


  const {signInWithGoogle,registerWithEmailAndPassword,loginWithEmailAndPassword} = useContext(FirebaseContext);

  const RegisterUsingGoogle = async () => {
    try{
      const user=await signInWithGoogle();
      
      const response=await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.displayName || null,
          email: user.email,
          firebaseUid: user.uid,
        }),
      })

      const data = await response.json();
      if(data.success){
        console.log("User registered successfully:", data.user);
        navigate('/');
      } else {
        console.error("Registration failed:", data.message);
      }
    }
    catch(error) {
      console.error("Error during registration:", error);
    }
  }

  async function otpHandler() {
    try{
      const response = await fetch('http://localhost:4000/SendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json();
      if(data.success){
        console.log("OTP sent successfully");
        setState('otp');
      } else {
        console.error("Failed to send OTP:", data.message);
      }
    }
    catch(e){
      console.error("Error sending OTP:", e);
    }

  }

  async function otpMatchHandler() {
    try{
      const response = await fetch('http://localhost:4000/MatchOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: OTP }),
      })

      const data = await response.json();
      if(data.success){
        console.log("OTP matched successfully");
        setState('password');
      } else {
        console.error("Failed to match OTP:", data.message);
      }
    }
    catch(e){
      console.error("Error matching OTP:", e);
    }
  }

  async function registerHandler() {
    try{
      const user=await registerWithEmailAndPassword(email, password);
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.displayName || null,
          password: password,
          email: user.email,
          firebaseUid: user.uid,
         }),
      })

      const data = await response.json();
      if(data.success){
        console.log("User registered successfully");
        navigate('/');
      } else {
        console.error("Registration failed:", data.message);
      }
    }
    catch(e){
      console.error("Error during registration:", e);
    }
  }

  async function loginHandler() {
    try{
      const user = await loginWithEmailAndPassword(email, password);
      if(user){
        console.log("User logged in successfully");
        navigate('/');
      } else {
        console.error("Login failed");
      }
    }
    catch(e){
      console.error("Error during login:", e);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1A2433]">
      {/* Infinite scrolling background */}
      <div className="seamless-scroller">
        <div className="scroll-layer"></div>
        <div className="scroll-layer"></div>
      </div>

      {!login && (
        <div className="relative flex justify-center items-center min-h-screen bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
          {/* Header */}
          <div className="text-center mb-6 flex flex-col items-center">
            <div className="bg-gray-400 w-5 h-5 rounded-full mb-1"></div>
            <h1 className="text-2xl font-bold text-[#333333] mb-2 poppins-medium">Create an account</h1>
            <p className="poppins-regular text-[#333333]">
              Already have an account?{' '}
              <span className="cursor-pointer underline" onClick={()=>{setlogin(true)}}>Log in</span>
            </p>
          </div>

          {state === 'email' && (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="w-full bg-[#c3c3c3] text-white py-2 px-4 rounded-full hover:bg-[#b7b7b7] transition cursor-pointer" onClick={otpHandler}>
              Send OTP
            </button>
          </div>)}

          {state === 'otp' && (
                  <div className="space-y-4 mb-6">
                    <label className="block text-sm font-medium text-[#666666] mb-2">
                      6 digit OTP
                    </label>
                    <OtpInput
                            value={OTP}
                            onChange={setOTP}
                            numInputs={6}
                            renderSeparator={<span style={{ width: '8px' }} />}
                            shouldAutoFocus={true}
                            isInputNum={true}
                            inputType="tel"
                            isDisabled={false}
                            separatorStyle={{ width: '8px' }}
                            
                            renderInput={(props) => (
                              <input
                                {...props}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  margin: '0 4px',
                                  fontSize: '18px',
                                  border: 'none',
                                  borderBottom: '2px solid #666666',
                                  textAlign: 'center',
                                  outline: 'none',
                                  transition: 'border-color 0.3s',
                                }}
                              />
                            )}
                            inputStyle={{
                              width: '32px',
                              border: 'none',
                              borderBottom: '2px solid #ddd',
                            }}
                            containerStyle={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                    <button 
                      className="w-full bg-[#c3c3c3] text-white py-2 px-4 rounded-full hover:bg-[#b7b7b7] transition cursor-pointer" 
                      onClick={otpMatchHandler}
                    >
                      Verify OTP
                    </button>
                  </div>
          )}

          {state === 'password' && (
          <div className="space-y-4 mb-6">
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#666666] mb-2">
                Set Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full bg-[#c3c3c3] text-white py-2 px-4 rounded-full hover:bg-[#b7b7b7] transition cursor-pointer" onClick={registerHandler}>
              Create Account
            </button>
          </div>)}

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-[#666666]">OR</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social buttons */}
            <button className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-[#666666] py-2 px-4 rounded-full hover:bg-gray-50 transition" onClick={RegisterUsingGoogle}>
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>
          

        </div>
        </div>
      )}

      {login && (
        <div className="relative flex justify-center items-center min-h-screen bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
          {/* Header */}
          <div className="text-center mb-6 flex flex-col items-center">
            <div className="bg-gray-400 w-5 h-5 rounded-full mb-1"></div>
            <h1 className="text-2xl font-bold text-[#333333] mb-2 poppins-medium">Log in to your account</h1>
            <p className="poppins-regular text-[#333333]">
              Don't have an account?{' '}
              <span className="cursor-pointer underline" onClick={()=>{setlogin(false)}}>Create one</span>
            </p>
          </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#666666] mb-2">
                Your Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full bg-[#c3c3c3] text-white py-2 px-4 rounded-full hover:bg-[#b7b7b7] transition cursor-pointer" onClick={loginHandler}>
              Log in
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-[#666666]">OR</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social buttons */}
          
            
            <button className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-[#666666] py-2 px-4 rounded-full hover:bg-gray-50 transition" onClick={RegisterUsingGoogle}>
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>
          

        </div>
      </div>
      )}
    </div>
  );
};

export default Auth;