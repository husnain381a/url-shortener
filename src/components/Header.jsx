import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut, Menu, X } from "lucide-react";
import { UrlState } from "../context";
import { logout } from "../db/apiAuth";
import useFetch from "../hooks/useFetch";
import { BarLoader } from "react-spinners";

function Header() {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "HOME", path: "/" },
    { name: "CREATE LINK", path: "/dashboard" },
    { name: "SEE YOUR LINKS", path: "/dashboard" },
    { name: "CONTACT US", path: "/contact-us" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center relative bg-gradient-to-r from-transparent via-black/5 to-transparent backdrop-blur-sm border-b border-white/10">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 group z-50 relative">
          <img
            src="/logo.png"
            className="h-12 sm:h-16 transition-transform duration-300 group-hover:scale-105"
            alt="Trimrr Logo"
          />
        </Link>

        {/* Navigation Items - Desktop */}
        <div className="hidden lg:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="group relative flex items-center space-x-2 px-4 py-3 text-md font-medium text-white/80 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5"
            >
              <span className="relative">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          ))}
        </div>

        {/* Right side - Auth + Mobile Menu */}
        <div className="flex items-center space-x-3 z-50 relative">
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 sm:px-6 py-2.5 text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-yellow-400/50 transition-all duration-300 hover:scale-105">
                <Avatar className="w-10 h-10 sm:w-10 sm:h-10">
                  <AvatarImage src={user?.user_metadata?.profilepic} />
                  <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-semibold text-sm">
                    {user?.user_metadata?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-black/90 backdrop-blur-md border-white/20 shadow-2xl z-[60]"
              >
                <DropdownMenuLabel className="text-white font-semibold py-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.user_metadata?.profilepic} />
                      <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-sm font-semibold">
                        {user?.user_metadata?.name?.charAt(0).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">
                        {user?.user_metadata?.name}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-yellow-400 transition-all duration-300 cursor-pointer py-3">
                  <Link
                    to={"/dashboard"}
                    className="flex items-center w-full space-x-3"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="font-medium">My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 cursor-pointer py-3">
                  <div
                    className="flex items-center w-full space-x-3"
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium">Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden h-10 w-10 p-0 text-white hover:bg-white/10 hover:text-yellow-400 transition-all duration-300 relative z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu - Limited Height Version */}
      {isMobileMenuOpen && (
        <div className="relative z-[110]">
          {/* Mobile Menu Slide-out Panel */}
          <div className="absolute right-0 top-0 w-80 max-w-[85vw] bg-black/95 backdrop-blur-md border-l border-white/20 shadow-2xl rounded-bl-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-xl font-semibold text-white">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-white/10 hover:text-yellow-400"
                onClick={closeMobileMenu}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col p-6 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="group flex items-center space-x-4 p-4 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium text-base">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading Bar */}
      {loading && <BarLoader className="mb-4" width={"100%"} color="#fbbf24" />}
    </>
  );
}

export default Header;
