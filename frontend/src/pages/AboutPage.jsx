import { Award, Target, Eye, Users, Building, Calendar, Lightbulb, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Unwavering commitment to producing pharmaceutical ingredients of the highest purity and consistency.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuous investment in R&D and modern manufacturing technologies to stay at the forefront.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Transparent business practices and ethical standards in all our operations and relationships.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Building lasting partnerships through responsive service and tailored solutions.",
    },
  ];

  const milestones = [
    { year: "1980", event: "Foundation of Rasino Group with focus on pharmaceutical chemicals" },
    { year: "1995", event: "Expansion of manufacturing facilities and product portfolio" },
    { year: "2005", event: "Achieved ISO 9001 certification for quality management" },
    { year: "2010", event: "Started exports to international markets" },
    { year: "2015", event: "Incorporated as Rasino Drugs Pvt. Ltd." },
    { year: "2018", event: "Obtained WHO-GMP certification" },
    { year: "2020", event: "Expanded to 40+ export markets globally" },
    { year: "2024", event: "Continued growth with state-of-the-art facilities" },
  ];

  const leadership = [
    {
      name: "Paresh Pratap Doshi",
      role: "Managing Director",
      description: "Leading Rasino's strategic vision with over 30 years of pharmaceutical industry experience.",
    },
    {
      name: "Swarada Paresh Doshi",
      role: "Director",
      description: "Overseeing operations and quality management with focus on sustainable growth.",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2 text-sm text-slate-600 mb-6">
                <Building size={16} className="text-blue-600" />
                <span>Established Since 1980</span>
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-slate-900 mb-6 animate-fade-in-up">
                About <span className="text-blue-600">Rasino Drugs</span>
              </h1>
              <p className="text-lg text-slate-600 animate-fade-in-up animation-delay-100">
                Rasino Drugs Pvt. Ltd. is a leading manufacturer and exporter of 
                Active Pharmaceutical Ingredients (APIs), Intermediates, and Fine 
                Chemicals. With roots tracing back to 1980, we have built a 
                reputation for quality, reliability, and innovation in the 
                pharmaceutical chemicals industry.
              </p>
            </div>
            <div className="relative animate-fade-in-up animation-delay-200">
              <img
                src="https://images.unsplash.com/photo-1748000970909-845f4aa144d2?w=600&q=80"
                alt="Rasino Drugs Facility"
                className="w-full h-80 lg:h-[400px] object-cover rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-slate-50 p-8 md:p-12 rounded-sm" data-testid="mission-section">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="font-heading font-bold text-2xl text-slate-900">Our Mission</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                To be a trusted global partner in pharmaceutical chemicals by 
                delivering high-quality APIs, intermediates, and fine chemicals 
                that meet the stringent requirements of the pharmaceutical industry. 
                We are committed to innovation, sustainability, and excellence in 
                everything we do.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-slate-900 p-8 md:p-12 rounded-sm" data-testid="vision-section">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="font-heading font-bold text-2xl text-white">Our Vision</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                To become a globally recognized leader in pharmaceutical chemical 
                manufacturing, setting industry standards for quality, innovation, 
                and customer satisfaction. We aim to expand our footprint across 
                emerging markets while maintaining our commitment to ethical and 
                sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide our business and define who we are
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 p-6 rounded-sm text-center product-card"
                data-testid={`value-${index}`}
              >
                <div className="w-14 h-14 bg-slate-100 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-blue-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-6">
                Our Journey
              </h2>
              <p className="text-slate-600 mb-6">
                From humble beginnings in 1980 to becoming a recognized name in 
                pharmaceutical chemicals, our journey has been marked by continuous 
                growth and unwavering commitment to quality.
              </p>
              <div className="flex items-center gap-3 text-slate-500">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-medium">40+ Years of Excellence</span>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200"></div>
                
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative pl-12" data-testid={`milestone-${index}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{milestone.year.slice(-2)}</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-sm">
                        <span className="text-blue-600 font-semibold">{milestone.year}</span>
                        <p className="text-slate-700 mt-1">{milestone.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 md:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Leadership Team
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Guiding Rasino Drugs with vision, expertise, and commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <div 
                key={index}
                className="bg-slate-800 p-8 rounded-sm text-center"
                data-testid={`leader-${index}`}
              >
                <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-1">
                  {leader.name}
                </h3>
                <p className="text-blue-400 text-sm uppercase tracking-wider mb-4">
                  {leader.role}
                </p>
                <p className="text-slate-400 text-sm">{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-slate-200 rounded-sm">
              <div className="text-4xl font-heading font-bold text-slate-900 mb-2">Maharashtra</div>
              <p className="text-slate-500">Registered Office Location</p>
            </div>
            <div className="text-center p-8 border border-slate-200 rounded-sm">
              <div className="text-4xl font-heading font-bold text-slate-900 mb-2">₹10-25 Cr</div>
              <p className="text-slate-500">Annual Revenue Range</p>
            </div>
            <div className="text-center p-8 border border-slate-200 rounded-sm">
              <div className="text-4xl font-heading font-bold text-slate-900 mb-2">2015</div>
              <p className="text-slate-500">Incorporated as Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
