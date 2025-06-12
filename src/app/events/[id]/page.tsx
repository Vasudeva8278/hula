'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/ui/button";
import { BASE_URL } from "@/app/utils/base/api";


interface Event {
  _id: string;
  name: string;
  date: string;
  description?: string;
  location?: {
    url?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  rsvpCount?: number;
}

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        // Use the correct API route with capital API
        const response = await fetch(`${BASE_URL}/event/${id}`);
        console.log('Fetching from:', `${BASE_URL}/event/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Event data received:', data);
        setEvent(data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch event');
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">{error}</h2>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const googleMapsUrl = event.location?.coordinates 
    ? `https://www.google.com/maps?q=${event.location.coordinates.latitude},${event.location.coordinates.longitude}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{event.name}</h1>

          <div className="flex items-center space-x-4 text-gray-300">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            {event.location && (
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {googleMapsUrl ? (
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View on Google Maps
                  </a>
                ) : event.location.url || 'In-person event'}
              </div>
            )}
            {event.rsvpCount !== undefined && (
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {event.rsvpCount} attending
              </div>
            )}
          </div>

          {event.description && (
            <p className="text-gray-300">{event.description}</p>
          )}
        </div>

      </div>
    </div>
  );
}