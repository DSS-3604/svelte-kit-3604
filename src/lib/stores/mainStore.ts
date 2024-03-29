import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
export { Writable };

type QueryReply = {
	id: string;
	query_id: string;
	user_id: string;
	user_name: string;
	body: string;
	timestamp: string;
	updated_timestamp: string;
};
type ContactForm = {
	id: string;
	name: string;
	phone: string;
	email: string;
	message: string;
	timestamp: string;
};
type Query = {
	id: string;
	user_id: string;
	user_name: string;
	product_id: string;
	product_name: string;
	farmer_id: string;
	farmer_name: string;
	phone: string;
	email: string;
	message: string;
	timestamp: string;
};
type Review = {
	id: string;
	farmer_id: string;
	user_id: string;
	user_name: string;
	user_avatar: string;
	farmer_name: string;
	rating: string;
	body: string;
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
	userReviews: Review[];
	reviews: Review[];
	products: Product[];
};
type Category = {
	value: string;
	name: string;
};
type Notification = {
	message: string;
	type: string;
	active: boolean;
};
type MainStore = {
	user: User;
	product_categories: Category[];
	access_token: string;
	access_level: string;
	loggedIn: boolean;
	farmer: User;
	product: Product;
	catalog: Product[];
	userQuery: Query[];
	farmerQuery: Query[];
	contactForm: ContactForm[];
	farmerApplications: any[];
	notification: Notification;
	queryReply: QueryReply[];
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
		userReviews: [],
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
		userReviews: [],
		reviews: [],
		products: []
	},
	product: {
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
	},
	userQuery: [],
	farmerQuery: [],
	contactForm: [],
	farmerApplications: [],
	notification: {
		active: false,
		message: '',
		type: ''
	},
	queryReply: []
});
export default mainStore;
