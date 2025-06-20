"use client";

import { useRouter } from "next/navigation";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Button } from "@/ui/button";
import Link from "next/link";

interface EventType {
	_id?: string;
	id?: string;
	category?: string;
	title?: string;
	name?: string;
	description?: string;
	startDate?: string;
	date?: string;
	location?:
		| string
		| {
				url?: string;
				coordinates?: { latitude: number; longitude: number };
		  };
	rsvpCount?: number;
	isPublic?: boolean;
}

interface EventCardProps {
	event: EventType;
}

const EventCard = ({ event }: EventCardProps) => {
	const router = useRouter();

	const formatDate = (dateString: string) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	let locationString = "";
	if (typeof event.location === "string") {
		locationString = event.location;
	} else if (event.location && typeof event.location === "object") {
		if (event.location.url) {
			locationString = event.location.url;
		} else if (event.location.coordinates) {
			const { latitude, longitude } = event.location.coordinates;
			locationString = `Lat: ${latitude}, Lng: ${longitude}`;
		}
	}

	const handleViewDetails = (e: React.MouseEvent) => {
		e.preventDefault();
		const eventId = event._id || event.id;
		if (eventId) {
			router.push(`/events/${eventId}`);
		}
	};

	const getGoogleMapsUrl = () => {
		if (
			event.location &&
			typeof event.location === "object" &&
			event.location.coordinates
		) {
			const { latitude, longitude } = event.location.coordinates;
			return `https://www.google.com/maps?q=${latitude},${longitude}`;
		}
		return null;
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
					{event.title || event.name}
				</h3>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-gray-300 text-sm line-clamp-2">
					{event.description}
				</p>
				<div className="space-y-2">
					<div className="flex items-center text-gray-400 text-sm">
						<Calendar className="h-4 w-4 mr-2" />
						{formatDate(event.startDate || event.date || "")}
					</div>
					<div className="flex items-center text-gray-400 text-sm">
						<MapPin className="h-4 w-4 mr-2" />
						{getGoogleMapsUrl() ? (
							<a
								href={getGoogleMapsUrl()!}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-400"
							>
								{locationString}
							</a>
						) : (
							locationString
						)}
					</div>
					<div className="flex items-center text-gray-400 text-sm">
						<Users className="h-4 w-4 mr-2" />
						{event.rsvpCount || 0} attending
					</div>
				</div>
				<div className="flex gap-2 pt-2">
					<Link
						href={`/events/${event._id || event.id}`}
						className="flex-1"
					>
						<Button
							variant="outline"
							size="sm"
							className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white"
						>
							View Details
						</Button>
					</Link>
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
