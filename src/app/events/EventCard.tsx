"use client"; 

import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Button } from '@/ui/button';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    location: string;
    category: string;
    rsvpCount: number;
    isPublic: boolean;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <span className="inline-block px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
            {event.category}
          </span>
          {!event.isPublic && (
            <span className="text-xs text-gray-400">Private</span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(event.startDate)}
          </div>
          
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          
          <div className="flex items-center text-gray-400 text-sm">
            <Users className="h-4 w-4 mr-2" />
            {event.rsvpCount} attending
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white"
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            RSVP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
