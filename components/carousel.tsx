'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Stripe from 'stripe';
import { Card, CardContent, CardTitle } from './ui/card';
import SpotlightCard from './spotlightCard';

interface Props {
	products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
	const [isPaused, setIsPaused] = useState(false);
	const [translateX, setTranslateX] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const LOOP_COUNT = 20; // Repeat products many times for long scroll
	const longList = Array.from({ length: LOOP_COUNT }, () => products).flat();

	useEffect(() => {
		if (!containerRef.current || isPaused || products.length === 0) return;

		const container = containerRef.current;
		const contentWidth = container.scrollWidth / 2; // reset after halfway

		intervalRef.current = setInterval(() => {
			setTranslateX((prev) => {
				const newX = prev - 1; // adjust scroll speed

				// Reset when halfway scrolled
				if (Math.abs(newX) >= contentWidth) {
					return 0;
				}

				return newX;
			});
		}, 16); // ~60fps

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isPaused, products.length]);

	return (
		<div
			ref={containerRef}
			className="relative w-full h-80 overflow-hidden rounded-lg shadow-md"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}>
			<div
				className="flex h-full"
				style={{
					transform: `translateX(${translateX}px)`,
					transition: 'transform 0.05s linear',
				}}>
				{longList.map((product, index) => {
					const price = product.default_price as Stripe.Price;

					return (
						<div
							key={`${product.id}-${index}`}
							className="w-1/4 flex-shrink-0 h-full px-2">
							<Card className="relative h-full overflow-hidden rounded-lg border-gray-300 shadow-md transform transition-transform duration-300 ease-in-out hover:scale-[1.07] hover:z-20 hover:shadow-[0_0_30px_10px_rgba(255,255,255,0.1)]">
								{product.images?.[0] && (
									<div className="relative h-full w-full">
										<Image
											src={product.images[0]}
											alt={product.name}
											fill
											className="object-cover transition-opacity duration-500 ease-in-out"
										/>
									</div>
								)}
								<CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
									<CardTitle className="text-xl font-bold text-white mb-2 text-center">
										{product.name}
									</CardTitle>
									{price?.unit_amount && (
										<p className="text-lg text-white">
											${(price.unit_amount / 100).toFixed(2)}
										</p>
									)}
								</CardContent>
							</Card>
						</div>
					);
				})}
			</div>
		</div>
	);
};
