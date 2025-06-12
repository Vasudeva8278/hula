import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/app/utils/config/db";

// Use the same schema definition as in the main event route
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Object, required: true },
    isOnline: { type: Boolean, required: true },
    status: { type: String, required: true, default: 'upcoming' },
    description: { type: String },
    rsvpCount: { type: Number, default: 0 },
    location: {
        url: { type: String },
        coordinates: { 
            latitude: { type: Number },
            longitude: { type: Number }
        }
    }
});

// Use the same model name as in the main event route
const EventModel = mongoose.models.EventCounts || mongoose.model("EventCounts", eventSchema);

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const id = params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid ID format:", id);
            return NextResponse.json(
                { message: "Invalid event ID format" },
                { status: 400 }
            );
        }

        const event = await EventModel.findById(id).lean();
        console.log("Found event:", event); // Debug log
        
        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(event, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        return NextResponse.json(
            { message: "Error fetching event", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}