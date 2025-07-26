import { FaLeaf, FaHandsHelping, FaLightbulb } from 'react-icons/fa';
import { FiAward, FiUsers, FiShoppingBag } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const About = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'E-commerce expert with 10+ years in digital retail',
      img: 'Casual.png'
    },
    {
      name: 'Samira Khan',
      role: 'Head of Design',
      bio: 'Creates beautiful user experiences that convert',
      img: 'Casual.png'
    },
    {
      name: 'James Wilson',
      role: 'Tech Lead',
      bio: 'Builds robust systems that scale',
      img: 'Casual.png'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Customers', icon: <FiUsers className="text-2xl" /> },
    { value: '2015', label: 'Founded In', icon: <FiAward className="text-2xl" /> },
    { value: '500+', label: 'Products Sold', icon: <FiShoppingBag className="text-2xl" /> }
  ];

  return (
    <div className="bg-white">
    <Navbar/>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden my-15">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Our Story
              </h1>
              <p className="mt-6 text-xl max-w-3xl">
                From humble beginnings to becoming your favorite shopping destination
              </p>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="Casual.png"
            alt="Our team working together"
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#1A2433] font-semibold tracking-wide uppercase">
              Our Values
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why We Do What We Do
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FaLeaf className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">Sustainability</h3>
                  <p className="mt-2 text-base text-gray-500">
                    We source products responsibly and minimize our environmental impact at every step.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FaHandsHelping className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">Customer First</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Your satisfaction drives every decision we make. We're not happy until you are.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FaLightbulb className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Constantly improving to bring you the best shopping experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#1A2433] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mx-auto h-12 w-12 rounded-full bg-blue-500">
                  {stat.icon}
                </div>
                <div className="mt-5">
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#1A2433] font-semibold tracking-wide uppercase">
              Our Team
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The People Behind the Scenes
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((person) => (
              <div key={person.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={person.img}
                    alt={`${person.name} profile`}
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1A2433]">
                      {person.role}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">
                      {person.name}
                    </h3>
                    <p className="mt-3 text-base text-gray-500">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to shop with us?</span>
            <span className="block text-[#1A2433]">Start your journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/products/all"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1A2433] hover:bg-blue-700"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;