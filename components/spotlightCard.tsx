'use client';
import { useState } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import Image from 'next/image';
const SpotlightCard = ({
	image,
	title,
	price,
}: {
	image: string;
	title: string;
	price: number;
}) => {
	const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		setMousePos({ x, y });
	};

	return (
		<Card
			className="relative h-full overflow-hidden rounded-lg border-gray-300 shadow-md 
		transform transition-transform duration-300 ease-in-out 
		hover:scale-[1.07] hover:z-20 hover:shadow-[0_0_30px_10px_rgba(255,255,255,0.1)] hover:overflow-hidden hover:rounded-lg"
			onMouseMove={handleMouseMove}
			onMouseLeave={() => setMousePos({ x: -9999, y: -9999 })}>
			{/* Black & white base image */}

			{/* Colored spotlight image following the cursor */}

			<Image
				src={image}
				alt="color spotlight"
				fill
				className="object-cover transition-all duration-500 ease-in-out"
			/>

			<CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
				<CardTitle className="text-xl font-bold text-white mb-2 text-center">
					{title}
				</CardTitle>
				<p className="text-lg text-white">${(price / 100).toFixed(2)}</p>
			</CardContent>
		</Card>
	);
};

export default SpotlightCard;
