import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  FlaskConical, 
  Globe2, 
  Award, 
  Users, 
  ArrowRight, 
  ChevronRight,
  Beaker,
  Shield,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InquiryModal } from "@/components/InquiryModal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Seed database first, then fetch products
        await axios.post(`${API}/seed`);
        const response = await axios.get(`${API}/products?featured=true`);
        setFeaturedProducts(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { number: "40+", label: "Years Experience", icon: Award },
    { number: "40+", label: "Export Markets", icon: Globe2 },
    { number: "100+", label: "Products", icon: FlaskConical },
    { number: "500+", label: "Global Clients", icon: Users },
  ];

  const services = [
    {
      icon: Beaker,
      title: "API Manufacturing",
      description: "State-of-the-art facilities for Active Pharmaceutical Ingredient production with strict quality control.",
    },
    {
      icon: FlaskConical,
      title: "Custom Synthesis",
      description: "Tailored chemical synthesis solutions to meet your specific pharmaceutical requirements.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "GMP and ISO certified processes ensuring highest quality standards in every batch.",
    },
    {
      icon: Truck,
      title: "Global Export",
      description: "Reliable worldwide shipping with proper documentation and regulatory compliance.",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 noise-texture"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Text Content - 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2 text-sm text-slate-600">
                <Award size={16} className="text-blue-600" />
                <span>ISO 9001:2015 & GMP Certified</span>
              </div>
              
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight animate-fade-in-up">
                Excellence in{" "}
                <span className="text-blue-600">Pharmaceutical</span>{" "}
                Chemicals
              </h1>
              
              <p className="text-lg text-slate-600 max-w-xl animate-fade-in-up animation-delay-100">
                Leading manufacturer and exporter of Active Pharmaceutical Ingredients, 
                Intermediates, and Fine Chemicals. Serving global pharmaceutical 
                industries since 1980.
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-200">
                <Link to="/products">
                  <Button 
                    className="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm"
                    data-testid="hero-explore-btn"
                  >
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  className="font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm border-slate-300 hover:bg-slate-100"
                  onClick={() => setInquiryOpen(true)}
                  data-testid="hero-inquiry-btn"
                >
                  Request Quote
                </Button>
              </div>
            </div>

            {/* Image - 2 columns */}
            <div className="lg:col-span-2 relative animate-fade-in-up animation-delay-300">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1631558554770-74e921444006?w=600&q=80"
                  alt="Pharmaceutical Laboratory"
                  className="w-full h-80 lg:h-[450px] object-cover rounded-sm shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-sm shadow-lg hidden md:block">
                  <div className="text-3xl font-heading font-bold text-slate-900">40+</div>
                  <div className="text-sm text-slate-500">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-4" strokeWidth={1.5} />
                <div className="stat-number text-4xl font-heading font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Section Header - 2 columns */}
            <div className="lg:col-span-2">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-6">
                Comprehensive{" "}
                <span className="text-blue-600">Pharmaceutical</span>{" "}
                Solutions
              </h2>
              <p className="text-slate-600 mb-8">
                From API manufacturing to global distribution, we provide end-to-end 
                solutions for pharmaceutical companies worldwide.
              </p>
              <Link to="/services">
                <Button 
                  variant="outline"
                  className="font-semibold uppercase text-sm tracking-wide rounded-sm"
                  data-testid="services-link-btn"
                >
                  View All Services
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Services Grid - 3 columns */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="product-card bg-white border border-slate-200 p-6 rounded-sm"
                >
                  <service.icon className="h-10 w-10 text-blue-600 mb-4" strokeWidth={1.5} />
                  <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-2">
                Featured Products
              </h2>
              <p className="text-slate-600">
                Our most sought-after pharmaceutical ingredients
              </p>
            </div>
            <Link to="/products">
              <Button 
                variant="outline"
                className="font-semibold uppercase text-sm tracking-wide rounded-sm"
                data-testid="view-all-products-btn"
              >
                View All Products
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-sm p-6 animate-pulse">
                  <div className="h-48 bg-slate-200 rounded-sm mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`}
                  className="product-card bg-white border border-slate-200 rounded-sm overflow-hidden group"
                  data-testid={`featured-product-${index}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image_url || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.cas_number && (
                      <p className="text-slate-500 text-sm mb-3">
                        CAS: {product.cas_number}
                      </p>
                    )}
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
                Ready to Partner With Us?
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Get in touch with our team to discuss your pharmaceutical 
                ingredient requirements. We offer competitive pricing and 
                reliable global shipping.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm"
                  onClick={() => setInquiryOpen(true)}
                  data-testid="cta-inquiry-btn"
                >
                  Request Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link to="/contact">
                  <Button 
                    variant="outline"
                    className="font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm border-slate-500 text-white hover:bg-slate-800"
                    data-testid="cta-contact-btn"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1688694554481-353762e2c905?w=500&q=80"
                alt="Global Logistics"
                className="w-full h-80 object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal 
        open={inquiryOpen} 
        onClose={() => setInquiryOpen(false)} 
        inquiryType="general"
      />
    </div>
  );
}
