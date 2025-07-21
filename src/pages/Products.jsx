import React, { useEffect ,useState} from 'react';
import { FirebaseContext } from '../context/FirebaseContext';
import { useContext } from 'react';
import Navbar from '../components/Navbar';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import { useParams } from 'react-router-dom';
import ShowProducts from '../components/ShowProducts';
const Products = () => {
    const {category} = useParams();
    const { products, user, setcart } = useContext(FirebaseContext);

    const [visibleProducts, setVisibleProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    useEffect(()=>{
        if(category==='all'){ 
            setVisibleProducts(products);
        }
        else{
            const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
            setVisibleProducts(filteredProducts);
        }
    },[products])



    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <section className="my-10 px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        {category==='all' ? (<h2 className="text-3xl font-bold mb-4">All Products</h2>):(<h2 className="text-3xl font-bold mb-4 capitalize">{category}</h2>)}
                        { category === 'all' ? (<p className="text-gray-600 max-w-2xl mx-auto">Browse our complete collection</p>):(<p className="text-gray-600 max-w-2xl mx-auto">Browse our {category} collection</p>)}
                    </div>

                    <ShowProducts visibleProducts={visibleProducts}/>
                </section>
            </main>
        </div>
    )
}

export default Products;