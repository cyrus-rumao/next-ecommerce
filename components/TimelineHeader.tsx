import React from 'react';

interface TimelineHeaderProps {
	title: string;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({ title }) => (
	<div className="text-center mb-16">
		<h1 className="text-5xl font-bold text-white tracking-widest">{title}</h1>
	</div>
);
