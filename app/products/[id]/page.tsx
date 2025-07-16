import { stripe } from '@/lib/stripe';
import { ProductDetail } from '@/components/product-detail';

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const productRaw = await stripe.products.retrieve(id, {
		expand: ['default_price'],
	});

	const product = JSON.parse(JSON.stringify(productRaw));

	return <ProductDetail product={product} />;
}
