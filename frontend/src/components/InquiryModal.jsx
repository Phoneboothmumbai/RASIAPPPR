import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export const InquiryModal = ({ 
  open, 
  onClose, 
  product = null,
  inquiryType = "general" 
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    quantity: "",
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
      const inquiryData = {
        ...formData,
        product_id: product?.id || null,
        product_name: product?.name || null,
        inquiry_type: product ? "product" : inquiryType,
      };

      await axios.post(`${API}/inquiries`, inquiryData);
      
      toast.success("Inquiry Submitted", {
        description: "We'll get back to you within 24-48 hours.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        country: "",
        quantity: "",
        message: "",
      });
      
      onClose();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Failed to submit inquiry", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white" data-testid="inquiry-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-slate-900">
            {product ? `Inquiry for ${product.name}` : "Send Inquiry"}
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Fill in your details and we'll get back to you within 24-48 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
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
                data-testid="inquiry-name-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                placeholder="john@company.com"
                data-testid="inquiry-email-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-slate-700">Company *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                placeholder="Company Name"
                data-testid="inquiry-company-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                placeholder="+1 234 567 8900"
                data-testid="inquiry-phone-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-slate-700">Country *</Label>
              <Select value={formData.country} onValueChange={handleCountryChange} required>
                <SelectTrigger 
                  className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                  data-testid="inquiry-country-select"
                >
                  <SelectValue placeholder="Select Country" />
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
            {product && (
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-slate-700">Required Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                  placeholder="e.g., 100 kg"
                  data-testid="inquiry-quantity-input"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-700">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm resize-none"
              placeholder="Please describe your requirements..."
              data-testid="inquiry-message-input"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-sm"
              data-testid="inquiry-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide rounded-sm px-6"
              data-testid="inquiry-submit-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
