import { Globe, MapPin, Plane, Ship, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ExportMarketsPage() {
  const regions = [
    {
      name: "Africa",
      countries: ["South Africa", "Nigeria", "Kenya", "Egypt", "Morocco", "Tanzania", "Ghana", "Ethiopia"],
      color: "bg-amber-500"
    },
    {
      name: "Middle East",
      countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "Jordan", "Lebanon"],
      color: "bg-emerald-500"
    },
    {
      name: "Asia Pacific",
      countries: ["China", "Japan", "South Korea", "Singapore", "Malaysia", "Thailand", "Vietnam", "Indonesia", "Philippines", "Australia", "New Zealand"],
      color: "bg-blue-500"
    },
    {
      name: "Europe",
      countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Switzerland", "Poland", "Czech Republic"],
      color: "bg-indigo-500"
    },
    {
      name: "Americas",
      countries: ["United States", "Canada", "Mexico", "Brazil", "Argentina", "Colombia", "Chile", "Peru"],
      color: "bg-rose-500"
    },
    {
      name: "South Asia",
      countries: ["India", "Bangladesh", "Sri Lanka", "Nepal", "Pakistan"],
      color: "bg-violet-500"
    }
  ];

  const exportCapabilities = [
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective ocean shipping for bulk orders with proper temperature control and documentation."
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Express delivery for urgent requirements with fast customs clearance and door-to-door service."
    },
    {
      icon: Globe,
      title: "Global Documentation",
      description: "Complete export documentation including CoA, MSDS, and regulatory certificates for all markets."
    }
  ];

  const exportStats = [
    { number: "40+", label: "Export Markets" },
    { number: "500+", label: "Global Clients" },
    { number: "25+", label: "Years Exporting" },
    { number: "1000+", label: "Shipments/Year" }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-sm px-4 py-2 text-sm text-slate-300 mb-6">
                <Globe size={16} className="text-blue-400" />
                <span>Global Presence</span>
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6 animate-fade-in-up">
                Export <span className="text-blue-400">Markets</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 animate-fade-in-up animation-delay-100">
                Rasino Drugs exports to 40+ countries across 6 continents. Our global 
                logistics network ensures reliable delivery of pharmaceutical ingredients 
                to customers worldwide.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up animation-delay-200">
                {exportStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-heading font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-in-up animation-delay-300">
              <img
                src="https://images.unsplash.com/photo-1688694554481-353762e2c905?w=600&q=80"
                alt="Global Logistics"
                className="w-full h-80 lg:h-[400px] object-cover rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* World Map Visualization */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              Our Global Footprint
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We serve customers in major pharmaceutical markets across all continents
            </p>
          </div>

          {/* Regions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-sm overflow-hidden product-card"
                data-testid={`region-${index}`}
              >
                <div className={`h-2 ${region.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className={`h-5 w-5 ${region.color.replace('bg-', 'text-')}`} />
                    <h3 className="font-heading font-semibold text-lg text-slate-900">
                      {region.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.countries.map((country, cIndex) => (
                      <span 
                        key={cIndex}
                        className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-sm"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              Export Capabilities
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive logistics solutions for efficient global delivery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {exportCapabilities.map((capability, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 p-8 rounded-sm text-center"
                data-testid={`capability-${index}`}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <capability.icon className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-slate-900 mb-3">
                  {capability.title}
                </h3>
                <p className="text-slate-600 text-sm">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading font-bold text-3xl text-slate-900 mb-6">
                Export Services Include
              </h2>
              <ul className="space-y-4">
                {[
                  "Temperature-controlled packaging and shipping",
                  "Proper hazardous materials handling (if applicable)",
                  "Complete export documentation and certifications",
                  "Customs clearance assistance",
                  "Door-to-door delivery tracking",
                  "Flexible payment terms for regular customers",
                  "Technical support for regulatory submissions",
                  "Sample shipments for evaluation"
                ].map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 p-8 rounded-sm">
              <h3 className="font-heading font-semibold text-xl text-white mb-6">
                Export Documentation
              </h3>
              <p className="text-slate-400 mb-6">
                We provide comprehensive documentation for smooth customs clearance 
                and regulatory compliance in your country.
              </p>
              <ul className="space-y-3 text-slate-300">
                {[
                  "Certificate of Analysis (CoA)",
                  "Certificate of Origin",
                  "Material Safety Data Sheet (MSDS)",
                  "Commercial Invoice",
                  "Packing List",
                  "Bill of Lading / Airway Bill",
                  "Phytosanitary Certificate (if required)",
                  "Drug Master File (DMF) references"
                ].map((doc, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
            Export to Your Country
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Contact us to discuss export requirements, shipping options, and 
            regulatory documentation for your market.
          </p>
          <Link to="/contact">
            <Button 
              variant="outline"
              className="font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm border-white text-white hover:bg-white hover:text-blue-600"
              data-testid="export-contact-btn"
            >
              Get Export Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
