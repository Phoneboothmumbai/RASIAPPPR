import { Link } from "react-router-dom";
import { 
  Beaker, 
  FlaskConical, 
  FileCheck, 
  Truck, 
  Microscope,
  Settings,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const services = [
    {
      icon: Beaker,
      title: "API Manufacturing",
      description: "State-of-the-art manufacturing facilities for Active Pharmaceutical Ingredients with strict quality control and contamination-free processes.",
      features: [
        "GMP-compliant production facilities",
        "Closed-loop manufacturing systems",
        "Multi-stage quality control",
        "Batch-to-batch consistency",
        "Scalable production capacity"
      ]
    },
    {
      icon: FlaskConical,
      title: "Custom Synthesis",
      description: "Tailored chemical synthesis solutions to meet your specific pharmaceutical and research requirements with expert support.",
      features: [
        "Custom molecule development",
        "Process optimization",
        "Scale-up services",
        "Exclusive synthesis agreements",
        "Technical consultation"
      ]
    },
    {
      icon: Microscope,
      title: "Research & Development",
      description: "Dedicated R&D team working on process improvements, new product development, and innovative synthesis routes.",
      features: [
        "New product development",
        "Process improvement studies",
        "Route scouting",
        "Impurity profiling",
        "Analytical method development"
      ]
    },
    {
      icon: FileCheck,
      title: "Quality Assurance",
      description: "Comprehensive quality management system ensuring every product meets the highest pharmaceutical standards.",
      features: [
        "ISO 9001:2015 certified",
        "GMP compliance",
        "WHO-GMP standards",
        "Certificate of Analysis (CoA)",
        "Stability testing"
      ]
    },
    {
      icon: Settings,
      title: "Regulatory Support",
      description: "Expert assistance with regulatory documentation, DMF filings, and compliance requirements for global markets.",
      features: [
        "Drug Master File (DMF) support",
        "Regulatory documentation",
        "Export compliance",
        "Market authorization support",
        "Audit preparation"
      ]
    },
    {
      icon: Truck,
      title: "Global Logistics",
      description: "Reliable worldwide shipping with proper documentation, temperature control, and tracking for all consignments.",
      features: [
        "Temperature-controlled shipping",
        "Proper hazmat handling",
        "Real-time tracking",
        "Documentation support",
        "Customs clearance assistance"
      ]
    }
  ];

  const industries = [
    { name: "Pharmaceutical", description: "Drug manufacturers and formulation houses" },
    { name: "Biotechnology", description: "Biotech research and development" },
    { name: "Research", description: "Academic and commercial laboratories" },
    { name: "Cosmetics", description: "Personal care product manufacturers" },
    { name: "Food Industry", description: "Food additive and ingredient suppliers" },
    { name: "Chemical", description: "Specialty chemical manufacturers" },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-slate-900 mb-6 animate-fade-in-up">
                Our <span className="text-blue-600">Services</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 animate-fade-in-up animation-delay-100">
                From API manufacturing to global logistics, we provide comprehensive 
                solutions for pharmaceutical companies worldwide. Our services are 
                designed to support every stage of your product development and 
                supply chain.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-200">
                <Link to="/contact">
                  <Button 
                    className="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm"
                    data-testid="services-contact-btn"
                  >
                    Discuss Your Requirements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-up animation-delay-300">
              <img
                src="https://images.unsplash.com/photo-1631558554770-74e921444006?w=600&q=80"
                alt="Laboratory Services"
                className="w-full h-80 lg:h-[400px] object-cover rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              Comprehensive Solutions
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              End-to-end services to support your pharmaceutical manufacturing needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-sm p-8 product-card"
                data-testid={`service-${index}`}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-sm flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-blue-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our products and services cater to diverse sectors across the globe
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="bg-slate-800 p-6 rounded-sm"
                data-testid={`industry-${index}`}
              >
                <h3 className="font-heading font-semibold text-lg text-white mb-2">
                  {industry.name}
                </h3>
                <p className="text-slate-400 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              How We Work
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our streamlined process ensures efficient delivery and consistent quality
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Inquiry", desc: "Share your requirements and specifications" },
              { step: "02", title: "Evaluation", desc: "Technical review and quotation preparation" },
              { step: "03", title: "Production", desc: "GMP-compliant manufacturing process" },
              { step: "04", title: "Delivery", desc: "Quality-checked global shipping" },
            ].map((item, index) => (
              <div key={index} className="text-center" data-testid={`process-step-${index}`}>
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-heading font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Contact our team to discuss your requirements and discover how we can 
            support your pharmaceutical needs.
          </p>
          <Link to="/contact">
            <Button 
              variant="outline"
              className="font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm border-white text-white hover:bg-white hover:text-blue-600"
              data-testid="services-cta-btn"
            >
              Contact Us Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
