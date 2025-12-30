import { motion } from "framer-motion";

export default function PriceSummary({
  basePrice,
  travelers,
  seatType,
}) {
  const seatCharge = basePrice * (seatType.multiplier - 1);
  const subtotal = (basePrice + seatCharge) * travelers;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Price Summary</h2>

      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <div className="flex justify-between">
          <span>Base Fare</span>
          <span>₹{basePrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Seat Type ({seatType.label})</span>
          <span>₹{Math.round(seatCharge)}</span>
        </div>

        <div className="flex justify-between">
          <span>Travelers</span>
          <span>{travelers}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>₹{tax}</span>
        </div>

        <hr />

        <motion.div
          key={total}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between text-xl font-bold text-blue-600"
        >
          <span>Total</span>
          <span>₹{total}</span>
        </motion.div>
      </div>
    </section>
  );
}
