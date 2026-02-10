import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  ArrowLeft, 
  FileText, 
  Send, 
  ChevronRight,
  Beaker,
  Atom,
  Scale,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InquiryModal } from "@/components/InquiryModal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/products/${productId}`);
        setProduct(response.data);

        // Fetch related products in the same category
        const relatedRes = await axios.get(`${API}/products?category=${response.data.category}`);
        setRelatedProducts(
          relatedRes.data.filter((p) => p.id !== productId).slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-32 mb-8"></div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="h-96 bg-slate-200 rounded-sm"></div>
            <div className="space-y-4">
              <div className="h-10 bg-slate-200 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              <div className="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
        <h1 className="font-heading font-bold text-2xl text-slate-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-slate-600 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products">
          <Button className="rounded-sm" data-testid="back-to-products-btn">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Breadcrumb */}
      <section className="bg-slate-50 py-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Link to="/products" className="text-slate-500 hover:text-slate-700">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link 
            to="/products" 
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
            data-testid="back-link"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Product Image - 2 columns */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="relative rounded-sm overflow-hidden bg-slate-100">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600"}
                    alt={product.name}
                    className="w-full h-80 lg:h-[450px] object-cover"
                    data-testid="product-image"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-white text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-sm ${
                      product.category === "API" ? "bg-blue-600" :
                      product.category === "Intermediate" ? "bg-green-600" :
                      "bg-purple-600"
                    }`}>
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info - 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h1 
                  className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-4"
                  data-testid="product-name"
                >
                  {product.name}
                </h1>
                
                {product.cas_number && (
                  <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-sm mb-6">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-700 font-medium">CAS: {product.cas_number}</span>
                  </div>
                )}

                <p className="text-slate-600 text-lg leading-relaxed" data-testid="product-description">
                  {product.description}
                </p>
              </div>

              {/* Chemical Properties */}
              <div className="grid sm:grid-cols-2 gap-4">
                {product.molecular_formula && (
                  <div className="bg-slate-50 p-4 rounded-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Atom className="h-4 w-4" />
                      <span className="text-sm uppercase tracking-wider">Molecular Formula</span>
                    </div>
                    <p className="font-mono text-slate-900 font-medium">{product.molecular_formula}</p>
                  </div>
                )}
                {product.molecular_weight && (
                  <div className="bg-slate-50 p-4 rounded-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Scale className="h-4 w-4" />
                      <span className="text-sm uppercase tracking-wider">Molecular Weight</span>
                    </div>
                    <p className="font-mono text-slate-900 font-medium">{product.molecular_weight}</p>
                  </div>
                )}
              </div>

              {/* Specifications */}
              {Object.keys(product.specifications || {}).length > 0 && (
                <div>
                  <h2 className="font-heading font-semibold text-xl text-slate-900 mb-4 flex items-center gap-2">
                    <Beaker className="h-5 w-5 text-blue-600" />
                    Specifications
                  </h2>
                  <div className="bg-slate-50 rounded-sm overflow-hidden">
                    <table className="w-full" data-testid="specifications-table">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <tr 
                            key={key}
                            className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                          >
                            <td className="px-4 py-3 text-slate-500 font-medium w-1/3">{key}</td>
                            <td className="px-4 py-3 text-slate-900">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Applications */}
              {product.applications?.length > 0 && (
                <div>
                  <h2 className="font-heading font-semibold text-xl text-slate-900 mb-4">
                    Applications
                  </h2>
                  <ul className="space-y-2">
                    {product.applications.map((app, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="bg-slate-900 p-6 rounded-sm">
                <h3 className="font-heading font-semibold text-lg text-white mb-2">
                  Interested in this product?
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Get in touch with us for pricing, availability, and custom requirements.
                </p>
                <Button
                  className="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-sm tracking-wide px-8 py-6 rounded-sm w-full sm:w-auto"
                  onClick={() => setInquiryOpen(true)}
                  data-testid="product-inquiry-btn"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-8">
              Related Products
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="product-card bg-white border border-slate-200 rounded-sm overflow-hidden group"
                  data-testid={`related-product-${index}`}
                >
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img
                      src={relatedProduct.image_url || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    {relatedProduct.cas_number && (
                      <p className="text-slate-500 text-sm">CAS: {relatedProduct.cas_number}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={product}
      />
    </div>
  );
}
