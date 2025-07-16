'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';

export default function SuccessPage() {
  const { clearCart } = useCartStore();
	useEffect(() => {
		clearCart();
	}, [clearCart]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<svg
				className="w-20 h-20 text-green-500 mb-4"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				viewBox="0 0 24 24">
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M8 12l2 2 4-4"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
			</svg>
			<h1 className="text-2xl font-bold mb-2">Thank you for your purchase!</h1>
			<p className="text-gray-600 mb-6">
				Your order was successful.
			</p>
			<Link
				href="/"
				className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
				Continue Shopping
			</Link>
		</div>
	);
}
