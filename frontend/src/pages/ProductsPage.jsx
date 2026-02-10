import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Search, Filter, ArrowRight, X, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Build query params
        const params = new URLSearchParams();
        if (selectedCategory) params.append("category", selectedCategory);
        if (searchQuery) params.append("search", searchQuery);

        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${API}/products?${params.toString()}`),
          axios.get(`${API}/products/categories`),
        ]);
        
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value === "all" ? "" : value);
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (value && value !== "all") params.set("category", value);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSearchParams({});
  };

  const hasFilters = searchQuery || selectedCategory;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-slate-900 mb-4 animate-fade-in-up">
              Product <span className="text-blue-600">Catalog</span>
            </h1>
            <p className="text-lg text-slate-600 animate-fade-in-up animation-delay-100">
              Explore our comprehensive range of Active Pharmaceutical Ingredients, 
              Intermediates, and Fine Chemicals manufactured to the highest quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b border-slate-200 bg-white sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by name, CAS number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-600 rounded-sm"
                  data-testid="product-search-input"
                />
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
                  <SelectTrigger 
                    className="w-48 bg-slate-50 border-slate-200 rounded-sm"
                    data-testid="category-filter"
                  >
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        {cat.name} ({cat.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-slate-500 hover:text-slate-700"
                  data-testid="clear-filters-btn"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-slate-600">
              Showing <span className="font-semibold text-slate-900">{products.length}</span> products
              {selectedCategory && (
                <span> in <span className="text-blue-600">{selectedCategory}</span></span>
              )}
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-sm p-6 animate-pulse">
                  <div className="h-48 bg-slate-200 rounded-sm mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <FlaskConical className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl text-slate-900 mb-2">
                No products found
              </h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="rounded-sm"
                data-testid="no-results-clear-btn"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="product-card bg-white border border-slate-200 rounded-sm overflow-hidden group"
                  data-testid={`product-card-${index}`}
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={product.image_url || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-sm ${
                        product.category === "API" ? "bg-blue-600" :
                        product.category === "Intermediate" ? "bg-green-600" :
                        "bg-purple-600"
                      }`}>
                        {product.category}
                      </span>
                    </div>
                    {product.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-amber-500 text-white text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-sm">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.cas_number && (
                      <p className="text-slate-500 text-sm mb-3">
                        CAS: {product.cas_number}
                      </p>
                    )}
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Overview */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-heading font-bold text-2xl text-slate-900 mb-8 text-center">
            Product Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              className="bg-white border border-slate-200 p-6 rounded-sm cursor-pointer product-card"
              onClick={() => handleCategoryChange("API")}
              data-testid="category-api"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center mb-4">
                <FlaskConical className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                Active Pharmaceutical Ingredients
              </h3>
              <p className="text-slate-600 text-sm">
                Biologically active components used in finished medications including 
                antipsychotics, anticonvulsants, and antifungals.
              </p>
            </div>

            <div 
              className="bg-white border border-slate-200 p-6 rounded-sm cursor-pointer product-card"
              onClick={() => handleCategoryChange("Intermediate")}
              data-testid="category-intermediate"
            >
              <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mb-4">
                <FlaskConical className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                Pharmaceutical Intermediates
              </h3>
              <p className="text-slate-600 text-sm">
                Precursor chemicals essential for synthesizing APIs and other 
                pharmaceutical components.
              </p>
            </div>

            <div 
              className="bg-white border border-slate-200 p-6 rounded-sm cursor-pointer product-card"
              onClick={() => handleCategoryChange("Fine Chemical")}
              data-testid="category-fine-chemical"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center mb-4">
                <FlaskConical className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                Fine Chemicals
              </h3>
              <p className="text-slate-600 text-sm">
                High-purity chemicals for pharmaceutical synthesis, research, 
                and specialized industrial applications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
