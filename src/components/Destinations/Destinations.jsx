import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Goa",
    price: "₹5,999",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    name: "Paris",
    price: "₹45,999",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
  {
    id: 3,
    name: "Dubai",
    price: "₹25,999",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  },
];

export default function Destinations() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((place) => (
          <motion.div
            key={place.id}
            whileHover={{ scale: 1.05 }}
            className="relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-semibold">
                {place.name}
              </h3>
              <p className="text-white text-sm">
                Starting from {place.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
