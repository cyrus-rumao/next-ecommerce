import React from 'react';
import { RoadmapItem } from '../types';
import { StageCard } from './StageCard';

interface StageContainerProps {
	items: RoadmapItem[];
	currentIndex: number;
	startIndex: number;
}

export const StageContainer: React.FC<StageContainerProps> = ({
	items,
	currentIndex,
	startIndex,
}) => {
	return (
		<div className="h-40 relative overflow-hidden">
			{/* Sliding container */}
			<div
				className="flex h-full transition-transform duration-700 ease-in-out"
				style={{
					transform: `translateX(-${startIndex * 25}%)`,
					width: `${items.length * 25}%`,
				}}>
				{/* All cards */}
				{items.map((item, index) => (
					<div
						key={item.id}
						className="h-full text-white flex items-center justify-center px-4"
						style={{ width: '25%' }}>
						<StageCard
							item={item}
							isActive={index === currentIndex}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
