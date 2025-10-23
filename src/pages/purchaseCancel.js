import { XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

const PurchaseCancel = () => {
  return (
    <section id="payment-cancel" className="overflow-x-hidden">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto text-center rounded-lg shadow-md relative">
    

          <div className="flex justify-center mb-4">
            <XCircle className="text-red-500 w-16 h-16" />
          </div>

          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Purchase Cancelled
          </h1>

          <p className="text-gray-600 mb-1">
            Your order has been cancelled. No charges have been made.
          </p>
          <p className="text-red-600 text-sm mb-6">
            If this was a mistake, you can try again.
          </p>

          <div className="bg-slate-100 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Order status</span>
              <span className="text-sm font-semibold text-red-600">
                Cancelled
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Refund status</span>
              <span className="text-sm font-semibold text-red-600">
                Not applicable
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-all hover:scale-105 flex items-center justify-center">
              <XCircle className="mr-2" size={18} />
              Transaction Cancelled
            </button>

            <Link
              to={"/"}
              className="w-full bg-slate-100 hover:bg-slate-200 text-red-600 font-semibold py-2 px-4 rounded-full transition-all hover:scale-105 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseCancel;
