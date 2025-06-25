import { useParams } from "react-router-dom";
import { getLongUrl, storeClicks } from "../db/apiUrls";
import { useEffect, useState } from "react";
import { Link, Scissors, Zap } from "lucide-react";

function Redirect() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = "#0f0f23";

    async function redirectUser() {
      try {
        const data = await getLongUrl(id);
        if (data?.original_url) {
          storeClicks({ id: data.id, originalUrl: data.original_url });
          window.location.href = data.original_url;
        } else {
          throw new Error("URL not found");
        }
      } catch (err) {
        console.error("Redirect error:", err.message);
        setLoading(false);
      }
    }

    if (id) redirectUser();

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [id]);

  if (!loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center px-4">
        <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <Link className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-red-400 mb-2">
            Link Not Found
          </h1>
          <p className="text-gray-300 mb-6">
            This shortened URL is invalid or has expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      {/* Professional Trimrr Loader */}
      <div className="text-center">
        {/* Animated Logo Area */}
        <div className="relative mb-8">
          {/* Outer Rotating Ring */}
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-yellow-400/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Scissors className="w-5 h-5 text-black animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Brand Name */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                Trimrr
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-400/30 -z-10 transform -skew-x-12"></span>
            </span>
          </h1>
        </div>

        {/* Loading Text with Animation */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute w-64 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{ animationDuration: '2s' }}></div>
        </div>

        {/* <p className="text-gray-400 mt-6 text-sm">
          A modern URL shortener with analytics and full control.
        </p> */}
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-yellow-400/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}

export default Redirect;