import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(SummaryApi.salesAnalytics.url, {
		  credentials: "include",
          method: SummaryApi.salesAnalytics.method,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched analytics data:", data); // Debug

        // Always set a fallback object
        setAnalyticsData({
          users: data?.analyticsData?.users || 0,
          products: data?.analyticsData?.products || 0,
          totalSales: data?.analyticsData?.totalSales || 0,
          totalRevenue: data?.analyticsData?.totalRevenue || 0,
        });

        setDailySalesData(data?.dailySalesData || []);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        // fallback
        setAnalyticsData({
          users: 0,
          products: 0,
          totalSales: 0,
          totalRevenue: 0,
        });
        setDailySalesData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <AnalyticsCard
        title="Total Users"
        value={analyticsData.users.toLocaleString()}
        icon={Users}
        color="from-red-500 to-red-700" // 🔴 your theme color
      />
      <AnalyticsCard
        title="Total Products"
        value={analyticsData.products.toLocaleString()}
        icon={Package}
        color="from-gray-500 to-gray-700" // ⚪ subtle contrast
      />
      <AnalyticsCard
        title="Total Sales"
        value={analyticsData.totalSales.toLocaleString()}
        icon={ShoppingCart}
        color="from-red-400 to-red-600" // 🔴 lighter red gradient
      />
      <AnalyticsCard
        title="Total Revenue"
        value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        color="from-gray-600 to-gray-800" // ⚪ neutral tone
      />
    </div>

    <motion.div
      className="bg-white rounded-lg p-6 shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dailySalesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /> {/* light gray grid */}
          <XAxis dataKey="date" stroke="#4B5563" /> {/* gray-700 axis */}
          <YAxis yAxisId="left" stroke="#4B5563" />
          <YAxis yAxisId="right" orientation="right" stroke="#4B5563" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke="#DC2626" // 🔴 red tone for sales
            activeDot={{ r: 8 }}
            name="Sales"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="#9CA3AF" // ⚪ gray for revenue
            activeDot={{ r: 8 }}
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  </div>
);

};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-white text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 opacity-30" />
    <div className="absolute -bottom-4 -right-4 text-white/80 opacity-50">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
