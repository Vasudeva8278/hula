"use client";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { fetchEvents } from '../redux/slice/event';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import { Button } from '@/ui/button';
import { Sparkles, Plus } from 'lucide-react';
import Link from "next/link";
export default function EventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector((state: any) => state.events);
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleFiltersChange = (filters: any) => {
    let filtered = events;
    if (filters.category && filters.category !== '') {
      filtered = filtered.filter(event => event.category?.toLowerCase().includes(filters.category.toLowerCase()));
    }
    setFilteredEvents(filtered);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-8 w-8 text-blue-400" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Discover Amazing Events
          </h1>
          <Sparkles className="h-8 w-8 text-blue-400" />
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Connect with your community through exciting events, workshops, and gatherings. 
          Create lasting memories and build meaningful connections.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-lg px-8 py-3"
        >
          <Link href="/create_event">
            <Plus className="h-5 w-5 mr-2" />
            Create Your Event
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <EventFilters onFiltersChange={handleFiltersChange} />
        </div>

        {/* Events Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Upcoming Events ({filteredEvents.length})
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                Grid View
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                List View
              </Button>
            </div>
          </div>

          {loading && <p className="text-white">Loading events...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {filteredEvents && filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event: { _id?: string; id?: string; category?: string }, index: number) => (
                <EventCard key={event._id || event.id || index} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No events found matching your criteria</div>
              <Button 
                variant="outline" 
                className="border-blue-500 text-b
                lue-400 hover:bg-blue-500 hover:text-white"
                onClick={() => setFilteredEvents(events)}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More Button */}
          {filteredEvents.length > 0 && (
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
              >
                Load More Events
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
