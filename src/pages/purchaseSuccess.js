import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

import SummaryApi from "../common";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        const response = await fetch(SummaryApi.CheckoutSuccess.url, {
          method: SummaryApi.CheckoutSuccess.method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error("Failed to process checkout");
        }

        // Clear user's cart after successful purchase
        const clearCartResponse = await fetch(SummaryApi.deleteCartAfterPurchase.url, {
          method: SummaryApi.deleteCartAfterPurchase.method,
          credentials: "include",
        });
        if (!clearCartResponse.ok) {
          throw new Error("Failed to clear cart after purchase");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsProcessing(false);
        //  window.location.href = "/";
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, []);

  if (isProcessing) return "Processing...";
  if (error) return `Error: ${error}`;

  return (
    // <div className="h-screen flex items-center justify-center px-4">
    //   <Confetti
    //     width={window.innerWidth}
    //     height={window.innerHeight}
    //     gravity={0.1}
    //     style={{ zIndex: 99 }}
    //     numberOfPieces={700}
    //     recycle={false}
    //   />

    //   <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
    //     <div className="p-6 sm:p-8">
    //       <div className="flex justify-center">
    //         <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
    //       </div>
    //       <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
    //         Purchase Successful!
    //       </h1>

    //       <p className="text-gray-300 text-center mb-2">
    //         Thank you for your order. {"We're"} processing it now.
    //       </p>
    //       <p className="text-emerald-400 text-center text-sm mb-6">
    //         Check your email for order details and updates.
    //       </p>
    //       <div className="bg-gray-700 rounded-lg p-4 mb-6">
    //         <div className="flex items-center justify-between mb-2">
    //           <span className="text-sm text-gray-400">Order number</span>
    //           <span className="text-sm font-semibold text-emerald-400">
    //             #12345
    //           </span>
    //         </div>
    //         <div className="flex items-center justify-between">
    //           <span className="text-sm text-gray-400">Estimated delivery</span>
    //           <span className="text-sm font-semibold text-emerald-400">
    //             3-5 business days
    //           </span>
    //         </div>
    //       </div>

    //       <div className="space-y-4">
    //         <button
    //           className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
    //           rounded-lg transition duration-300 flex items-center justify-center"
    //         >
    //           <HandHeart className="mr-2" size={18} />
    //           Thanks for trusting us!
    //         </button>
    //         <Link
    //           to={"/"}
    //           className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4
    //           rounded-lg transition duration-300 flex items-center justify-center"
    //         >
    //           Continue Shopping
    //           <ArrowRight className="ml-2" size={18} />
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section id="payment-success" className="overflow-x-hidden">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto text-center rounded-lg shadow-md relative">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            gravity={0.1}
            style={{ zIndex: 99 }}
            numberOfPieces={400}
            recycle={false}
          />

          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
          </div>

          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Purchase Successful!
          </h1>

          <p className="text-gray-600 mb-1">
            Thank you for your order. We’re processing it now.
          </p>
          <p className="text-green-600 text-sm mb-6">
            Check your email for order details and updates.
          </p>

          <div className="bg-slate-100 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Order number</span>
              <span className="text-sm font-semibold text-green-600">
                #12345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Estimated delivery</span>
              <span className="text-sm font-semibold text-green-600">
                3–5 business days
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-all hover:scale-105 flex items-center justify-center">
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>

            <Link
              to={"/"}
              className="w-full bg-slate-100 hover:bg-slate-200 text-red-600 font-semibold py-2 px-4 rounded-full transition-all hover:scale-105 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseSuccessPage;
