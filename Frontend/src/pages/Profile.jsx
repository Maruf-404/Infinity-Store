import { useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Profile = () => {
  const { getProfile, profileData, setToken, setCartItems } =
    useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const { navigate } = useContext(ShopContext);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: 0,
    country: "",
    phone: 0,
  });

  const handleAddressChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const initializeProfile = () => {
    setName(profileData.name);
    setEmail(profileData.email);
    setAvatar(profileData.avatar?.url);
    setAddress(profileData.address);
  };

  const updateAvatar = async () => {
    try {
      const formData = new FormData();
      avatar && formData.append("image", avatar);
      await axiosInstance.post("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error in update avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.put("/user/profile", {
        name,
        email,
        address,
      });
      await updateAvatar();

      if (response.data.success) {
        await getProfile();
        setEdit(false);
        toast.success("Profile Edited");
      }
    } catch (error) {
      console.error("Error in update user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("accessToken");
    setToken("");
    setCartItems({});
  };

  useEffect(() => {
    if (profileData) {
      initializeProfile();
    }
  }, [profileData]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-4 md:px-[9vw] lg:px-[12vw]">
          <div className="text-2xl text-center pt-6 border-t">
            <Title text1={edit ? "Edit" : "My"} text2={"Profile"} />
          </div>
          <p className="text-gray-600 text-sm text-center ">
            Manage your personal information and preferences
          </p>
          <div className="flex flex-row justify-between">
            <div className="text-xl">
              <Title text1={"Personal"} text2={"Information"} />
            </div>
            {edit ? (
              <div className="flex flex-row gap-4">
                <img
                  onClick={() => setEdit(false)}
                  src={assets.cross_icon}
                  className="w-4 h-4 mt-3"
                  alt="cross_icon"
                />
                <button
                  onClick={() => updateProfile()}
                  className="px-3 py-0 bg-black text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                onClick={() => setEdit(true)}
                className="flex flex-row gap-2 text-red-500 border-2 border-gray-300 px-2 py-0 rounded"
              >
                <img
                  src={assets.edit_icon}
                  className="w-3 h-3 mt-2"
                  alt="edit icon"
                />
                <p>Edit</p>
              </div>
            )}
          </div>

          <div className="flex sm:flex-row flex-col gap-10">
            {edit ? (
              <div className="relative">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="hidden"
                />

                {/* Clickable avatar image */}
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <img
                    className="w-25 h-25 rounded-full border"
                    src={
                      !avatar
                        ? assets.upload_area
                        : typeof avatar === "string"
                        ? avatar
                        : URL.createObjectURL(avatar)
                    }
                    alt="Profile avatar"
                  />
                </label>
              </div>
            ) : (
              <img
                className="w-25 h-25 rounded-full"
                src={avatar ? avatar : assets.avatar_icon}
                alt="Rounded avatar"
              />
            )}
            <p>
              {edit ? (
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                  type="text"
                  placeholder="Full Name"
                />
              ) : (
                <b>{name}</b>
              )}
            </p>
          </div>
          <div className="flex lg:flex-row flex-col justify-between pt-5 w-2/3">
            <div className="flex flex-col gap-2">
              <p>
                <b>Email</b>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                  type="text"
                  placeholder="Email"
                />
              ) : (
                <p className="sm:text-md text-gray-600">{email}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <b>Phone Number</b>
              </p>
              {edit ? (
                <input
                  onChange={(e) => handleAddressChange(e)}
                  value={address?.phone}
                  name="phone"
                  className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                  type="text"
                  placeholder="Phone Number"
                />
              ) : (
                <p className="sm:text-sm text-gray-600">
                  {profileData?.address?.phone}
                </p>
              )}
            </div>
          </div>
          <div className="pt-7">
            <p>
              <b>Delivery Addresses</b>
            </p>

            {edit ? (
              <div>
                <input
                  onChange={(e) => handleAddressChange(e)}
                  value={address?.street}
                  name="street"
                  className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                  type="text"
                  placeholder="Street"
                />
                <div className="flex gap-3">
                  <input
                    onChange={(e) => handleAddressChange(e)}
                    value={address?.city}
                    name="city"
                    className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                    type="text"
                    placeholder="City"
                  />
                  <input
                    onChange={(e) => handleAddressChange(e)}
                    value={address?.state}
                    name="state"
                    className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                    type="text"
                    placeholder="State"
                  />
                </div>
                <div className="flex gap-3">
                  <input
                    onChange={(e) => handleAddressChange(e)}
                    value={address?.zipcode}
                    name="zipcode"
                    className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                    type="text"
                    placeholder="Zipcode"
                  />
                  <input
                    onChange={(e) => handleAddressChange(e)}
                    value={address?.country}
                    name="country"
                    className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                    type="text"
                    placeholder="Country"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-row pt-3 gap-4 text-gray-600">
                <img
                  src={assets.address_icon}
                  className="w-6 h-6 pt-1"
                  alt=""
                />
                <p>
                  {profileData?.address?.street}, {profileData?.address?.city}{" "}
                  <br /> {profileData?.address?.state},{" "}
                  {profileData?.address?.country},{" "}
                  {profileData?.address?.zipcode}
                </p>
              </div>
            )}
          </div>
          <p className="pt-5">
            <b>Order Management</b>
          </p>
          <div className="pt-1 flex justify-between">
            <div className="flex flex-row pt-3 gap-4 text-gray-600">
              <img src={assets.order} className="w-6 h-6 pt-2" alt="" />
              <div
                onClick={() => navigate("/orders")}
                className="flex flex-col"
              >
                <p>View Order History</p>
                <p className="text-sm text-gray-600">
                  Track your orders and view purchase history
                </p>
              </div>
            </div>
            <div className="pt-3">
              <button
                onClick={() => logout()}
                className="px-3 py-0 font-medium text-red-400 bg-white border-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
