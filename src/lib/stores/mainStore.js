import { writable } from 'svelte/store';

const mainStore = writable({
	user: {
		info: {
			username: '',
			id: '',
			avatar: 'avatar.webp',
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
				name: '',
				description: '',
				retail_price: '',
				product_quantity: '',
				image: ''
			}
		]
	},
	catalog: [
		{
			id: '',
			name: '',
			description: '',
			retail_price: '',
			product_quantity: '',
			image: '',
			farmer_id: ''
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
				name: '',
				description: '',
				retail_price: '',
				product_quantity: '',
				image: ''
			}
		]
	}
});
export default mainStore;
