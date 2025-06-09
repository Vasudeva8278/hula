"use client";

import { useState } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Search, Calendar, User, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black border-b border-blue-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-gray-300 hover:text-blue-400 transition-colors">
              Events
            </Link>
            <Link href="/map" className="text-gray-300 hover:text-blue-400 transition-colors">
              Map
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
           
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" passHref>
              <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              Create Event
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors py-2">
                Events
              </Link>
              <Link href="/map" className="text-gray-300 hover:text-blue-400 transition-colors py-2">
                Map
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors py-2">
                Dashboard
              </Link>
            </nav>
            <div className="flex flex-col space-y-2">
              <Link href="/login" passHref>
                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Create Event
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
