import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const WriteReview = ({ productId, userId, onClose }) => {
  const [rating, setRating] = useState(0); // selected rating
  const [hover, setHover] = useState(0);   // hover effect for stars
  const [comment, setComment] = useState(""); // review text

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      const response = await fetch(SummaryApi.addReview.url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId,rating, comment }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Review submitted successfully!");
        onClose(); // close modal
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch (err) {
      toast.error(err.message || "Server error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Write a Review</h2>

        {/* Star Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                size={30}
                className={`cursor-pointer transition-colors ${
                  starValue <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              />
            );
          })}
        </div>

        {/* Comment Textarea */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={4}
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default WriteReview;
