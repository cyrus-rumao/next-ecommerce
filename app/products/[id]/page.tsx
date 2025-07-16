import { stripe } from '@/lib/stripe';
import { ProductDetail } from '@/components/product-detail';

type Props = {
	params: {
		id: string;
	};
};

export default async function ProductPage({ params }: Props) {

  const { id } = await params;
	const Product = await stripe.products.retrieve(id, {
		expand: ['default_price'],
	});

	const product = JSON.parse(JSON.stringify(Product));

	return <ProductDetail product={product} />;
}
