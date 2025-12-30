import { motion, AnimatePresence } from "framer-motion";

export default function BookingModal({ open, onClose, totalPrice }) {
  if (!open) return null;

  const bookingId = `TRV-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-8 w-full max-w-md text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
          >
            <span className="text-green-600 text-3xl">✔</span>
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>

          <p className="text-gray-600 mb-4">
            Your trip has been booked successfully.
          </p>

          <div className="bg-gray-100 rounded-lg p-4 text-left text-sm mb-4">
            <p>
              <strong>Booking ID:</strong> {bookingId}
            </p>
            <p>
              <strong>Total Paid:</strong> ₹{totalPrice}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
