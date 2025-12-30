import { useState } from "react";
import { motion } from "framer-motion";

export default function PaymentModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    paymentType: "",
  });

  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.paymentType) {
      setError("Please fill all payment details");
      return;
    }

    onSuccess(); // ✅ payment success
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">
          Payment Details
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <select
            name="paymentType"
            value={form.paymentType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Payment Type</option>
            <option value="Card">Credit / Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="NetBanking">Net Banking</option>
          </select>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Pay & Confirm
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-500 text-sm"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
