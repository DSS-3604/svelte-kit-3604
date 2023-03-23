import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
export { Writable };

type Review = {
	id: string;
	farmer_id: string;
	user_id: string;
	rating: string;
	comment: string;
	timestamp: string;
};
type Comment = {
	id: string;
	product_id: string;
	user_id: string;
	body: string;
	timestamp: string;
};
type Product = {
	id: string;
	farmer_id: string;
	category_id: string;
	name: string;
	description: string;
	image: string;
	retail_price: string;
	wholesale_price: string;
	wholesale_unit_quantity: string;
	total_product_quantity: string;
	farmer_name: string;
	comments: Comment[];
	timestamp: string;
	category_name: string;
};
// type UserInfo = {
// 	username: string;
// 	id: string;
// 	avatar: string;
// 	currency: string;
// 	email: string;
// 	phone: string;
// 	units: string;
// 	address: string;
// 	access: string;
// 	bio: string;
// };
type User = {
	info: {
		username: '';
		id: string;
		avatar: string;
		currency: string;
		email: string;
		phone: string;
		units: string;
		address: string;
		access: string;
		bio: string;
	};
	reviews: Review[];
	products: Product[];
};
type Category = {
	value: string;
	name: string;
};
type MainStore = {
	user: User;
	product_categories: Category[];
	access_token: string;
	access_level: string;
	loggedIn: boolean;
	farmer: User;
	catalog: Product[];
};

const mainStore: Writable<MainStore> = writable({
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
		reviews: [],
		products: []
	},
	product_categories: [],
	access_token: '',
	access_level: '',
	loggedIn: false,
	catalog: [],
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
			access: '',
			bio: ''
		},
		reviews: [],
		products: []
	}
});
export default mainStore;
