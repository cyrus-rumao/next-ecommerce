import { ProductList } from '@/components/product-list';
import { stripe } from '@/lib/stripe';

export default async function ProductsPage() {
	const products = await stripe.products.list({
		expand: ['data.default_price'],
	});
	// console.log(products.data);
	return (
		<div className="pb-8">
			{/* <h1>teri mkc</h1> */}
			<h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
				Products Page
			</h1>
			<ProductList products={products.data} />
		</div>
	);
}
