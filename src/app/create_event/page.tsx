'use client'
import React, { useState } from 'react';
import { BASE_URL } from "../utils/base/api";
import { Toast, ToastProvider } from '@/ui/toast';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function CreateEventPage() {
    const [form, setForm] = useState({
        name: '',
        date: "",
        isOnline: false,
        status: "upcoming",
        location: {
            url: "",
            coordinates: {
                latitude: "",
                longitude: ""
            }
        }
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const router = useRouter(); // Initialize useRouter

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        const checked = type === "checkbox" ? (target as HTMLInputElement).checked : false;

        if (name === "isOnline") {
            setForm({ ...form, isOnline: checked });
        } else if (name === "latitude" || name === "longitude") {
            setForm({
                ...form,
                location: {
                    ...form.location,
                    coordinates: {
                        ...form.location.coordinates,
                        [name]: value
                    }
                }
            });
        } else if (name === "url") {
            setForm({
                ...form,
                location: {
                    ...form.location,
                    url: value
                }
            });
        } else if (name === "status") {
            setForm({ ...form, status: value });
        }
         else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setToast(null);

        try {
            const res = await fetch(`${BASE_URL}/event`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    date: form.date,
                    isOnline: form.isOnline,
                    status: form.status,
                    location: {
                        url: form.location.url,
                        coordinates: {
                            latitude: Number(form.location.coordinates.latitude),
                            longitude: Number(form.location.coordinates.longitude)
                        }
                    }
                })
            });

            if (res.ok) {
                const data = await res.json(); // Parse the response to get the new event data
                setToast({ message: "Event created successfully!", type: "success" });
                setForm({
                    name: "",
                    date: "",
                    isOnline: false,
                    status: "upcoming",
                    location: { url: "", coordinates: { latitude: "", longitude: "" } }
                });
                router.push(`/events/${data._id}`); // Redirect to the new event's details page
            } else {
                setToast({ message: "Failed to create event.", type: "error" });
            }
        } catch (error) {
            setToast({ message: "Error creating event.", type: "error" });
        }
        setLoading(false);
    };

    return (
        <ToastProvider>
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #232526 0%, #414345 100%)"
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        background: "rgba(30, 41, 59, 0.95)",
                        padding: "2.5rem 2rem",
                        borderRadius: "1.25rem",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                        width: "100%",
                        maxWidth: 400,
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.2rem"
                    }}
                >
                    <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "1rem", letterSpacing: "1px" }}>
                        Create Event
                    </h2>
                    <div>
                        <label style={{ color: "#fff" }}>Name:</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border: "none",
                                marginTop: "0.3rem",
                                background: "#23272f",
                                color: "#fff"
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ color: "#fff" }}>Date:</label>
                        <input
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            placeholder="DD/MM/YYYY"
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border: "none",
                                marginTop: "0.3rem",
                                background: "#23272f",
                                color: "#fff"
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ color: "#fff" }}>
                            <input
                                type="checkbox"
                                name="isOnline"
                                checked={form.isOnline}
                                onChange={handleChange}
                                style={{ marginRight: "0.5rem" }}
                            />
                            Online Event
                        </label>
                    </div>
                    <div>
                        <label style={{ color: "#fff" }}>Location URL:</label>
                        <input
                            name="url"
                            value={form.location.url}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border: "none",
                                marginTop: "0.3rem",
                                background: "#23272f",
                                color: "#fff"
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ color: "#fff" }}>Latitude:</label>
                        <input
                            name="latitude"
                            value={form.location.coordinates.latitude}
                            onChange={handleChange}
                            type="number"
                            step="any"
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border: "none",
                                marginTop: "0.3rem",
                                background: "#23272f",
                                color: "#fff"
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ color: "#fff" }}>Longitude:</label>
                        <input
                            name="longitude"
                            value={form.location.coordinates.longitude}
                            onChange={handleChange}
                            type="number"
                            step="any"
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border: "none",
                                marginTop: "0.3rem",
                                background: "#23272f",
                                color: "#fff"
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                            color: "#fff",
                            padding: "0.75rem",
                            border: "none",
                            borderRadius: "0.75rem",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            cursor: loading ? "not-allowed" : "pointer",
                            marginTop: "0.5rem",
                            transition: "background 0.2s"
                        }}
                    >
                        {loading ? "Creating..." : "Create Event"}
                    </button>
                    {toast && (
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToast(null)}
                        />
                    )}
                </form>
            </div>
        </ToastProvider>
    );
}