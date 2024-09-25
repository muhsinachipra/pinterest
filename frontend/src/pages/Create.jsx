// frontend\src\pages\Create.jsx

import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const { addPin } = PinData();
  
  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const addPinHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    tags.forEach(tag => formData.append("tags[]", tag));
    formData.append("file", file);
    addPin(formData, setFilePrev, setFile, setTitle, setTags, navigate);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (tag) {
        setTags((prevTags) => [...prevTags, tag]);
        e.target.value = "";
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {/* Image Upload Section */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-80 h-auto p-6 bg-white rounded-lg shadow-lg">
            {filePrev && (
              <img src={filePrev} alt="Preview" className="w-full h-40 object-cover rounded-lg shadow-md" />
            )}
            <div
              className="flex flex-col items-center justify-center h-full cursor-pointer p-4 border-dashed border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition"
              onClick={handleClick}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeFileHandler}
              />
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
                <FaPlus className="text-gray-600" />
              </div>
              <p className="text-gray-500">Choose a file</p>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              We recommend using high-quality .jpg files but less than 10MB.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div>
          <div className="flex items-center justify-center bg-gray-100">
            <form
              className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"
              onSubmit={addPinHandler}
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="common-input rounded-lg shadow-sm border-gray-300 focus:ring focus:ring-blue-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags (Press Enter to add)
                </label>
                <input
                  type="text"
                  id="tags"
                  className="common-input rounded-lg shadow-sm border-gray-300 focus:ring focus:ring-blue-300"
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add a tag and press Enter"
                />
                <div className="mt-2 flex flex-wrap">
                  {tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mt-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <button className="common-btn rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                Add+
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
