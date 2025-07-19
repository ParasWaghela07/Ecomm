import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Footer from "../components/Footer";
const Home = () => {
  const [products,setproducts]=useState([]);
  async function fetchProducts(){
    try{
    const response = await fetch('http://localhost:4000/getAllProducts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data=await response.json();
        console.log(data);
        if(data.success){
          setproducts(data.products);
        }
    }
    catch(e){
      toast.error(e.message);
    }
  }
  useEffect(()=>{
    fetchProducts();
  },[])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8  py-8">
        {/* Hero section */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={1}
          spaceBetween={50}
          allowTouchMove={false}
        >
          <SwiperSlide>
            <div className="flex flex-col md:flex-row h-[80vh]">
              <div className="w-full md:w-1/2 bg-[#1A2433] flex items-center justify-center p-12">
                <div className="text-white">
                  <span className="text-sm uppercase tracking-widest text-gray-400">
                    New Collection
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold my-4">
                    AIR MAX PREMIUM
                  </h1>
                  <p className="text-lg mb-8">
                    Experience unmatched comfort with our latest technology
                  </p>
                  <button className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition">
                    Explore Now
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
                <img
                  src="/shoebg.png"
                  alt="Premium Shoe"
                  className="max-h-[80%] object-contain"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-[80vh]">
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 z-10">
                  <h1 className="text-5xl md:text-7xl font-bold mb-4">
                    Step Into Style
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-lg">
                    Discover our latest collection of premium footwear
                  </p>
                  <button className="bg-black text-white px-8 py-3 text-lg font-medium hover:bg-gray-800 transition">
                    Shop New Arrivals
                  </button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full">
                <img
                  src="/shoebg.png"
                  alt="Featured Shoe"
                  className="h-full w-full object-contain object-right-bottom"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative bg-black overflow-hidden h-[80vh]">
              <img
                src="/shoebg.png"
                alt="Shoe Collection"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="relative z-10 flex items-center h-full">
                <div className="container mx-auto px-6 text-white">
                  <span className="text-sm uppercase tracking-widest text-gray-300">
                    Limited Edition
                  </span>
                  <h1 className="text-5xl md:text-7xl font-bold my-4">
                    REDEFINE YOUR RUN
                  </h1>
                  <p className="text-xl max-w-xl mb-8">
                    Performance meets style in our newest running collection
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition">
                      Shop Men
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-black transition">
                      Shop Women
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-300 h-[80vh] overflow-hidden px-10">
              <div className="absolute inset-0 opacity-10 bg-[url('/shoebg.png')] bg-repeat"></div>

              <div className="container mx-auto h-full flex items-center">
                <div className="relative z-10 max-w-md">
                  <h1 className="text-5xl font-bold mb-4">ELEVATE YOUR GAME</h1>
                  <p className="text-lg mb-8">
                    Professional-grade footwear for athletes who demand
                    perfection
                  </p>
                  <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
                    View Collection
                  </button>
                </div>
              </div>

              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2">
                <img
                  src="/shoebg.png"
                  alt="Athletic Shoe"
                  className="w-full max-w-xl float-right animate-float"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Categories Section */}
        <section className="my-16 px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect pair for every occasion
            </p>
          </div>

          {/* Mobile Swiper (hidden on desktop) */}
          <div className="md:hidden">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={true}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                480: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 2,
                },
              }}
            >
              {[
                {
                  title: "Running",
                  img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                },
                {
                  title: "Sneakers",
                  img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
                },
                {
                  title: "Basketball",
                  img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                },
                {
                  title: "Casual",
                  img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
                },
                {
                  title: "Hiking",
                  img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
                },
              ].map((category, index) => (
                <SwiperSlide key={index}>
                  <div className="group relative overflow-hidden rounded-lg bg-gray-100 h-64 mx-2">
                    <img
                      src={category.img}
                      alt={`${category.title} Shoes`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {category.title}
                        </h3>
                        <button className="mt-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Shop Now →
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Running Shoes */}
            <div className="group relative overflow-hidden rounded-lg bg-gray-100 h-64">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Running Shoes"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Running</h3>
                  <button className="mt-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>

            {/* Sneakers */}
            <div className="group relative overflow-hidden rounded-lg bg-gray-100 h-64">
              <img
                src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
                alt="Sneakers"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Sneakers</h3>
                  <button className="mt-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>

            {/* Basketball */}
            <div className="group relative overflow-hidden rounded-lg bg-gray-100 h-64">
              <img
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Basketball Shoes"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Basketball</h3>
                  <button className="mt-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>

            {/* Casual */}
            <div className="group relative overflow-hidden rounded-lg bg-gray-100 h-64">
              <img
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                alt="Casual Shoes"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Casual</h3>
                  <button className="mt-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>

            {/* Hiking */}
            <div className="group relative overflow-hidden rounded-lg bg-gray-100 h-64">
              <img
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                alt="Hiking Shoes"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Hiking</h3>
                  <button className="mt-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="my-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our latest collection of premium footwear</p>
          </div>

          {/* Filter/Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="w-full md:w-auto">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
                <option>All Categories</option>
                <option>Running</option>
                <option>Sneakers</option>
                <option>Basketball</option>
                <option>Casual</option>
                <option>Hiking</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
                <option>Sort By: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
                <option>Best Sellers</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products?.length > 0 && 
              products.map((product, index) => (
                <div key={index} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{product.name.length > 15 ? (product.name.substr(0,15))+"..":(product.name)}</h3>
                        <p className="text-gray-600">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${product.price}</p>
                        <div className="flex items-center justify-end mt-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const rating = product.ratings || 0; // Default to 0 if no rating
                          return (
                            <span key={star} className="text-yellow-400">
                              {rating >= star ? (
                                <FaStar className="w-4 h-4" />
                              ) : rating >= star - 0.5 ? (
                                <FaStarHalfAlt className="w-4 h-4" />
                              ) : (
                                <FaRegStar className="w-4 h-4" />
                              )}
                            </span>
                          );
                        })}
                          <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            }
          </div>

          {/* View More Button */}
          <div className="text-center mt-12 ">
            <button className="px-8 py-3 border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
              View All Products
            </button>
          </div>
        </section>

        {/* Shipping & Returns Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Free Shipping */}
              <div className="p-6">
                <div className="mx-auto h-12 w-12 flex items-center justify-center bg-black rounded-full mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
                <p className="text-gray-600">On all orders over $50</p>
              </div>

              {/* Easy Returns */}
              <div className="p-6">
                <div className="mx-auto h-12 w-12 flex items-center justify-center bg-black rounded-full mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Easy Returns</h3>
                <p className="text-gray-600">30-day return policy</p>
              </div>

              {/* Customer Support */}
              <div className="p-6">
                <div className="mx-auto h-12 w-12 flex items-center justify-center bg-black rounded-full mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">24/7 Support</h3>
                <p className="text-gray-600">Dedicated customer service</p>
              </div>
            </div>
          </div>
        </section>


        {/* Limited Offer Banner */}
        <section className="py-12 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="max-w-7xl mx-aut px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Last Chance - Summer Sale Ends Soon!</h2>
            <p className="text-xl mb-6">Get 20% off all summer collection shoes</p>
            
            <div className="flex justify-center items-center space-x-4 mb-8">
              {/* Countdown Timer */}
              <div className="bg-black bg-opacity-20 rounded-lg p-3 min-w-[70px]">
                <div className="text-2xl font-bold">02</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="bg-black bg-opacity-20 rounded-lg p-3 min-w-[70px]">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="bg-black bg-opacity-20 rounded-lg p-3 min-w-[70px]">
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm">Mins</div>
              </div>
            </div>

            <div className="bg-white text-black inline-block px-4 py-2 rounded-md mb-6">
              <p className="font-semibold">Use Code : <span className="font-bold">SUMMER678</span></p>
            </div>
          </div>
        </section>
      </main>



      <Footer/>
    </div>
  );
};

export default Home;
