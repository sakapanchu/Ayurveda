import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  // Original data queries
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  // State for animated counter values
  const [displaySales, setDisplaySales] = useState(0);
  const [displayCustomers, setDisplayCustomers] = useState(0);
  const [displayOrders, setDisplayOrders] = useState(0);

  // Animate counters when data loads or updates
  useEffect(() => {
    if (sales) animateValue(setDisplaySales, 0, sales.totalSales, 1000);
    if (customers) animateValue(setDisplayCustomers, 0, customers.length, 1000);
    if (orders) animateValue(setDisplayOrders, 0, orders.totalOrders, 1000);
  }, [sales, customers, orders]);

  const animateValue = (setter, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setter(end === 0 ? 0 : value);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  // Sales Trend Chart
  const [salesChart, setSalesChart] = useState({
    options: {
      chart: {
        type: "line",
        height: 350,
        foreColor: '#fff',
        toolbar: { show: true },
      },
      colors: ["#3B82F6"],
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 5 },
      xaxis: { 
        categories: [],
        labels: { style: { colors: '#9CA3AF' } }
      },
      yaxis: { 
        labels: { style: { colors: '#9CA3AF' } },
        title: { text: "Amount ($)", style: { color: '#9CA3AF' } }
      },
      tooltip: { theme: "dark" },
      grid: { borderColor: '#4B5563' },
    },
    series: [{ name: "Daily Sales", data: [] }],
  });

  // Order Status Data - Stacked Bar Chart
  const orderStatusData = {
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        foreColor: '#fff',
        toolbar: { show: true },
      },
      colors: ['#10B981', '#F59E0B', '#EF4444'],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          columnWidth: '70%',
          dataLabels: {
            position: 'center', // shows labels inside the bars
          },
        },
      },
      xaxis: {
        categories: ['Order Status'],
        labels: { style: { colors: '#9CA3AF' } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: { style: { colors: '#9CA3AF' } },
        title: { text: 'Number of Orders', style: { color: '#9CA3AF' } },
        min: 0
      },
      legend: { 
        position: 'bottom',
        labels: { colors: '#fff' },
        markers: { radius: 12 }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val > 0 ? val : '';
        },
        style: {
          colors: ['#fff'],
          fontSize: '12px',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: 'dark'
      },
      responsive: [{
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      }]
    },
    series: [
      {
        name: 'Completed',
        data: [orders?.completedOrders || 0]
      },
      {
        name: 'Processing',
        data: [orders?.processingOrders || 0]
      },
      {
        name: 'Pending',
        data: [orders?.pendingOrders || 0]
      }
    ]
  };

  // Recent Activity Data - Line Chart
  const recentActivityData = {
    options: {
      chart: {
        type: 'line',
        foreColor: '#fff',
        toolbar: { show: true },
        zoom: { enabled: false }
      },
      stroke: { width: [3, 3, 3], curve: 'smooth' },
      colors: ['#10B981', '#3B82F6', '#F59E0B'],
      markers: { size: 5, hover: { size: 7 } },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: { style: { colors: '#9CA3AF' } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: { style: { colors: '#9CA3AF' } },
        title: { text: 'Number of Orders', style: { color: '#9CA3AF' } },
        min: 0
      },
      legend: { 
        position: 'bottom',
        labels: { colors: '#fff' },
        markers: { radius: 12 }
      },
      grid: {
        borderColor: '#4B5563',
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } }
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: 'dark'
      }
    },
    series: [
      {
        name: 'Completed',
        data: [12, 19, 15, 21, 14, 8, 10] // Replace with real data
      },
      {
        name: 'New Orders',
        data: [18, 22, 17, 25, 19, 12, 15] // Replace with real data
      },
      {
        name: 'Processing',
        data: [5, 8, 6, 9, 7, 4, 3] // Replace with real data
      }
    ]
  };

  // Update charts when data changes
  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setSalesChart(prev => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: formattedSalesDate.map(item => item.x)
          }
        },
        series: [
          { name: "Daily Sales", data: formattedSalesDate.map(item => item.y) }
        ]
      }));
    }
  }, [salesDetail]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 transition-all duration-300 ease-in-out md:ml-[4%]  text-white">
      <AdminMenu />
      
      <div className="xl:ml-[4rem] md:ml-[0rem] p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sales Card */}
          <div className="bg-green-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:bg-gray-700 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Sales</p>
                <h2 className="text-2xl font-bold mt-1">
                  ${loadingSales ? <Loader size="sm" /> : displaySales.toFixed(2)}
                </h2>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-green-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500 hover:bg-gray-700 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Customers</p>
                <h2 className="text-2xl font-bold mt-1">
                  {loadingCustomers ? <Loader size="sm" /> : displayCustomers}
                </h2>
              </div>
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-green-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover:bg-gray-700 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Orders</p>
                <h2 className="text-2xl font-bold mt-1">
                  {loadingOrders ? <Loader size="sm" /> : displayOrders}
                </h2>
              </div>
              <div className="bg-green-500/20 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Trend Chart */}
        <div className="bg-green-800 rounded-xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Sales Trend</h3>
            <div className="text-sm text-gray-400">
              {salesDetail?.length || 0} days of data
            </div>
          </div>
          <Chart
            options={salesChart.options}
            series={salesChart.series}
            type="line"
            height={350}
          />
        </div>

        {/* Order Status and Activity Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Order Status Stacked Bar Chart */}
          <div className="bg-green-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order Status Breakdown</h3>
              <div className="bg-gray-700 px-3 py-1 rounded-lg">
                <span className="text-sm text-gray-300">Total: </span>
                <span className="font-medium">
                  {(orders?.completedOrders || 0) + 
                   (orders?.processingOrders || 0) + 
                   (orders?.pendingOrders || 0)}
                </span>
              </div>
            </div>
            <Chart
              options={orderStatusData.options}
              series={orderStatusData.series}
              type="bar"
              height={350}
            />
          </div>
          
          {/* Recent Activity Line Chart */}
          <div className="bg-green-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Weekly Order Activity</h3>
            <Chart
              options={recentActivityData.options}
              series={recentActivityData.series}
              type="line"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;