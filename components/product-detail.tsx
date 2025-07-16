'use client';

import Stripe from 'stripe';
import Image from 'next/image';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cart-store';
interface Props {
	product: Stripe.Product;
}
export const ProductDetail = ({ product }: Props) => {

	const { items, addItem, removeItem } = useCartStore();
	
	const cartItem = items.find((item) => item.id === product.id);
	const quantity = cartItem ? cartItem.quantity : 0;
	const price = product.default_price as Stripe.Price;

	function onAddItem() { 
		addItem({
			id: product.id,
			name: product.name,
			price: price.unit_amount ? price.unit_amount / 100 : 0,
			quantity: 1,
			imageUrl: product.images ? product.images[0] : null,
		})
	}

	
	return (
		<div className='container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center'>
			{product.images && product.images[0] && (
				<div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
					<Image
						src={product.images[0]}
						alt={product.name}
						fill
						className=" object-contain group-hover:opacity-90 transition-opacity duration-300 ease-in-out rounded-t-2xl"
					/>
				</div>
			)}
			<div className='md:w-1/2'>
				<h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
				{product.description && (
					<p className="text-black mb-4">
						{product.description.length > 100
							? `${product.description.substring(0, 100)}...`
							: product.description}
					</p>
				)}
				{price && price.unit_amount && (
					<p className="text-gray-900 text-lg font-semibold">
						${(price.unit_amount / 100).toFixed(2)}
					</p>
				)}
				<div className='flex items-center space-x-6 group'>
          <Button variant={'outline'} onClick={()=> removeItem(product.id)}> - </Button>
          <span className='text-lg font-semibold '> {quantity} </span>
					<Button onClick={onAddItem} className='group fixed ml-24'> + </Button>
				</div>
			</div>
		</div>
	);
};
