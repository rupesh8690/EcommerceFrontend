import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import WriteReview from "../components/WriteReview";
const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openReview, setOpenReview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    productId: "",
    userId: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(SummaryApi.purchaseHistory.url, {
          method: SummaryApi.purchaseHistory.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log("purchase history data", data);
        if (data.success) {
          setOrders(data.data || []);
        } else {
          toast.error(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        toast.error("Something went wrong while fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <p className="text-gray-500">Loading purchase history...</p>
      </div>
    );
  }

  // ✅ Flatten all orders so that each product appears in one row
  const flattenedData = orders.flatMap((order) =>
    order.products.map((p) => ({
      orderId: order._id,
      date: order.createdAt,
      productName: p.product?.productName || "Unnamed Product",
      productId: p.product?._id,
      quantity: p.quantity,
      price: p.price,
      paymentMode: "Stripe",
      image: p.product?.productImage?.[0] || "", // since productImage is an array
      status: order.status,
    }))
  );

  return (
    <section className="min-h-[calc(100vh-120px)] p-4 bg-gray-50 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl">
        <h2 className="text-xl font-semibold mb-4">Purchase History</h2>

        {flattenedData.length === 0 ? (
          <p className="text-gray-500">No purchase history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Order ID</th>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Product Name</th>
                  <th className="p-3 border-b">Quantity</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Payment Mode</th>
                  <th className="p-3 border-b">Image</th>
                  <th className="p-3 border-b">Review</th>
                </tr>
              </thead>
              <tbody>
                {flattenedData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{item.orderId}</td>
                    <td className="p-3 border-b">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b">{item.productName}</td>
                    <td className="p-3 border-b">{item.quantity}</td>
                    <td className="p-3 border-b">₹{item.price}</td>
                    <td className="p-3 border-b">{item.paymentMode}</td>
                    <td className="p-3 border-b">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.productName}
                          onClick={() => navigate(`/product/${item.productId}`)}
                          className="w-12 h-12 object-cover rounded cursor-pointer"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No image</span>
                      )}
                    </td>
                    <td className="p-3 border-b">
                      <button
                        onClick={() =>{
                          setSelectedProduct(item)
                          setOpenReview(true)
                        }

                        
                        }
                        className="
    bg-green-100 
    p-2 
    rounded-full 
    hover:bg-green-500 
    hover:text-white 
    disabled:bg-gray-300 
    disabled:text-gray-500 
    disabled:cursor-not-allowed
  "
                        disabled={item.status !== "delivered"}
                        title={
                          item.status !== "delivered"
                            ? "You can write review once product is delivered"
                            : "Write a review"
                        }
                      >
                        <MdModeEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {
              openReview && (
                <WriteReview 
                  onClose={()=>setOpenReview(false)} 
                  productId={selectedProduct.productId}
                  userId={selectedProduct.userId}
                />
              )
            }
          </div>
        )}
      </div>
    </section>
  );
};

export default PurchaseHistory;
