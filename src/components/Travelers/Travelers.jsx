export default function Travelers({
  travelers,
  setTravelers,
  seatType,
  setSeatType,
}) {
  const seats = [
    { label: "Economy", multiplier: 1 },
    { label: "Business", multiplier: 1.5 },
    { label: "First Class", multiplier: 2 },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Travelers & Seat Selection
      </h2>

      {/* Travelers Count */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => {
            // ✅ DO NOT allow zero
            if (travelers === 1) {
              // only scroll back, do NOT change any state
              document
                .getElementById("available-trips")
                ?.scrollIntoView({ behavior: "smooth" });
              return;
            }

            setTravelers(travelers - 1);
          }}
          className="w-10 h-10 rounded-full bg-gray-200 text-xl"
        >
          −
        </button>

        {/* ✅ Always stays >= 1 */}
        <span className="text-xl font-semibold">{travelers}</span>

        <button
          onClick={() => setTravelers(travelers + 1)}
          className="w-10 h-10 rounded-full bg-gray-200 text-xl"
        >
          +
        </button>
      </div>

      {/* Seat Type */}
      <div className="flex gap-4">
        {seats.map((seat) => (
          <button
            key={seat.label}
            onClick={() => setSeatType(seat)}
            className={`px-6 py-3 rounded-lg border transition ${
              seatType.label === seat.label
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            {seat.label}
          </button>
        ))}
      </div>
    </section>
  );
}
