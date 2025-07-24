import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../context/FirebaseContext';
import { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const OrderHistory = () => {
  const { user } = useContext(FirebaseContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch('http://localhost:4000/getMyOrders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        if (data.success) {
          // Sort orders: Preparing first, then by date (newest first)
          const sortedOrders = data.orders.sort((a, b) => {
            if (a.status === 'Preparing' && b.status !== 'Preparing') return -1;
            if (a.status !== 'Preparing' && b.status === 'Preparing') return 1;
            return new Date(b.orderDate) - new Date(a.orderDate);
          });
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'Shipped':
        return <FaShippingFast className="text-blue-500" />;
      default:
        return <FaBoxOpen className="text-yellow-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-10">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <FaBoxOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-gray-500">Start shopping to see your orders here.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Preparing Orders */}
            {orders.filter(order => order.status === 'Preparing').length > 0 && (
              <div>
                <div className="space-y-6">
                  {orders.filter(order => order.status === 'Preparing').map((order) => (
                    <OrderCard 
                      key={order._id} 
                      order={order} 
                      navigate={navigate}
                      formatDate={formatDate}
                      getStatusIcon={getStatusIcon}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed/Delivered Orders */}
            {orders.filter(order => order.status !== 'Preparing').length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                <div className="space-y-6">
                  {orders.filter(order => order.status !== 'Preparing').map((order) => (
                    <OrderCard 
                      key={order._id} 
                      order={order} 
                      navigate={navigate}
                      formatDate={formatDate}
                      getStatusIcon={getStatusIcon}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Separate component for order card
const OrderCard = ({ order, navigate, formatDate, getStatusIcon }) => {
  const remainingProducts = order.products.length - 1;
  
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order #{order._id.toString().slice(-6).toUpperCase()}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Placed on {formatDate(order.orderDate)}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center">
            <span className="mr-2">{getStatusIcon(order.status)}</span>
            <span className="text-sm font-medium">
              {order.status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Items - Show only first product */}
          <div>
            <h4 className="text-lg font-medium mb-4">Items</h4>
            <div className="space-y-4">
              {order.products.slice(0, 3).map((item, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.product.name}</h3>
                      <p>₹{item.product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size || 'One Size'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    {remainingProducts > 0 && (
                      <p className="mt-1 text-sm text-gray-500">
                        and {remainingProducts} more product{remainingProducts > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <h4 className="text-lg font-medium mb-4">Order Summary</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({order.products.length} item{order.products.length > 1 ? 's' : ''})</span>
                  <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {order.shippingAddress}
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-1">
                  {order.status === 'Delivered' ? 'Delivered on' : 'Expected Delivery'}
                </h4>
                <p className="text-sm text-gray-700">
                  {formatDate(order.status === 'Delivered' ? order.deliveredDate || order.expectedDeliveryDate : order.expectedDeliveryDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
        <button
          onClick={() => navigate(`/order-detail/${order._id}`)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          View Order Details
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;