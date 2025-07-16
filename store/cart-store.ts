import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	imageUrl: string | null; // can be a string or null
}

interface CartStore {
	items: CartItem[];
	addItem: (item: CartItem) => void;
}

export const UseCartStore = create<CartStore>()(
	persist(
		(set) => ({
			items: [],
			addItem: (item) =>
				set((state) => {
					const existing = state.items.find((i) => i.id === item.id);
					if (existing) {
						return {
							items: state.items.map((i) =>
								i.id === item.id
									? { ...i, quantity: i.quantity + item.quantity }
									: i
							),
						};
					} else {
						return {
							items: [...state.items, item],
						};
					}
				}),
		}),
		{
			name: 'cart', // unique name for the storage
		}
	)
);
