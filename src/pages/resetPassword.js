import React, { useContext, useState } from "react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import { LogIn, Loader } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {token}=useParams();
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same");
      setLoading(false);
      return;
    }
    const dataResponse = await fetch(SummaryApi.resetPassword.url, {
      method: SummaryApi.resetPassword.method,
      credentials: "include",   //useful if we are using cookie
      headers: {
        "content-type": "application/json", 
      },
      body: JSON.stringify({
        password,
        token
      }),
    });
    // console.log("dataResponse", dataResponse);
    const data = await dataResponse.json();
    if (data.success) {
      toast.success(data.message);
      
      navigate("/login");
    } else {
      toast.error(data.message);
    }
    setLoading(false);  
  };

  return (
    <section id="reset-password">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-lg shadow-md">
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* Password field */}
            {/* Heading */}
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Reset Password
            </h2>
            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            {/* Confirm Password field */}
            <div>
              <label>Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirm password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            {/* Save button */}
            <button
              type="submit"
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Save
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
