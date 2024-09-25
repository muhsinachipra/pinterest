import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { UserData } from "../context/UserContext";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const PinPage = ({ user }) => {
  const params = useParams();
  const {
    loading,
    fetchPin,
    pin,
    updatePin,
    addComment,
    unlikePin,
    likePin,
    deleteComment,
    deletePin,
  } = PinData();

  const { followUser } = UserData();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();

  const editHandler = () => {
    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  const deleteCommentHandler = (id) => {
    if (confirm("Are you sure you want to delete this comment")) {
      deleteComment(pin._id, id);
    }
  };

  const deletePinHandler = () => {
    if (confirm("Are you sure you want to delete this pin")) {
      deletePin(pin._id, navigate);
    }
  };

  const likeHandler = async () => {
    if (isLiked) {
      await unlikePin(pin._id);
      setLikeCount((prev) => Math.max(prev - 1, 0));
    } else {
      await likePin(pin._id);
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const followHandler = () => {
    setIsFollowing(!isFollowing);
    followUser(pin.owner._id, fetchPin);
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  useEffect(() => {
    if (pin) {
      setLikeCount(pin.likes.length);
      setIsLiked(pin.likes.includes(user._id));
      setIsFollowing(pin.owner.followers.includes(user._id));
    }
  }, [pin, user]);

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl p-6">
          <div className="w-full md:w-1/2 flex items-center justify-center">
            {pin.image && (
              <img
                src={pin.image.url}
                alt=""
                className="object-cover w-full rounded-lg"
              />
            )}
          </div>

          <div className="w-full md:w-1/2 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              {edit ? (
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 rounded w-3/4"
                  placeholder="Enter Title"
                />
              ) : (
                <h1 className="text-2xl font-bold">{pin.title}</h1>
              )}

              {pin.owner && pin.owner._id === user._id && (
                <div className="flex items-center">
                  <button onClick={editHandler} className="text-blue-500">
                    <FaEdit />
                  </button>
                  <button
                    onClick={deletePinHandler}
                    className="text-red-500 ml-2"
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap mb-4">
              {pin.tags && pin.tags.map((tag, index) => (
                <span key={index} className="bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2">
                  #{tag}
                </span>
              ))}
            </div>

            {edit && (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={updateHandler}
              >
                Update
              </button>
            )}

            {pin.owner && (
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <Link to={`/user/${pin.owner._id}`} className="flex items-center">
                  <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                    <span className="font-bold">{pin.owner.name[0]}</span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{pin.owner.name}</h2>
                    <p className="text-gray-500">{pin.owner.followers.length} Followers</p>
                  </div>
                </Link>
                {/* Follow button */}
                <button
                  onClick={followHandler}
                  className={`ml-4 px-4 py-2 rounded-full ${isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            )}

            <div className="flex items-center mb-4">
              <button onClick={likeHandler} className="flex items-center">
                {isLiked ? (
                  <AiFillHeart className="text-red-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-blue-500 text-2xl" />
                )}
                <span className="ml-2 text-lg">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
              </button>
            </div>

            <div className="flex items-center mt-4 mb-6">
              <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center mr-4">
                <span className="font-bold">{pin.owner?.name[0]}</span>
              </div>
              <form className="flex-1 flex" onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Enter Comment"
                  className="flex-1 border rounded-lg p-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 px-4 py-2 rounded-md text-white"
                >
                  Add
                </button>
              </form>
            </div>

            <hr className="my-4" />

            <div className="overflow-y-auto max-h-64">
              {pin.comments.length > 0 ? (
                pin.comments.map((e, i) => (
                  <div key={i} className="flex items-center justify-between mb-4">
                    <Link to={`/user/${e.user}`} className="flex items-center">
                      <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                        <span className="font-bold">{e.name[0]}</span>
                      </div>
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold">{e.name}</h2>
                        <p className="text-gray-500">{e.comment}</p>
                      </div>
                    </Link>
                    {e.user === user._id && (
                      <button
                        onClick={() => deleteCommentHandler(e._id)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Be the first one to add a comment</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PinPage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default PinPage;
