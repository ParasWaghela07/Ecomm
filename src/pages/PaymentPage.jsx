import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../context/FirebaseContext';
import { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaGooglePay, FaPhoneAlt } from 'react-icons/fa';
import { SiPaytm, SiVisa, SiMastercard } from 'react-icons/si';
import { RiBankFill } from 'react-icons/ri';
import { BsCashCoin } from 'react-icons/bs';
import { toast } from 'react-hot-toast';

const PaymentPage = () => {
  const { user, cart,setcart } = useContext(FirebaseContext);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const navigate = useNavigate();

  // Fetch user address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch('http://localhost:4000/getAddress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        console.log("Address data:", data);
        if (data.success && data.address) {
          setAddress(data.address);
        } else {
          setShowAddAddress(true);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAddress();
    }
  }, [user]);

  const handleAddressSubmit = async (e) => {
    try {
      console.log("Saving address:", newAddress);
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:4000/saveAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({address:newAddress}),
      });

      const data = await response.json();
      console.log("Save address response:", data);
      if (data.success) {
        setAddress(data.address);
        setShowAddAddress(false);
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handlePayment = async () => {

    const toastid= toast.loading("Processing payment...");
    if (!address) {
      alert('Please add a delivery address');
      return;
    }
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:4000/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address:address
        }),
      });

      const data = await response.json();
      if (data.success) {
        navigate('/confirmation');
        setcart([]);
      }
      else toast.error(data.message),toast.dismiss(toastid);
    } catch (error) {
      console.error("Payment error:", error);
    }
    finally {
      toast.dismiss(toastid);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-10">
        <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Address and Payment */}
          <div className="space-y-8">
            {/* Address Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              
              {address && !showAddAddress ? (
                <div className="space-y-2">
                  <p>{address}</p>
                  <button 
                    onClick={() => setShowAddAddress(true)}
                    className="text-gray-800 mt-4 text-sm font-medium cursor-pointer hover:underline"
                  >
                    Change Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">New Address</label>
                  <textarea
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    {address && (
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      className="px-4 py-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-900 transition-colors"
                      onClick={handleAddressSubmit}
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                {/* UPI */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${selectedPayment === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedPayment('upi')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPayment === 'upi'}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label className="ml-3 block font-medium">UPI Payment</label>
                  </div>
                  {selectedPayment === 'upi' && (
                    <div className="mt-3 space-y-3">
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g., name@upi)"
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <div className="flex space-x-4 text-4xl text-gray-700">
                        <FaGooglePay title="Google Pay" />
                        <SiPaytm title="Paytm" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Cards */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${selectedPayment === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedPayment('card')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPayment === 'card'}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label className="ml-3 block font-medium">Credit/Debit Card</label>
                  </div>
                  {selectedPayment === 'card' && (
                    <div className="mt-3 space-y-3">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="border border-gray-300 rounded-md p-2"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div className="flex space-x-4 text-4xl text-gray-700">
                        <SiVisa title="Visa" />
                        <SiMastercard title="Mastercard" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Net Banking */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${selectedPayment === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedPayment('netbanking')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPayment === 'netbanking'}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label className="ml-3 block font-medium">Net Banking</label>
                  </div>
                  {selectedPayment === 'netbanking' && (
                    <div className="mt-3 flex items-center space-x-3">
                      <RiBankFill className="text-xl" />
                      <select className="w-full border border-gray-300 rounded-md p-2">
                        <option value="">Select Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                      </select>
                    </div>
                  )}
                </div>
                
                {/* Pay on Delivery */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${selectedPayment === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedPayment('cod')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPayment === 'cod'}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label className="ml-3 block font-medium">
                      <div className="flex items-center">
                        <BsCashCoin className="mr-2" />
                        Cash on Delivery
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow h-fit sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className='text-green-500'>FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * 1.18).toFixed(2)}</span>
              </div>
              
              <button
                onClick={handlePayment}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Complete Payment
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;