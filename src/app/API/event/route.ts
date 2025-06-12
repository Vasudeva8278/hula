import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/app/utils/config/db";


interface Event {
    name: string;
    date: any;
    isOnline: boolean;
    status : string;
    location: {
        url?: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
}


const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Object, required: true },
    isOnline: { type: Boolean, required: true },
    location: {
        url: { type: String },
        coordinates: { type: Object },
    },
});

const EventModel = mongoose.models.EventCounts || mongoose.model("EventCounts", eventSchema);


export async function POST(request: Request) {
    await connectDB();
    try {
        const { name, date, isOnline, location } = await request.json();
        const event = await EventModel.create({ name, date, isOnline, location });
        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Error creating event", error);
        return NextResponse.json({ message: "Error creating event" }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    try {
        const events = await EventModel.find();
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        console.error("Error fetching events", error);
        return NextResponse.json({ message: "Error fetching events" }, { status: 500 });
    }
}



export async function PUT(request: Request) {
    await connectDB();
    try {
        const { id, name, date, isOnline, location } = await request.json();
        const event = await EventModel.findByIdAndUpdate(
            id,
            { name, date, isOnline, location },
            { new: true }
        );
        return NextResponse.json(event, { status: 200 });
    } catch (error) {
        console.error("Error updating event", error);
        return NextResponse.json({ message: "Error updating event" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request: Request) {
    await connectDB();
    try {
        const { id } = await request.json();
        await EventModel.findByIdAndDelete(id);
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting event", error);
        return NextResponse.json({ message: "Error deleting event" }, { status: 500 });
    }
}

// READ BY ID
export async function POST_BY_ID(request: Request) {
    await connectDB();
    try {
        const { id } = await request.json();
        const event = await EventModel.findById(id);
        return NextResponse.json(event, { status: 200 });
    } catch (error) {
        console.error("Error fetching event by id", error);
        return NextResponse.json({ message: "Error fetching event by id" }, { status: 500 });
    }
}


