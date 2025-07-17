// const mongoose = require('mongoose');
// const Product = require('./Product'); // Assuming your schema is in Product.js

export const sampleShoes = [
  {
    name: "Nike Air Max 270",
    description: "Revolutionary cushioning with the biggest Air unit yet for all-day comfort.",
    price: 150.00,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Sneakers",
    quantity: 50,
    ratings: 4.5,
    unitSold: 120,
    offer: "10% off"
  },
  {
    name: "Adidas Ultraboost 21",
    description: "Responsive cushioning meets energy return for your best run yet.",
    price: 180.00,
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
    category: "Running",
    quantity: 35,
    ratings: 4.7,
    unitSold: 95,
    offer: "Free shipping"
  },
  {
    name: "Timberland Premium Boot",
    description: "Waterproof leather boots with premium construction for durability.",
    price: 220.00,
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    category: "Boots",
    quantity: 25,
    ratings: 4.8,
    unitSold: 80
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "Classic canvas sneakers with iconic design and comfortable fit.",
    price: 65.00,
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    category: "Casual",
    quantity: 100,
    ratings: 4.3,
    unitSold: 200,
    offer: "Buy 1 Get 1 50% off"
  },
  {
    name: "Birkenstock Arizona Sandals",
    description: "Comfortable cork footbed with adjustable straps for perfect fit.",
    price: 99.95,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    category: "Sandals",
    quantity: 40,
    ratings: 4.6,
    unitSold: 75
  },
  {
    name: "Vans Old Skool",
    description: "Classic skate shoes with durable canvas and signature side stripe.",
    price: 60.00,
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
    category: "Skate",
    quantity: 60,
    ratings: 4.4,
    unitSold: 150
  },
  {
    name: "Dr. Martens 1460 Boot",
    description: "Iconic 8-eye boot with air-cushioned sole and durable leather.",
    price: 150.00,
    imageUrl: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33",
    category: "Boots",
    quantity: 30,
    ratings: 4.7,
    unitSold: 65
  },
  {
    name: "New Balance 574",
    description: "Classic running-inspired lifestyle sneaker with ENCAP cushioning.",
    price: 84.99,
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
    category: "Casual",
    quantity: 45,
    ratings: 4.5,
    unitSold: 110
  },
  {
    name: "Puma RS-X",
    description: "Bold retro-inspired sneakers with chunky silhouette and cushioned comfort.",
    price: 110.00,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    category: "Sneakers",
    quantity: 40,
    ratings: 4.2,
    unitSold: 85
  },
  {
    name: "Reebok Classic Leather",
    description: "Timeless leather sneakers with soft cushioning and vintage appeal.",
    price: 75.00,
    imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
    category: "Casual",
    quantity: 55,
    ratings: 4.3,
    unitSold: 120
  },
  {
    name: "ASICS Gel-Kayano 27",
    description: "Premium stability running shoes with dynamic support and cushioning.",
    price: 160.00,
    imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
    category: "Running",
    quantity: 30,
    ratings: 4.8,
    unitSold: 70
  },
  {
    name: "Salomon XA Pro 3D",
    description: "Trail running shoes with aggressive grip and protective design.",
    price: 130.00,
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    category: "Trail Running",
    quantity: 25,
    ratings: 4.6,
    unitSold: 45
  },
  {
    name: "Crocs Classic Clog",
    description: "Lightweight, comfortable clog with ventilation ports and Croslite™ material.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
    category: "Casual",
    quantity: 80,
    ratings: 4.0,
    unitSold: 180,
    offer: "30% off"
  },
  {
    name: "Hoka One One Bondi 7",
    description: "Maximum cushioning running shoes with meta-rocker technology.",
    price: 150.00,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    category: "Running",
    quantity: 20,
    ratings: 4.7,
    unitSold: 55
  },
  {
    name: "Gucci Ace Sneaker",
    description: "Luxury sneakers with leather construction and iconic web stripe.",
    price: 650.00,
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    category: "Luxury",
    quantity: 10,
    ratings: 4.9,
    unitSold: 25
  },
  {
    name: "Skechers Memory Foam Walkers",
    description: "Comfortable walking shoes with responsive memory foam cushioning.",
    price: 79.95,
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
    category: "Walking",
    quantity: 40,
    ratings: 4.4,
    unitSold: 90
  },
  {
    name: "Under Armour Curry 8",
    description: "High-performance basketball shoes with responsive cushioning.",
    price: 140.00,
    imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
    category: "Basketball",
    quantity: 25,
    ratings: 4.6,
    unitSold: 60
  },
  {
    name: "Merrell Moab 2 Vent",
    description: "Breathable hiking shoes with Vibram traction and air cushion.",
    price: 119.95,
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    category: "Hiking",
    quantity: 30,
    ratings: 4.7,
    unitSold: 50
  },
  {
    name: "Sperry Top-Sider",
    description: "Classic boat shoes with non-marking rubber soles and leather construction.",
    price: 89.95,
    imageUrl: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33",
    category: "Boat Shoes",
    quantity: 35,
    ratings: 4.5,
    unitSold: 75
  },
  {
    name: "Brooks Ghost 13",
    description: "Neutral running shoes with DNA LOFT cushioning for smooth transitions.",
    price: 130.00,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    category: "Running",
    quantity: 25,
    ratings: 4.8,
    unitSold: 65
  },
  {
    name: "Clarks Desert Boot",
    description: "Iconic chukka boots with crepe sole and suede upper.",
    price: 135.00,
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    category: "Boots",
    quantity: 20,
    ratings: 4.6,
    unitSold: 40
  },
  {
    name: "On Cloudswift",
    description: "Lightweight running shoes with Helion™ superfoam for energy return.",
    price: 140.00,
    imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
    category: "Running",
    quantity: 25,
    ratings: 4.7,
    unitSold: 55
  },
  {
    name: "Cole Haan Zerogrand",
    description: "Dress shoes with athletic-inspired comfort and flexible construction.",
    price: 200.00,
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
    category: "Dress",
    quantity: 15,
    ratings: 4.5,
    unitSold: 30
  },
  {
    name: "ECCO Soft 7",
    description: "Premium leather sneakers with anatomical last for natural movement.",
    price: 160.00,
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    category: "Casual",
    quantity: 30,
    ratings: 4.6,
    unitSold: 60
  },
  {
    name: "Allbirds Wool Runners",
    description: "Sustainable shoes made from merino wool with eco-friendly materials.",
    price: 95.00,
    imageUrl: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33",
    category: "Eco-Friendly",
    quantity: 40,
    ratings: 4.4,
    unitSold: 85,
    offer: "Free shipping"
  },
  {
    name: "Nike Zoom Pegasus 38",
    description: "Responsive running shoes with Zoom Air cushioning for speed.",
    price: 120.00,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    category: "Running",
    quantity: 35,
    ratings: 4.7,
    unitSold: 90
  },
  {
    name: "Steve Madden Troopa",
    description: "Combat-style boots with lace-up closure and durable construction.",
    price: 99.95,
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    category: "Boots",
    quantity: 25,
    ratings: 4.3,
    unitSold: 50
  },
  {
    name: "Teva Hurricane XLT2",
    description: "Adventure sandals with quick-dry webbing and rugged outsole.",
    price: 75.00,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    category: "Sandals",
    quantity: 30,
    ratings: 4.5,
    unitSold: 65
  },
  {
    name: "Fila Disruptor II",
    description: "Chunky retro sneakers with bold design and comfortable platform.",
    price: 65.00,
    imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
    category: "Sneakers",
    quantity: 45,
    ratings: 4.2,
    unitSold: 100,
    offer: "15% off"
  },
  {
    name: "Jordan 1 Retro High",
    description: "Iconic basketball-inspired sneakers with classic color blocking.",
    price: 170.00,
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
    category: "Basketball",
    quantity: 15,
    ratings: 4.9,
    unitSold: 40
  }
];



// Function to insert sample data
// const insertSampleProducts = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/your-database-name', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     // Clear existing products
//     await Product.deleteMany({});
//     console.log('Deleted existing products');

//     // Insert new sample products
//     const createdProducts = await Product.insertMany(sampleShoes);
//     console.log(`Created ${createdProducts.length} products`);

//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error inserting sample data:', error);
//     mongoose.connection.close();
//   }
// };

// insertSampleProducts();