'use client';

import Link from 'next/link';

export default function CancelPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<svg
				className="w-20 h-20 text-red-500 mb-4"
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
					d="M15 9l-6 6M9 9l6 6"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
			</svg>
			<h1 className="text-2xl font-bold mb-2">Purchase Cancelled</h1>
			<p className="text-gray-600 mb-6">
				Your order was not completed. You can try again or continue shopping.
			</p>
			<Link
				href="/"
				className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
				Back to Home
			</Link>
		</div>
	);
}
