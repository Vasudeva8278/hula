"use client";

import { useState } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Calendar, Filter, Search } from 'lucide-react';

interface EventFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const EventFilters = ({ onFiltersChange }: EventFiltersProps) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    location: ''
  });

  const categories = [
    'All Categories',
    'Tech Meetup',
    'Art Workshop',
    'Music Concert',
    'Sports Event',
    'Business Conference',
    'Food & Drink',
    'Health & Wellness',
    'Education'
  ];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      location: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-400">
          <Filter className="h-5 w-5 mr-2" />
          Filter Events
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-gray-300">Search Events</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by title or description..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-gray-300">Category</Label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-blue-500 focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label className="text-gray-300">Date Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
              />
            </div>
            <div>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-300">Location</Label>
          <Input
            id="location"
            placeholder="Enter city or address..."
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          />
        </div>

        <Button 
          onClick={clearFilters}
          variant="outline"
          className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventFilters;
