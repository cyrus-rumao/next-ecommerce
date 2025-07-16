'use server';
import { stripe } from '@/lib/stripe';
import { CartItem } from '@/store/cart-store';
import { redirect } from 'next/navigation';
export const checkoutAction = async (formData: FormData): Promise<void> => {
	const itemsJSON = formData.get('items') as string;
	const items = JSON.parse(itemsJSON);
	const line_items = items.map((items: CartItem) => ({
		price_data: {
			currency: 'usd',
			product_data: {
				name: items.name,
			},
			unit_amount: Math.round(items.price * 100),
		},
		quantity: items.quantity,
	}));
	console.log(items.price);
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items,
		mode: 'payment',
		success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
	});
	redirect(session.url!);
};
