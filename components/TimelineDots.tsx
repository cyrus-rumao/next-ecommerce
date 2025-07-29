import React from 'react';
import { RoadmapItem } from '../types';

interface TimelineDotsProps {
	items: RoadmapItem[];
	currentIndex: number;
	startIndex: number;
	onDotClick: (index: number) => void;
}

export const TimelineDots: React.FC<TimelineDotsProps> = ({
	items,
	currentIndex,
	startIndex,
	onDotClick,
}) => {
	const visibleItems = items.slice(startIndex, startIndex + 4);

	return (
		<div className="relative mb-16 px-8">
			{/* Duration labels row */}
			<div className="flex justify-between mb-8">
				{visibleItems.map((item, index) => (
					<div
						key={`duration-${item.id}`}
						className="text-center flex-1">
						<div
							className={`text-base font-medium transition-colors duration-300 ${
								startIndex + index === currentIndex
									? 'text-yellow-400'
									: 'text-gray-400'
							}`}>
							{item.duration}
						</div>
					</div>
				))}
			</div>

			{/* Timeline line and dots */}
			<div className="relative">
				{/* Background line */}
				<div className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-700 w-full"></div>

				{/* Progress line within current group */}
				<div
					className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-700 shadow-[0_0_8px_rgba(234,179,8,0.4)]"
					style={{
						width: `${((currentIndex - startIndex) / 3) * 100}%`,
					}}
				/>

				{/* Timeline dots */}
				<div className="flex justify-between items-center">
					{visibleItems.map((item, index) => {
						const actualIndex = startIndex + index;
						return (
							<div
								key={item.id}
								className="flex flex-col items-center flex-1">
								{/* Timeline dot */}
								<div
									className={`w-8 h-8 rounded-full border-2 transition-all duration-500 cursor-pointer hover:scale-110 relative z-10 ${
										actualIndex <= currentIndex
											? 'bg-yellow-400 border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.8)]'
											: 'bg-black border-gray-500 hover:border-yellow-400/60'
									}`}
									onClick={() => onDotClick(actualIndex)}
								/>

								{/* Stage label */}
								<div
									className={`mt-4 text-sm font-medium transition-colors duration-300 ${
										actualIndex === currentIndex
											? 'text-white'
											: 'text-gray-500'
									}`}>
									Stage {actualIndex + 1}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
	