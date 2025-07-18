"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
interface Props {
  products: Stripe.Product[];
}
export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000); // change slide every 3 secs
    return () => clearInterval(interval);
	}, [products.length]);  
	
  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;
  console.log("The price is : ", price);
  return (
		<Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
			{currentProduct.images && currentProduct.images[0] && (
				<div className="relative h-80 w-full">
					<div className="relative w-full h-[400px]">
						{' '}
						{/* give height! */}
						<Image
							src={currentProduct.images[0]}
							alt={currentProduct.name}
							fill
							// width={1000}
							// height={10}
							className="object-cover transition-opacity duration-500 ease-in-out"
						/>
					</div>
				</div>
			)}
			<CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
				<CardTitle className="text-3xl font-bold text-white mb-2">
					{currentProduct.name}
				</CardTitle>
				{price && price.unit_amount && (
					<p className="text-xl text-white">
						${(price.unit_amount / 100).toFixed(2)}
					</p>
				)}
			</CardContent>
		</Card>
	);
};
