import { writable } from 'svelte/store';

const mainStore = writable({
	user: {
		username: '',
		id: '',
		products: [
			{
				id: '',
				name: '',
				description: '',
				retail_price: '',
				product_quantity: '',
				image: ''
			}
		],
		bio: '',
		avatar: ''
	},
	catalog: [
		{
			id: '',
			name: '',
			description: '',
			retail_price: '',
			product_quantity: '',
			image: ''
		}
	],
	access_token: '',
	loggedIn: false
});
export default mainStore;
