import React, { useState } from 'react';
import { 
  Mail, 
  Phone,
  Clock,
} from 'lucide-react';

function ContactUs() {

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "trimmr.link@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+92 (324) 540-3464",
      description: "Mon-Fri from 8am to 6pm"
    },
   
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      content: "Within 24 hours",
      description: "We'll get back to you quickly"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent"></div>
      
      <div className="flex flex-col items-center px-4 py-8 max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="my-10 sm:my-16 text-4xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold leading-tight tracking-tight">
            Get in{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-extrabold">Touch</span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-400/30 -z-10 transform -skew-x-12"></span>
            </span>{" "}
            <br />
            with{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-yellow-400 font-semibold">Trimrr</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500/30 -z-10 transform skew-x-12"></span>
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Have questions about our URL shortening service? Need help with your account? 
            We're here to help you succeed with{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-yellow-400 font-semibold">Trimrr</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500/30 -z-10 transform skew-x-12"></span>
            </span>.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="w-full mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-yellow-400/10 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300 text-yellow-400">
                    {info.icon}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {info.title}
                  </h3>
                  
                  <p className="text-yellow-400 font-medium mb-1">
                    {info.content}
                  </p>
                  
                  <p className="text-gray-400 text-sm">
                    {info.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;