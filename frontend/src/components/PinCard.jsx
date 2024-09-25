import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const PinCard = ({ pin }) => {
  return (
    <div className="p-4">
      <div className="bg-white overflow-hidden shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300 relative group cursor-pointer w-full max-w-xs h-72"> {/* Set fixed height */}
        <img src={pin.image.url} alt={pin.title} className="w-full h-full object-cover" /> {/* Use object-cover for image */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Link
              to={`/pin/${pin._id}`}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow"
            >
              View Pin
            </Link>
          </div>
        </div>
      </div>
      {/* Uncomment this line if you want to display the title */}
      {/* <h2 className="mt-2 text-lg font-semibold text-gray-800">{pin.title}</h2> */}
    </div>
  );
};

PinCard.propTypes = {
  pin: PropTypes.object.isRequired,
};

export default PinCard;
