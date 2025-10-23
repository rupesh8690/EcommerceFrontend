import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { FaRegCircleUser, FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import imageTobase64 from "../helpers/imageTobase64";
import { setUserDetails } from "../store/userSlice";
  import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
const UserProfile = () => {
  const user = useSelector((state) => state?.user?.user);
   const dispatch = useDispatch();
  const navigate = useNavigate();
  // Local state for form
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    profilePic: user?.profilePic || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setFormData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      setLoading(false);
      return;
    }

    if (formData.password === formData.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.updateProfile.url, {
        method: SummaryApi.updateProfile.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        handleLogout();
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
        setLoading(false);
      }
    }
  };

  return (
    <section className="min-h-[calc(100vh-120px)] flex justify-center items-start p-4 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        {/* Profile Picture */}
        <div className="w-24 h-24 mx-auto relative mb-6">
          {formData.profilePic ? (
            <img
              src={formData.profilePic}
              alt={formData.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaRegCircleUser className="w-full h-full text-gray-300" />
          )}
          <label className="absolute bottom-0 w-full text-center text-xs bg-gray-200 bg-opacity-80 py-1 cursor-pointer rounded-b">
            Upload Photo
            <input
              type="file"
              className="hidden"
              onChange={handleProfilePicUpload}
            />
          </label>
        </div>

        {/* Profile Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-100 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-2 rounded bg-gray-100 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <div className="flex items-center bg-gray-100 rounded p-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
              <span
                className="ml-2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div>
            <label className="block mb-1">Confirm Password</label>
            <div className="flex items-center bg-gray-100 rounded p-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                required
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
              <span
                className="ml-2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
