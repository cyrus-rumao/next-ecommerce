'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cart-store';
import { checkoutAction } from './checkout-action';

export default function CheckoutPage() {
	const { items, addItem, removeItem } = useCartStore();
	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	if (total === 0 || items.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
				<p className="text-lg mb-8">
					Please add items to your cart before checking out.
				</p>
			</div>
		);

		//acc = aculmuator. Its like the sum we use while ding looping calculations
		//where we do firsi int sum =0
		//and then while looping we do sum = sum+ item.price
		//same thing
	} else {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
					Checkout
				</h1>
				<Card className="max-w-md mx-auto mb-8">
					<CardHeader>
						<CardTitle className="text-xl font-bold">Order Summary</CardTitle>
						<CardContent>
							<ul className="space-y-4">
								{items.map((item, key) => (
									<li
										key={key}
										className="flex flex-col gap-2 border-b pb-2">
										<div className="flex justify-between">
											<span className="font-medium">{item.name}</span>
											<span className="font-semibold">
												{' '}
												${(item.price * item.quantity).toFixed(2)}
											</span>
										</div>
										<div className="flex items-center gap-6 ">
											<Button
												variant={'outline'}
												size={'sm'}
												onClick={() => removeItem(item.id)}>
												{' '}
												-{' '}
											</Button>
											<span className="text-lg font-semibold ">
												{' '}
												{item.quantity}{' '}
											</span>
											<Button
												variant={'outline'}
												size={'sm'}
												onClick={() => addItem({ ...item, quantity: 1 })}>
												{' '}
												+{' '}
											</Button>
										</div>
									</li>
								))}
							</ul>
							<div>
								<p>Total: ${total.toFixed(2)}</p>
							</div>
						</CardContent>
					</CardHeader>
					<form
						action={checkoutAction}
						className="max-w-full mx-auto flex flex-col space-y-4">
						<input
							type="hidden"
							name="items"
							value={JSON.stringify(items)}
						/>
						<Button
							variant="default"
							type="submit"
							className="w-full">
							Proceed To Checkout
						</Button>
					</form>
				</Card>
			</div>
		);
	}
}
