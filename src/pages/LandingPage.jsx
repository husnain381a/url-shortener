import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scissors,
  Zap,
  Shield,
  BarChart3,
  Link,
  ChevronRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function LandingPage() {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${encodeURIComponent(longUrl)}`);
    }
  };

  const features = [
    {
      icon: <Scissors className="w-8 h-8 text-yellow-400" />,
      title: "Simple Shortening",
      description: "Transform long, unwieldy URLs into clean, memorable links with just one click."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Lightning Fast",
      description: "Our platform is built for speed, ensuring your shortened URLs load instantly."
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-400" />,
      title: "Secure Links",
      description: "All shortened URLs are protected with enterprise-grade security and privacy."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-yellow-400" />,
      title: "Detailed Analytics",
      description: "Track clicks, geographic data, and referrers with our powerful analytics."
    }
  ];

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="my-10 sm:my-16 text-4xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold leading-tight tracking-tight">
          The only{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-extrabold">URL Shortener</span>
            <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-400/30 -z-10 transform -skew-x-12"></span>
          </span>{" "}
          <br />
          you'll ever need!{" "}
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Shorten, customize, and track your links with{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-yellow-400 font-semibold">Trimrr</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500/30 -z-10 transform skew-x-12"></span>
          </span>{" "}
          - the most powerful{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-yellow-400 font-semibold">totally free</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500/30 -z-10 transform skew-x-12"></span>
          </span>{" "}
          URL shortener for modern businesses.
        </p>

      </div>

      {/* URL Shortening Form */}
      <div className="w-full max-w-2xl mb-16">
        <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="url"
              placeholder="Enter Long URL (e.g, https://abc.com)"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="h-14 pl-12 pr-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
              required
            />
          </div>
          <Button
            type="submit"
            className="h-14 px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg transition-all duration-200 flex items-center gap-2 group"
          >
            Shorten Now!
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center mb-16">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
        <div className="mx-4">
          <Scissors className="text-yellow-400 animate-bounce" size={28} />
        </div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500/50"></div>
      </div>

      {/* Banner Image */}
      <div className="w-full mb-20 relative">
        <img
          src="https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop"
          alt="URL Shortening Analytics Dashboard"
          className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
      </div>

      {/* Why Choose Trimrr Section */}
      <div className="w-full mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="relative inline-block">
              <span className="relative z-10">Why Choose</span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-400/30 -z-10 transform -skew-x-12"></span>
            </span>{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-extrabold">
              Trimrr
            </span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-yellow-400 font-semibold">Trimrr</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500/30 -z-10 transform skew-x-12"></span>
            </span>{" "}
            the perfect choice for individuals and businesses looking to optimize their link management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-yellow-400/10 rounded-2xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Frequently Asked{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Questions</span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-400/30 -z-10 transform -skew-x-12"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Got questions? We've got answers. Find everything you need to know about{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-yellow-400 font-semibold">Trimrr</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500/30 -z-10 transform skew-x-12"></span>
            </span>.
          </p>
        </div>

        <Accordion type="multiple" className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-yellow-400/50"
          >
            <AccordionTrigger className="text-white hover:text-yellow-400 transition-colors py-6 text-lg font-medium">
              How does the Trimrr URL shortener work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 pb-6 text-base leading-relaxed">
              When you enter a long URL, our system generates a shorter version of
              that URL. This shortened URL redirects to the original long URL when
              accessed, providing a seamless experience for your users.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-yellow-400/50"
          >
            <AccordionTrigger className="text-white hover:text-yellow-400 transition-colors py-6 text-lg font-medium">
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 pb-6 text-base leading-relaxed">
              Yes. Creating an account allows you to manage your URLs, view
              analytics, customize your short URLs, and access advanced features
              like branded domains and detailed reporting.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-yellow-400/50"
          >
            <AccordionTrigger className="text-white hover:text-yellow-400 transition-colors py-6 text-lg font-medium">
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 pb-6 text-base leading-relaxed">
              You can view comprehensive analytics including the number of clicks,
              geographic location data, device types (mobile/desktop), referrer sources,
              click timestamps, and much more for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-yellow-400/50"
          >
            <AccordionTrigger className="text-white hover:text-yellow-400 transition-colors py-6 text-lg font-medium">
              Is there a limit to how many URLs I can shorten?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 pb-6 text-base leading-relaxed">
              Enjoy unlimited URL shortening completely free,no plans, no subscriptions. Get access to custom links, detailed analytics, and more, all at zero cost.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Footer CTA */}
      <div className="w-full text-center mt-20 py-16 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl border border-yellow-400/20">
        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Ready to get started with{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-extrabold">
            Trimrr
          </span>?
        </h3>
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
          Join thousands of users who trust{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-yellow-400 font-semibold">Trimrr</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500/30 -z-10 transform skew-x-12"></span>
          </span>{" "}
          for their URL shortening needs.
        </p>
        <Button
          onClick={() => navigate('/auth')}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 text-lg transition-all duration-200"
        >
          Get Started Free
        </Button>
      </div>

    </div>
  );
}

export default LandingPage;