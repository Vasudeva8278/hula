'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BASE_URL } from "@/app/utils/base/api";




interface Event {
  _id: string;
  name: string;
  date: string;
  isOnline: boolean;
  location: {
    url: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
}

export default function EventDetailsPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/event/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch event: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setEvent(data);
      } catch (e: any) {
        setError(e.message || "Failed to fetch event");
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
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  const googleMapsUrl = event.location.coordinates?.latitude && event.location.coordinates?.longitude
    ? `https://www.google.com/maps/search/?api=1&query=${event.location.coordinates.latitude},${event.location.coordinates.longitude}`
    : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
      <p>Date: {event.date}</p>
      <p>Is Online: {event.isOnline ? 'Yes' : 'No'}</p>
      {event.location.url && (
        <p>
          Location URL: <a href={event.location.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{event.location.url}</a>
        </p>
      )}
      {googleMapsUrl && (
        <p>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-green-500">
            View on Google Maps
          </a>
        </p>
      )}
    </div>
  );
}