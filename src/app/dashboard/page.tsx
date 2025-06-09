import React from "react";

const eventCategories = [
	{ name: "Magic Shows", color: "bg-purple-500" },
	{ name: "Dance Shows", color: "bg-pink-500" },
	{ name: "Singing", color: "bg-blue-500" },
	{ name: "Comedy", color: "bg-yellow-500" },
	{ name: "Standup", color: "bg-green-500" },
	{ name: "Live Shows", color: "bg-red-500" },
];

const events = [
	{
		title: "Magic Night",
		date: "2025-06-10",
		status: "to-do",
		category: "Magic Shows",
	},
	{
		title: "Dance Fiesta",
		date: "2025-06-12",
		status: "upcoming",
		category: "Dance Shows",
	},
	{
		title: "Comedy Hour",
		date: "2025-06-09",
		status: "complete",
		category: "Comedy",
	},
];

const statusBoxes = [
	{ label: "To Do", key: "to-do", color: "bg-blue-600" },
	{ label: "Upcoming", key: "upcoming", color: "bg-orange-500" },
	{ label: "Complete", key: "complete", color: "bg-green-500" },
];

function getEventsByStatus(status: string) {
	return events.filter((e) => e.status === status);
}

export default function DashboardPage() {
	const today = new Date().toISOString().slice(0, 10);

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#232526] to-[#414345] p-8">
			<h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
			{/* Status Boxes - inline on all screens */}
			<div className="flex flex-row gap-6 mb-10 justify-center flex-wrap">
				{statusBoxes.map((box) => (
					<div
						key={box.key}
						className={`rounded-xl shadow-lg p-6 flex flex-col items-center ${box.color} bg-opacity-90 min-w-[450px]`}
					>
						<span className="text-lg font-semibold text-white mb-2">
							{box.label}
						</span>
						<span className="text-4xl font-bold text-white">
							{getEventsByStatus(box.key).length}
						</span>
						<ul className="mt-2 space-y-1">
							{getEventsByStatus(box.key).map((event) => (
								<li key={event.title} className="text-white text-sm">
									{event.title}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Calendar and Client Decorations in one row, two columns */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
				{/* Calendar */}
				<div className="bg-[#23272f] rounded-xl p-6 shadow-lg">
					<h2 className="text-xl font-semibold text-white mb-4">
						Event Calendar
					</h2>
					<div className="flex flex-wrap gap-2">
						{Array.from({ length: 30 }, (_, i) => {
							const date = new Date();
							date.setDate(date.getDate() + i);
							const dateStr = date.toISOString().slice(0, 10);
							const eventToday = events.find((e) => e.date === dateStr);
							return (
								<div
									key={dateStr}
									className={`w-12 h-12 flex items-center justify-center rounded-lg text-white font-semibold
                                        ${
											eventToday
												? "bg-blue-500 border-2 border-yellow-300 shadow-lg scale-110"
												: "bg-gray-700"
										}
                                    `}
									style={{ transition: "all 0.2s" }}
								>
									{date.getDate()}
								</div>
							);
						})}
					</div>
					<div className="mt-4 flex flex-wrap gap-2">
						{events.map((event) => (
							<span
								key={event.title}
								className="inline-block px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium shadow"
							>
								{event.title} ({event.date})
							</span>
						))}
					</div>
				</div>

				{/* Client Decorations */}
				<div className="bg-[#23272f] rounded-xl p-6 shadow-lg h-fit">
					<h2 className="text-xl font-semibold text-white mb-4">
						Client Decorations
					</h2>
					<div className="flex flex-wrap gap-3">
						{eventCategories.map((cat) => (
							<span
								key={cat.name}
								className={`px-4 py-2 rounded-full text-white font-semibold shadow ${cat.color} bg-opacity-80`}
							>
								{cat.name}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
