import { useState, useEffect } from "react";
import axios from "axios";
import { Shield, Award, Leaf, Globe, FileCheck, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const iconMap = {
  Shield: Shield,
  Award: Award,
  Leaf: Leaf,
  Globe: Globe,
  FileCheck: FileCheck,
};

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get(`${API}/certifications`);
        setCertifications(response.data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
        // Fallback data
        setCertifications([
          {
            id: "cert-001",
            name: "GMP Certification",
            description: "Good Manufacturing Practice certification ensuring our facilities and processes meet the highest quality standards for pharmaceutical production.",
            issuing_body: "Central Drugs Standard Control Organization (CDSCO)",
            valid_until: "December 2026",
            icon: "Shield"
          },
          {
            id: "cert-002",
            name: "ISO 9001:2015",
            description: "International standard for quality management systems, demonstrating our commitment to consistent quality and continuous improvement.",
            issuing_body: "International Organization for Standardization",
            valid_until: "March 2027",
            icon: "Award"
          },
          {
            id: "cert-003",
            name: "ISO 14001:2015",
            description: "Environmental management system certification showing our dedication to minimizing environmental impact and sustainable practices.",
            issuing_body: "International Organization for Standardization",
            valid_until: "March 2027",
            icon: "Leaf"
          },
          {
            id: "cert-004",
            name: "WHO-GMP",
            description: "World Health Organization Good Manufacturing Practice prequalification for pharmaceutical ingredients.",
            issuing_body: "World Health Organization",
            valid_until: "June 2026",
            icon: "Globe"
          },
          {
            id: "cert-005",
            name: "Drug Manufacturing License",
            description: "License to manufacture pharmaceutical products and active pharmaceutical ingredients in India.",
            issuing_body: "FDA Maharashtra",
            valid_until: "December 2025",
            icon: "FileCheck"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  const qualityHighlights = [
    {
      title: "Quality Control Lab",
      description: "Fully equipped analytical laboratory with HPLC, GC, UV-Vis spectrophotometer, and other advanced instruments."
    },
    {
      title: "Documentation",
      description: "Complete batch records, Certificate of Analysis (CoA), and Material Safety Data Sheets (MSDS) for all products."
    },
    {
      title: "Stability Studies",
      description: "Long-term and accelerated stability testing as per ICH guidelines to ensure product quality throughout shelf life."
    },
    {
      title: "Contamination Control",
      description: "Closed-loop manufacturing systems and cleanroom facilities to prevent cross-contamination."
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2 text-sm text-slate-600 mb-6">
              <Shield size={16} className="text-blue-600" />
              <span>Certified Excellence</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-slate-900 mb-6 animate-fade-in-up">
              Certifications & <span className="text-blue-600">Quality</span>
            </h1>
            <p className="text-lg text-slate-600 animate-fade-in-up animation-delay-100">
              Our commitment to quality is demonstrated through our comprehensive 
              certifications and rigorous quality management systems. We maintain 
              the highest standards in pharmaceutical manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              Our Certifications
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Recognized credentials that validate our commitment to quality and compliance
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-sm p-8 animate-pulse">
                  <div className="w-14 h-14 bg-slate-200 rounded-sm mb-6"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-20 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => {
                const IconComponent = iconMap[cert.icon] || Shield;
                return (
                  <div 
                    key={cert.id}
                    className="bg-white border border-slate-200 rounded-sm p-8 product-card"
                    data-testid={`certification-${index}`}
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-sm flex items-center justify-center mb-6">
                      <IconComponent className="h-7 w-7 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-slate-900 mb-3">
                      {cert.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      {cert.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-500">
                        <span>Issuing Body:</span>
                        <span className="text-slate-700 font-medium text-right ml-2">{cert.issuing_body}</span>
                      </div>
                      {cert.valid_until && (
                        <div className="flex justify-between text-slate-500">
                          <span>Valid Until:</span>
                          <span className="text-green-600 font-medium">{cert.valid_until}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-sm text-blue-600 border-blue-200 hover:bg-blue-50"
                        data-testid={`download-cert-${index}`}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quality Highlights */}
      <section className="py-20 md:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Quality Assurance
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our comprehensive quality management system ensures every product 
              meets the highest pharmaceutical standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {qualityHighlights.map((item, index) => (
              <div 
                key={index}
                className="bg-slate-800 p-6 rounded-sm"
                data-testid={`quality-highlight-${index}`}
              >
                <h3 className="font-heading font-semibold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards We Follow */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 mb-4">
              Standards & Guidelines
            </h2>
            <p className="text-slate-600">
              We adhere to international standards and guidelines in all our operations
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              "ICH Guidelines",
              "US FDA Standards",
              "EU Pharmacopoeia",
              "Indian Pharmacopoeia",
              "British Pharmacopoeia",
              "WHO Guidelines"
            ].map((standard, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 px-6 py-3 rounded-sm"
                data-testid={`standard-${index}`}
              >
                <span className="text-slate-700 font-medium">{standard}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Downloads */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-bold text-2xl text-slate-900 mb-4">
                Need Documentation?
              </h2>
              <p className="text-slate-600 mb-6">
                Request copies of our certificates, Drug Master Files (DMF), 
                or other quality documentation for your regulatory submissions.
              </p>
              <Button 
                className="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm"
                data-testid="request-docs-btn"
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Request Documents
              </Button>
            </div>
            <div className="bg-slate-50 p-8 rounded-sm">
              <h3 className="font-heading font-semibold text-lg text-slate-900 mb-4">
                Available Documents
              </h3>
              <ul className="space-y-3">
                {[
                  "Certificate of Analysis (CoA)",
                  "Material Safety Data Sheet (MSDS)",
                  "Drug Master File (DMF)",
                  "GMP Certificates",
                  "ISO Certificates",
                  "Product Specifications"
                ].map((doc, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-700 text-sm">
                    <FileCheck className="h-4 w-4 text-green-600" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
