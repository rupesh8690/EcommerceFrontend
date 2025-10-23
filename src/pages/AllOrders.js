import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import ChangeProductStatus from "../components/ChangeProductStatus";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateOrderDetails, setUpdateOrderDetails] = useState({
    _id: "",
    status: "",
  });

  // Fetch all orders from backend
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: "include",
      });

      const data = await response.json();
      console.log("dataResponse", data);

      if (data.success) {
        setAllOrders(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Orders</h2>

      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-2">Sr.</th>
            <th className="p-2">Order ID</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">State</th>
            <th className="p-2">Address</th>
            
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {allOrders.length > 0 ? (
            allOrders.map((order, index) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-all"
              >
                <td className="text-center p-2">{index + 1}</td>
                <td className="text-center p-2 text-sm text-gray-700">
                  {order.orderId}
                </td>

                {/* Product Names */}
                <td className="text-center p-2">
                  {order.products.map((item, i) => (
                    <div key={i} className="text-gray-800 font-medium">
                      {item.productName || "N/A"}
                    </div>
                  ))}
                </td>

                {/* Quantities */}
                <td className="text-center p-2">
                  {order.products.map((item, i) => (
                    <div key={i}>{item.quantity}</div>
                  ))}
                </td>

                <td className="text-center p-2">{order.userEmail || "N/A"}</td>
                <td className="text-center p-2">{order.phone || "N/A"}</td>
                <td className="text-center p-2">{order.state || "N/A"}</td>
                <td className="text-center p-2">{order.address || "N/A"}</td>


                {/* Action */}
                <td className="text-center p-2">
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateOrderDetails({
                        _id: order.orderId,
                        status: order.status,
                      });
                      setUpdateStatus(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                className="text-center p-4 text-gray-500 font-medium"
              >
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for changing order status */}
      {updateStatus && (
        <ChangeProductStatus
          orderId={updateOrderDetails._id}
          currentStatus={updateOrderDetails.status}
          onClose={() => {
            setUpdateStatus(false);
            fetchAllOrders(); // refresh orders after update
          }}
        />
      )}
    </div>
  );
};

export default AllOrders;
