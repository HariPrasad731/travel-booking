import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

export default function Hero({ onSearch }) {
  // ✅ Restore from localStorage
  const [from, setFrom] = useState(() => localStorage.getItem("from") || "");
  const [to, setTo] = useState(() => localStorage.getItem("to") || "");
  const [date, setDate] = useState(() => localStorage.getItem("date") || "");
  const [travelers, setTravelers] = useState(
    () => Number(localStorage.getItem("heroTravelers")) || 1
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filterCities = (value) =>
    CITIES.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );

  // ✅ Persist to localStorage
  useEffect(() => {
    localStorage.setItem("from", from);
  }, [from]);

  useEffect(() => {
    localStorage.setItem("to", to);
  }, [to]);

  useEffect(() => {
    localStorage.setItem("date", date);
  }, [date]);

  useEffect(() => {
    localStorage.setItem("heroTravelers", travelers);
  }, [travelers]);

  const handleSearch = () => {
    setError("");

    if (!from || !to || !date) {
      setError("Please select From, To and Travel Date");
      return;
    }

    if (from === to) {
      setError("From and To destinations cannot be the same");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      onSearch?.({
        from,
        to,
        date,
        travelers,
      });

      document
        .getElementById("available-trips")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  return (
    <section className="relative bg-[#f4f7fb] min-h-screen pt-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Let’s <br />
            <span className="text-blue-600">travel</span> the <br />
            world
          </h1>

          <p className="text-gray-500 mt-6 max-w-md">
            Discover amazing destinations and book unforgettable journeys with ease.
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-600 mt-4 text-sm font-medium">
              {error}
            </p>
          )}

          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-white rounded-2xl shadow-xl p-4 grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            <AutoInput
              label="From"
              value={from}
              setValue={setFrom}
              options={filterCities(from)}
            />

            <AutoInput
              label="To"
              value={to}
              setValue={setTo}
              options={filterCities(to)}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Search
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE STACK (UNCHANGED) */}
        <div className="relative h-[500px] hidden md:block">
          <motion.img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Beach"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-24 w-64 h-80 object-cover rounded-2xl shadow-2xl rotate-[-6deg]"
          />

          <motion.img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
            alt="Paris"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-24 right-10 w-56 h-72 object-cover rounded-2xl shadow-2xl rotate-[4deg]"
          />

          <motion.img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
            alt="Dubai"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-0 left-36 w-44 h-56 object-cover rounded-xl shadow-xl rotate-[-2deg]"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------ */
/* Autocomplete Input */
/* ------------------ */

function AutoInput({ label, value, setValue, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <input
        placeholder={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {open && options.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow mt-1 z-20 max-h-40 overflow-auto">
          {options.map((city) => (
            <div
              key={city}
              onMouseDown={() => {
                setValue(city);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
