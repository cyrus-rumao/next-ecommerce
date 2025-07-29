import React from 'react';
import { RoadmapItem } from '@/app/random/page';

interface StageCardProps {
	item: RoadmapItem;
	isActive: boolean;
}

export const StageCard: React.FC<StageCardProps> = ({ item, isActive }) => (
	<div
		className={`
			relative text-center w-full max-w-md h-32 
			transition-all duration-300 ease-in-out
			${isActive ? 'opacity-100' : 'opacity-50'}
		`}
		style={{
			transform: isActive ? 'scale(1)' : 'scale(0.99)',
		}}>
		{/* Title */}
		<div
			className={`
				font-semibold mb-4 tracking-wide 
				transition-all duration-300 ease-in-out
				${isActive ? 'text-yellow-400 text-lg' : 'text-yellow-300 text-base'}
			`}
			style={{
				textShadow: isActive
					? '0px 0px 10px rgba(244, 243, 237, 0.855)'
					: 'none',
			}}>
			{item.title}
		</div>

		{/* Description */}
		<p
			className={`
				leading-relaxed transition-all duration-300 ease-in-out
				${isActive ? 'text-gray-300 text-sm' : 'text-gray-500 text-xs'}
			`}>
			{item.description}
		</p>
	</div>
);
