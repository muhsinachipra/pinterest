// frontend\src\context\UserContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a pre-configured axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  async function registerUser(name, email, password, navigate, fetchPins) {
    setBtnLoading(true);
    try {
      const { data } = await api.post("/api/users/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  async function loginUser(email, password, navigate, fetchPins) {
    setBtnLoading(true);
    try {
      const { data } = await api.post("/api/users/login", { email, password });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await api.get("/api/users/me");

      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function followUser(id, fetchUser) {
    try {
      const { data } = await api.post("/api/users/follow/" + id);

      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        user,
        loading,
        registerUser,
        setIsAuth,
        setUser,
        followUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
