import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Mail, Shield } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop"; // ← your custom button

function AppLayout() {
  return (
    <div className="relative min-h-screen">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-thread-light.png')] opacity-15"></div>

      {/* Foreground content */}
      <div className="relative z-10">
        <main className="min-h-screen container">
          <Header />
          <Outlet />
        </main>

        {/* Footer */}
        <div className="bg-gray-900/80 backdrop-blur-sm mt-16 py-8 px-4 border-t border-yellow-500/20 shadow-inner">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <p className="text-md text-gray-500 mb-4">
                &copy; {new Date().getFullYear()} Trimrr. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/contact-us"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*scroll-to-top*/}
      <ScrollToTop />
    </div>
  );
}

export default AppLayout;
