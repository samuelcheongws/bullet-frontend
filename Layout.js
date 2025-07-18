import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { TrendingUp, Target, Menu, Bell, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navigationItems = [
  {
    title: "Portfolio",
    url: createPageUrl("Portfolio"),
    icon: TrendingUp,
  },
  {
    title: "Orders",
    url: createPageUrl("Orders"),
    icon: Target,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <style>
        {`
          :root {
            --primary-bg: #0a0a0a;
            --secondary-bg: #1a1a1a;
            --accent-green: #00ff88;
            --accent-lime: #ccff00;
            --text-primary: #ffffff;
            --text-secondary: #a0a0a0;
            --danger: #ff3366;
            --success: #00ff88;
          }
          
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          .trading-card {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            border: 1px solid #333;
            backdrop-filter: blur(10px);
          }
          
          .neon-glow {
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
          }
          
          .price-positive {
            color: var(--success);
          }
          
          .price-negative {
            color: var(--danger);
          }
          
          .glass-effect {
            background: rgba(26, 26, 26, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>

      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 glass-effect border-b border-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-lime-400 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              TradePro
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-400" />
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 glass-effect border-t border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex justify-around items-center p-4">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <Link
                key={item.title}
                to={item.url}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-green-400/20 to-lime-400/20 text-green-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon className={`w-6 h-6 transition-transform duration-300 ${
                  isActive ? 'scale-110' : ''
                }`} />
                <span className="text-xs font-medium">{item.title}</span>
                {isActive && (
                  <motion.div 
                    className="w-4 h-0.5 bg-gradient-to-r from-green-400 to-lime-400 rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}