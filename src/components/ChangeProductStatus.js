import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeProductStatus = ({ orderId, currentStatus, onClose }) => {
  // Define all possible statuses
  console.log("currentStatus",currentStatus);
  console.log("orderId",orderId);
  const STATUS = {
    PENDING: "PENDING",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
  };

  const [status, setStatus] = useState(currentStatus);

  // Handle dropdown change
  const handleOnChangeSelect = (e) => {
    setStatus(e.target.value);
  };

  // API call to update order status
  const updateOrderStatus = async () => {
    try {
      const response = await fetch(SummaryApi.changeOrderStatus.url, {
        method: SummaryApi.changeOrderStatus.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId, 
          status: status,
        }),
        credentials: "include",
      });

      const data = await response.json();
    //   console.log("staus",data);

      if (data.success) {
        toast.success("Order status updated successfully!");
        onClose(); // Close modal after success
      } else {
        toast.error(data.message || "Failed to update order status");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="bg-white shadow-md p-6 w-full max-w-sm rounded-lg">
        <button className="block ml-auto text-xl" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-semibold text-gray-800">
          Change Order Status
        </h1>

        <p className="text-gray-600">Order ID: {orderId}</p>
        <p className="text-gray-600 mb-4">Current Status: {currentStatus}</p>

        <div className="flex items-center justify-between mb-6">
          <p>Status:</p>
          <select
            className="border border-gray-400 rounded px-3 py-1"
            value={status}
            onChange={handleOnChangeSelect}
          >
            {Object.values(STATUS).map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full py-2 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition"
          onClick={updateOrderStatus}
        >
          Change Status
        </button>
      </div>
    </div>
  );
};

export default ChangeProductStatus;
