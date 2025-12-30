import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "../Skeleton/Skeleton";

/* ✅ MASTER CITY LIST */
const CITIES = [
  "Hyderabad",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "New York",
  "Los Angeles",
  "London",
  "Paris",
  "Dubai",
  "Singapore",
  "Tokyo",
  "Sydney",
  "Toronto",
  "Berlin",
];

/* ✅ GENERATE TRIPS: FROM EACH CITY → ALL OTHER CITIES */
function generateTrips() {
  let id = 1;
  const trips = [];

  for (let from of CITIES) {
    for (let to of CITIES) {
      if (from !== to) {
        trips.push({
          id: id++,
          from,
          to,
          route: `${from} → ${to}`,
          time: "06:00 AM - 10:00 AM",
          price: Math.floor(Math.random() * 40000) + 5000,
        });
      }
    }
  }

  return trips;
}

export default function Trips({ onSelect, searchData }) {
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("low");
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrips(generateTrips());
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  /* ✅ SEARCH BEHAVIOR */
  const visibleTrips = searchData
    ? trips.filter(
        (trip) =>
          trip.from === searchData.from &&
          trip.to === searchData.to
      )
    : trips;

  const sortedTrips = [...visibleTrips].sort((a, b) =>
    sort === "low" ? a.price - b.price : b.price - a.price
  );

  return (
    <section
      id="available-trips"
      className="max-w-7xl mx-auto px-4 py-16"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Available Trips
        </h2>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} />
          ))
        ) : (
          sortedTrips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            >
              {/* Trip Info */}
              <div>
                <h3 className="font-semibold text-lg">
                  {trip.route}
                </h3>
                <p className="text-gray-500 text-sm">
                  {trip.time}
                </p>
              </div>

              {/* Price + Action */}
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">
                  ₹{trip.price.toLocaleString()}
                </p>
                <button
                  onClick={() => onSelect(trip.price)}
                  className="mt-2 text-sm bg-blue-600 text-white px-5 py-1.5 rounded-lg hover:bg-blue-700 transition"
                >
                  Select
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
