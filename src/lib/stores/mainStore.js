import { writable } from 'svelte/store';

const mainStore = writable({
	user: {
		info: {
			username: '',
			id: '',
			avatar: '',
			currency: '',
			email: '',
			phone: '',
			units: '',
			address: '',
			access: '',
			bio: ''
		},
		products: [
			{
				id: '',
				farmer_id: '',
				category_id: '',
				name: '',
				description: '',
				image: '',
				retail_price: '',
				wholesale_price: '',
				wholesale_unit_quantity: '',
				total_product_quantity: '',
				farmer_name: '',
				comments: [],
				timestamp: '',
				category_name: ''
			}
		]
	},
	catalog: [
		{
			id: '',
			farmer_id: '',
			category_id: '',
			name: '',
			description: '',
			image: '',
			retail_price: '',
			wholesale_price: '',
			wholesale_unit_quantity: '',
			total_product_quantity: '',
			farmer_name: '',
			comments: [],
			timestamp: '',
			category_name: ''
		}
	],
	product_categories: [
		{
			value: '',
			name: ''
		}
	],
	access_token: '',
	access_level: 'user',
	loggedIn: false,
	farmer: {
		info: {
			username: '',
			id: '',
			avatar: '',
			currency: '',
			email: '',
			phone: '',
			units: '',
			address: '',
			access: ''
		},
		products: [
			{
				id: '',
				farmer_id: '',
				category_id: '',
				name: '',
				description: '',
				image: '',
				retail_price: '',
				wholesale_price: '',
				wholesale_unit_quantity: '',
				total_product_quantity: '',
				farmer_name: '',
				comments: [],
				timestamp: '',
				category_name: ''
			}
		]
	}
});
export default mainStore;
