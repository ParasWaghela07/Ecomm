import { useContext} from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FirebaseContext } from "../context/FirebaseContext";
import { toast } from "react-hot-toast";

const ShowProducts = ({visibleProducts}) => {

    const {user,setcart}=useContext(FirebaseContext);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function addtocart(item) {
    try {
        const token = await user.getIdToken();

        const [response] = await toast.promise(
        Promise.all([
            fetch('http://localhost:4000/addtoCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: item._id,
                quantity: 1,
                size:"M"
            }),
            }),
            delay(1500) // ensures at least 1.5s delay
        ]),
        {
            loading: 'Adding...',
            success: 'Item Added!',
            error: 'Failed to add item',
        }
        );

        const data = await response.json();

        if (data.success) {
        console.log(data.cart)
        setcart(data.cart);
        } else {
        toast.error(data.message || "Add to cart failed.");
        }
    } catch (e) {
        console.error("Error adding to cart:", e);
    }
    }
  return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visibleProducts?.length > 0 && 
              visibleProducts.map((product, index) => (
                <div key={index} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-80 overflow-hidden">
                    <img loading='lazy'  
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
                    <button className="mt-4 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => addtocart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
  )
}

export default ShowProducts