import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]); // Initialize places as an empty array
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    axios.get('/places')
      .then(response => {
        setPlaces(response.data);
      })
      .catch(error => {
        setError(error); // Set error state if API call fails
      });
  }, []);

  // Check if there's an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {/* Check if places is an array before mapping */}
      {Array.isArray(places) && places.map(place => (
        <div key={place._id}> {/* Assign unique key to outermost element */}
          <Link to={'/place/'+place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
