import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Loader2,
  Building,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const COUNTRIES = [
  "India", "United States", "United Kingdom", "Germany", "France", 
  "Italy", "Spain", "Netherlands", "Belgium", "Switzerland",
  "South Africa", "Nigeria", "Kenya", "Egypt", "Morocco",
  "Saudi Arabia", "UAE", "Qatar", "Kuwait", "Bahrain",
  "China", "Japan", "South Korea", "Singapore", "Malaysia",
  "Thailand", "Vietnam", "Indonesia", "Philippines", "Australia",
  "Brazil", "Mexico", "Argentina", "Colombia", "Chile",
  "Canada", "Russia", "Poland", "Czech Republic", "Turkey",
  "Other"
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value) => {
    setFormData(prev => ({ ...prev, country: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/inquiries`, {
        ...formData,
        inquiry_type: "general",
      });
      
      toast.success("Message Sent!", {
        description: "Thank you for contacting us. We'll respond within 24-48 hours.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        country: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly via email.",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Building,
      title: "Registered Office",
      lines: ["Rasino Drugs Pvt. Ltd.", "Mumbai, Maharashtra", "India"]
    },
    {
      icon: Phone,
      title: "Phone",
      lines: ["+91 22 2821 4777", "+91 22 2821 4778"],
      link: "tel:+912228214777"
    },
    {
      icon: Mail,
      title: "Email",
      lines: ["info@rasinodrugs.com", "exports@rasinodrugs.com"],
      link: "mailto:info@rasinodrugs.com"
    },
    {
      icon: Clock,
      title: "Business Hours",
      lines: ["Mon - Fri: 9:00 AM - 6:00 PM IST", "Sat: 9:00 AM - 1:00 PM IST"]
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-slate-900 mb-6 animate-fade-in-up">
              Contact <span className="text-blue-600">Us</span>
            </h1>
            <p className="text-lg text-slate-600 animate-fade-in-up animation-delay-100">
              Have questions about our products or services? Get in touch with 
              our team. We're here to help with your pharmaceutical ingredient 
              requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Form - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-slate-200 rounded-sm p-8">
                <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-slate-600 mb-8">
                  Fill out the form below and we'll get back to you within 24-48 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                        placeholder="John Doe"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                        placeholder="john@company.com"
                        data-testid="contact-email-input"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-slate-700">Company Name *</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                        placeholder="Your Company"
                        data-testid="contact-company-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                        placeholder="+1 234 567 8900"
                        data-testid="contact-phone-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-slate-700">Country *</Label>
                    <Select value={formData.country} onValueChange={handleCountryChange} required>
                      <SelectTrigger 
                        className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                        data-testid="contact-country-select"
                      >
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm resize-none"
                      placeholder="Please describe your inquiry or requirements..."
                      data-testid="contact-message-input"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm w-full sm:w-auto"
                    data-testid="contact-submit-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="bg-slate-50 p-6 rounded-sm"
                  data-testid={`contact-info-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-slate-900 mb-2">
                        {info.title}
                      </h3>
                      {info.lines.map((line, lIndex) => (
                        info.link ? (
                          <a 
                            key={lIndex}
                            href={info.link}
                            className="block text-slate-600 hover:text-blue-600 transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={lIndex} className="text-slate-600">{line}</p>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Company Info */}
              <div className="bg-slate-900 p-6 rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <h3 className="font-heading font-semibold text-white">
                    Company Information
                  </h3>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-400">CIN</dt>
                    <dd className="text-slate-300">U24233MH2015PTC270493</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Incorporated</dt>
                    <dd className="text-slate-300">2015</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">State</dt>
                    <dd className="text-slate-300">Maharashtra, India</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-4">
              Our Location
            </h2>
            <p className="text-slate-600 mb-8">
              Rasino Drugs Pvt. Ltd. is headquartered in Mumbai, Maharashtra, India
            </p>
            <div className="bg-slate-200 h-64 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500">Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
