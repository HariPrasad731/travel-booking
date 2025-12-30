import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Destinations from "../components/Destinations/Destinations";
import Trips from "../components/Trips/Trips";
import Travelers from "../components/Travelers/Travelers";
import PriceSummary from "../components/PriceSummary/PriceSummary";
import BookingModal from "../components/BookingModal/BookingModal";
import PaymentModal from "../components/Payment/PaymentModal";

export default function Home() {
  // ✅ Restore from localStorage
  const [selectedPrice, setSelectedPrice] = useState(
    () => Number(localStorage.getItem("selectedPrice")) || 0
  );

  const [travelers, setTravelers] = useState(
    () => Number(localStorage.getItem("travelers")) || 1
  );

  const [seatType, setSeatType] = useState(() =>
    JSON.parse(localStorage.getItem("seatType")) || {
      label: "Economy",
      multiplier: 1,
    }
  );

  const [searchData, setSearchData] = useState(() =>
    JSON.parse(localStorage.getItem("searchData")) || null
  );

  const [showPayment, setShowPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ✅ Community skeleton loader
  const [communityLoading, setCommunityLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCommunityLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Persist to localStorage
  useEffect(() => {
    localStorage.setItem("selectedPrice", selectedPrice);
  }, [selectedPrice]);

  useEffect(() => {
    localStorage.setItem("travelers", travelers);
  }, [travelers]);

  useEffect(() => {
    localStorage.setItem("seatType", JSON.stringify(seatType));
  }, [seatType]);

  useEffect(() => {
    localStorage.setItem("searchData", JSON.stringify(searchData));
  }, [searchData]);

  const seatCharge = selectedPrice * (seatType.multiplier - 1);
  const subtotal = (selectedPrice + seatCharge) * travelers;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Header />

      {/* HOME */}
      <section>
        <div id="home" />
        <Hero onSearch={(data) => setSearchData(data)} />
      </section>

      {/* PACKAGES */}
      <section>
        <div id="packages" />
        <Destinations />

        {searchData && (
          <Trips
            searchData={searchData}
            onSelect={(price) => {
              setSelectedPrice(price);
              setTimeout(() => {
                document
                  .getElementById("traveler-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          />
        )}
      </section>

      {/* COMMUNITY */}
      <section className="bg-white py-24">
        <div id="community" />

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Our Community
          </h2>

          <p className="text-gray-600 max-w-3xl mb-12 leading-relaxed">
            Travellow is supported by a growing global community of travelers
            who share experiences, reviews, and tips to help others plan better
            journeys.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CommunitySkeleton key={i} />
                ))
              : (
                <>
                  <CommunityCard
                    img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                    title="Trusted Reviews"
                    desc="Read genuine reviews from real travelers before booking your next trip."
                  />
                  <CommunityCard
                    img="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                    title="Travel Stories"
                    desc="Discover inspiring travel stories shared by our community."
                  />
                  <CommunityCard
                    img="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                    title="Growing Network"
                    desc="Be part of a fast-growing network of explorers worldwide."
                  />
                </>
              )}
          </div>
        </div>
      </section>

      {/* BOOKING FLOW */}
      {selectedPrice > 0 && (
        <>
          <div id="traveler-section">
            <Travelers
              travelers={travelers}
              setTravelers={setTravelers}
              seatType={seatType}
              setSeatType={setSeatType}
            />
          </div>

          <PriceSummary
            basePrice={selectedPrice}
            travelers={travelers}
            seatType={seatType}
          />

          <div className="max-w-4xl mx-auto px-4 pb-20">
            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
            >
              Confirm Booking
            </button>
          </div>
        </>
      )}

      {/* PAYMENT MODAL */}
      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={() => {
          setShowPayment(false);
          setShowModal(true);
        }}
      />

      {/* BOOKING CONFIRMATION */}
      <BookingModal
        open={showModal}
        onClose={() => setShowModal(false)}
        totalPrice={total}
      />

      {/* FOOTER / ABOUT */}
      <footer className="bg-gray-900 text-gray-300 py-20 mt-20">
        <div id="about" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Travellow
            </h3>
            <p className="text-gray-400">
             At Travellow Adventures, we believe travel isn't just a vacation; it's a transformation. We're passionate explorers dedicated to crafting unforgettable journeys that open your eyes to new cultures, breathtaking landscapes, and hidden gems, making the world feel a little smaller and infinitely more wonderful". 
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              About Us
            </h4>
            <p className="text-gray-400">
              Built with React, Tailwind CSS, and Framer Motion.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Why Travellow?
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>• Global destinations</li>
              <li>• Transparent pricing</li>
              <li>• Smooth booking flow</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* COMMUNITY CARD */
function CommunityCard({ img, title, desc }) {
  return (
    <div className="bg-gray-50 rounded-xl border overflow-hidden hover:shadow-lg transition">
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="h-40 w-full object-cover bg-gray-200"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

/* COMMUNITY SKELETON */
function CommunitySkeleton() {
  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-300" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
      </div>
    </div>
  );
}
