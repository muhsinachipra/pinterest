import { useState } from "react"; // Import useState
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import PropTypes from 'prop-types';

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  const { pins } = PinData();
  const [viewMode, setViewMode] = useState('created'); // New state to manage view mode

  const logoutHandler = async () => {
    try {
      const { data } = await axios.post("/api/users/logout");
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  let userPins;
  let likedPins;

  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id); // User's created pins
    likedPins = pins.filter((pin) => pin.likes && pin.likes.includes(user._id)); // User's liked pins
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 w-full">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-3xl text-gray-700">{user.name.slice(0, 1)}</span>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-center text-gray-600 mt-2">{user.email}</p>
          <p className="flex justify-center items-center font-bold text-center gap-3 text-gray-800 mt-2">
            {user.followers && <p>{user.followers.length} followers</p>}
            {user.following && <p>{user.following.length} followings</p>}
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <button onClick={logoutHandler} className="bg-gray-200 px-4 py-2 rounded-full">Logout</button>
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setViewMode('created')}
              className={`px-4 py-2 rounded-full ${viewMode === 'created' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Created Images
            </button>
            <button
              onClick={() => setViewMode('liked')}
              className={`px-4 py-2 rounded-full ${viewMode === 'liked' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Liked Images
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {viewMode === 'created' ? (
              userPins && userPins.length > 0 ? (
                userPins.map((e) => <PinCard key={e._id} pin={e} />)
              ) : (
                <p>No Pins Created Yet</p>
              )
            ) : (
              likedPins && likedPins.length > 0 ? (
                likedPins.map((e) => <PinCard key={e._id} pin={e} />)
              ) : (
                <p>No Pins Liked Yet</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Account;
