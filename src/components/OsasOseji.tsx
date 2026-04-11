import { useState } from 'react';
import { Building2, Home, MapPin, Phone, Mail, Search, ChevronRight } from 'lucide-react';

export default function OsasOseji() {
  const [searchTerm, setSearchTerm] = useState('');

  const properties = [
    {
      id: 1,
      title: "Luxury Waterfront Estate",
      location: "Victoria Island, Lagos",
      price: "₦450,000,000",
      beds: 5,
      baths: 4,
      sqft: "4,500",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
    },
    {
      id: 2,
      title: "Modern Duplex",
      location: "Lekki Phase 1, Lagos",
      price: "₦125,000,000",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
    },
    {
      id: 3,
      title: "Executive Apartment",
      location: "Ikoyi, Lagos",
      price: "₦85,000,000",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* Header */}
      <header className="bg-[#6B4423] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <OsasOsejiLogo />
              <div>
                <div className="text-2xl tracking-wider">OSAS & OSEJI</div>
                <div className="text-xs text-amber-200 tracking-wide">REAL ESTATE AGENCY</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-amber-200 transition-colors">Home</a>
              <a href="#properties" className="hover:text-amber-200 transition-colors">Properties</a>
              <a href="#services" className="hover:text-amber-200 transition-colors">Services</a>
              <a href="#contact" className="hover:text-amber-200 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
          alt="Luxury Property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white max-w-4xl px-6">
          <h1 className="text-7xl mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-2xl mb-8 text-gray-200">
            Premium properties across Lagos and beyond
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-full p-2 flex items-center max-w-2xl mx-auto shadow-2xl">
            <input
              type="text"
              placeholder="Search by location, property type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-3 text-gray-900 outline-none"
            />
            <button className="bg-[#6B4423] text-white px-8 py-3 rounded-full hover:bg-[#54351C] transition-colors flex items-center gap-2">
              <Search className="size-5" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl text-[#6B4423] mb-3">500+</div>
              <div className="text-xl text-gray-700">Properties Sold</div>
            </div>
            <div>
              <div className="text-5xl text-[#6B4423] mb-3">1000+</div>
              <div className="text-xl text-gray-700">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl text-[#6B4423] mb-3">15+</div>
              <div className="text-xl text-gray-700">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">Exclusive listings handpicked for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-[#6B4423] text-[#6B4423] rounded-full hover:bg-[#6B4423] hover:text-white transition-all flex items-center gap-2 mx-auto">
              View All Properties
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#6B4423] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Our Services</h2>
            <p className="text-xl text-amber-200">Comprehensive real estate solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <Home className="size-12 mb-4 text-amber-200" />
              <h3 className="text-2xl mb-3">Property Sales</h3>
              <p className="text-gray-200">
                Expert guidance in buying and selling residential and commercial properties across Nigeria.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <Building2 className="size-12 mb-4 text-amber-200" />
              <h3 className="text-2xl mb-3">Property Management</h3>
              <p className="text-gray-200">
                Professional management services to maximize your property investment returns.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <MapPin className="size-12 mb-4 text-amber-200" />
              <h3 className="text-2xl mb-3">Consultation</h3>
              <p className="text-gray-200">
                Strategic advice on property investment, valuation, and market analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to find your perfect property? Contact us today.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-[#6B4423] flex items-center justify-center flex-shrink-0">
                    <Phone className="size-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Phone</div>
                    <div className="text-gray-600">+234 803 456 7890</div>
                    <div className="text-gray-600">+234 802 345 6789</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-[#6B4423] flex items-center justify-center flex-shrink-0">
                    <Mail className="size-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Email</div>
                    <div className="text-gray-600">info@osasoseji.com</div>
                    <div className="text-gray-600">sales@osasoseji.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-[#6B4423] flex items-center justify-center flex-shrink-0">
                    <MapPin className="size-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Office</div>
                    <div className="text-gray-600">
                      Plot 45, Admiralty Way,<br />
                      Lekki Phase 1, Lagos, Nigeria
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 text-gray-900">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4423] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-900">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4423] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-900">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4423] focus:border-transparent resize-none"
                    placeholder="Tell us about your property needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#6B4423] text-white py-4 rounded-lg hover:bg-[#54351C] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <OsasOsejiLogo />
            <div className="text-xl tracking-wider">OSAS & OSEJI</div>
          </div>
          <p className="text-gray-400">
            © 2026 Osas & Oseji Real Estate Agency. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function OsasOsejiLogo() {
  return (
    <div className="flex">
      <div className="size-12 bg-[#6B4423] flex items-center justify-center border-r border-white/20">
        <div className="size-8 border-4 border-white rounded-full" />
      </div>
      <div className="size-12 bg-white flex items-center justify-center">
        <div className="size-8 border-4 border-[#6B4423] rounded-full" />
      </div>
    </div>
  );
}

function PropertyCard({ title, location, price, beds, baths, sqft, image }: {
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-[#6B4423] text-white px-4 py-2 rounded-full">
          For Sale
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="size-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
          <span>{beds} Beds</span>
          <span>{baths} Baths</span>
          <span>{sqft} sqft</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-3xl text-[#6B4423]">{price}</div>
          <button className="px-6 py-2 bg-gray-100 hover:bg-[#6B4423] hover:text-white rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}