import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Globe,
  Cookie,
  ArrowRight,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col items-center px-4 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-16 h-16 text-yellow-400 mr-4" />
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-white font-extrabold leading-tight tracking-tight">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-extrabold">Privacy</span>
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-400/30 -z-10 transform -skew-x-12"></span>
              </span>{" "}
              Policy
            </h1>
          </div>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-yellow-400 font-semibold">Trimrr</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500/30 -z-10 transform skew-x-12"></span>
            </span>{" "}
            collects, uses, and protects your personal information.
          </p>

          <div className="flex items-center justify-center text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Last updated: June 18, 2025</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="w-full space-y-16">
          {/* Information We Collect */}
          <section id="information-collection" className="scroll-mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                  <Database className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Information We Collect</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  We collect several types of information to provide and improve our URL shortening services:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mr-2" />
                      Personal Information
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Email address</li>
                      <li>• Name (optional)</li>
                      <li>• Profile information</li>
                      <li>• Account preferences</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mr-2" />
                      Usage Information
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• URLs you shorten</li>
                      <li>• Click analytics data</li>
                      <li>• Device and browser information</li>
                      <li>• IP addresses and location data</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Automatic Data Collection</h4>
                      <p className="text-gray-300">
                        Some information is collected automatically when you use our service, including cookies,
                        log files, and analytics data to improve your experience and service performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section id="how-we-use" className="scroll-mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                  <Eye className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">How We Use Your Information</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  We use the information we collect for the following purposes:
                </p>

                <div className="space-y-4">
                  {[
                    "Provide and maintain our URL shortening services",
                    "Generate analytics and insights for your shortened URLs",
                    "Communicate with you about your account and our services",
                    "Improve and optimize our platform performance",
                    "Detect and prevent fraud or abuse",
                    "Comply with legal obligations and protect our rights"
                  ].map((purpose, index) => (
                    <div key={index} className="flex items-center p-4 bg-white/5 rounded-xl">
                      <ArrowRight className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                      <span className="text-lg">{purpose}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          {/* <section id="information-sharing" className="scroll-mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Information Sharing</h2>
              </div>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  information only in the following limited circumstances:
                </p>

                <Accordion type="multiple" className="w-full space-y-4">
                  <AccordionItem 
                    value="item-1" 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-yellow-400/50"
                  >
                    <AccordionTrigger className="text-white hover:text-yellow-400 transition-colors py-6 text-lg font-medium">
                      Service Providers
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6 text-base leading-relaxed">
                      We may share information with trusted third-party service providers who help us operate 
                      our platform, such as hosting services, analytics providers, and customer support tools. 
                      These providers are bound by strict confidentiality agreements.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem 
                    value="item-2" 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-yellow-400/50"
                  >
                    <AccordionTrigger className="text-white hover:text-yellow-400 transition-colors py-6 text-lg font-medium">
                      Legal Requirements
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6 text-base leading-relaxed">
                      We may disclose information when required by law, such as in response to court orders, 
                      legal processes, or to protect our rights, property, or safety, or that of our users 
                      or the public.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem 
                    value="item-3" 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-yellow-400/50"
                  >
                    <AccordionTrigger className="text-white hover:text-yellow-400 transition-colors py-6 text-lg font-medium">
                      Business Transfers
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6 text-base leading-relaxed">
                      In the event of a merger, acquisition, or sale of assets, user information may be 
                      transferred as part of the transaction. We will notify users of any such change in 
                      ownership or control of personal information.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section> */}

          {/* Data Security */}
          <section id="data-security" className="scroll-mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                  <Lock className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Data Security</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  We implement industry-standard security measures to protect your personal information:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Shield className="w-6 h-6 text-yellow-400" />,
                      title: "Encryption",
                      description: "All data is encrypted in transit and at rest using industry-standard protocols."
                    },
                    {
                      icon: <Lock className="w-6 h-6 text-yellow-400" />,
                      title: "Access Control",
                      description: "Strict access controls ensure only authorized personnel can access user data."
                    },
                    {
                      icon: <Globe className="w-6 h-6 text-yellow-400" />,
                      title: "Secure Infrastructure",
                      description: "Our infrastructure is hosted on secure, compliant cloud platforms with regular audits."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-yellow-400/10 rounded-xl">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Cookies & Tracking */}
          <section id="cookies" className="scroll-mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                  <Cookie className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Cookies & Tracking Technologies</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience and analyze usage patterns.
                </p>

                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Types of Cookies We Use:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-medium">Essential Cookies</h4>
                          <p className="text-gray-300 text-sm">Required for the website to function properly</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-medium">Analytics Cookies</h4>
                          <p className="text-gray-300 text-sm">Help us understand how you use our service</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-medium">Preference Cookies</h4>
                          <p className="text-gray-300 text-sm">Remember your settings and preferences</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          {/* <section id="your-rights" className="scroll-mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                  <Shield className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Your Privacy Rights</h2>
              </div>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  You have several rights regarding your personal information:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Access and review your personal data",
                    "Correct inaccurate or incomplete information",
                    "Delete your account and associated data",
                    "Export your data in a portable format",
                    "Opt-out of marketing communications",
                    "Restrict certain data processing activities"
                  ].map((right, index) => (
                    <div key={index} className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mr-4 flex-shrink-0" />
                      <span className="text-lg">{right}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">How to Exercise Your Rights</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To exercise any of these rights, please contact us using the information provided below. 
                    We will respond to your request within 30 days and may require verification of your identity 
                    to protect your privacy.
                  </p>
                </div>
              </div>
            </div>
          </section> */}

          {/* Contact */}
          <section id="contact" className="scroll-mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                  <Mail className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Contact Us</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Mail className="w-5 h-5 text-yellow-400 mr-2" />
                      Email
                    </h3>
                    <p className="text-yellow-400 font-medium">trimrr.link@gmail.com</p>
                    <p className="text-gray-300 text-sm mt-2">We respond within 24 hours</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Globe className="w-5 h-5 text-yellow-400 mr-2" />
                      Address
                    </h3>
                    <p className="text-gray-300">
                      Gujranwala, Punjab<br />
                      Pakistan
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Policy Updates</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material
                    changes by posting the new policy on this page and updating the "Last updated" date.
                    We encourage you to review this policy periodically.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="w-full text-center mt-20 py-16 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl border border-yellow-400/20">
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
            Questions about our{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-extrabold">
              Privacy Policy
            </span>?
          </h3>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            We're here to help. Contact our privacy team for any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
            <Link to="/contact-us">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 text-lg transition-all duration-200 w-full sm:w-auto">
                Contact Privacy Team
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;