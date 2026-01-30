import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { FaGoogle } from "react-icons/fa";
import { signInWithGoogle } from "../services/authService"
import {useNavigate} from 'react-router-dom'

const Authentication = () => {

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/')
    }
    catch(e){
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center">
        <button
          className="px-6 py-3 bg-white rounded-lg font-medium flex items-center gap-2 cursor-pointer hover:bg-neutral-200 text-neutral-800"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="text-red-700 text-lg"/>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Authentication;
