//a class to store functions
import { PUBLIC_API_URL } from '$env/static/public';
import mainStore from '$lib/stores/mainStore';

export default class Service {
	endpoint: string;
	store: any;
	constructor() {
		this.endpoint = PUBLIC_API_URL;
		mainStore.subscribe((value) => {
			this.store = value;
		});
	}
	async fetchUserProducts() {
		return this.fetch(`products/farmer/${this.store.user.info.id}`).then((res) => {
			mainStore.update((store) => {
				store.user.products = res;
				return store;
			});
			return res;
		});
	}

	async fetchProduct(id: string) {
		return this.fetch(`products/${id}`).then((res) => {
			return res;
		});
	}

	async fetchFarmerProducts(id: string) {
		return this.fetch(`products/farmer/${id}`).then((res) => {
			console.log(res);
			mainStore.update((store) => {
				store.farmer.products = res;
				return store;
			});
		});
	}

	async getFarmer(id: string) {
		return this.fetch(`api/users/${id}`).then((res) => {
			mainStore.update((store) => {
				store.farmer.info = res;
				return store;
			});
		});
	}
	async reviewProduct(review: any) {
		return this.post(`product/review`, review).then((res) => {
			if (res) {
				console.log(res);
			}
		});
	}
	async reviewFarmer(review: any) {
		return this.post(`user/review`, review);
	}

	async fetchProducts() {
		return this.fetch('products').then((res) => {
			mainStore.update((store) => {
				store.catalog = res;
				return store;
			});
		});
	}
	async createProduct(product: any) {
		return this.post('products', product).then((res) => {
			console.log(res);
			if (res) {
				//update the store
				mainStore.update((store) => {
					store.user.products.push(product);
					return store;
				});
			}
		});
	}
	async updateProduct(product: any) {
		return this.put(`products/${product.id}`, product).then((res) => {
			if (res) {
				//update the store
				mainStore.update((store) => {
					store.user.products = store.user.products.map((p) => {
						if (p.id === product.id) {
							return product;
						}
						return p;
					});
					return store;
				});
			}
		});
	}
	async login(credentials: { username: string; password: string }) {
		return this.post('auth', credentials).then((res) => {
			console.log(res);
			if (res.access_token) {
				mainStore.update((store) => {
					store.access_token = res.access_token;
					return store;
				});
				localStorage.setItem('access_token', res.access_token);
			}
			return this.identify();
		});
	}
	async identify() {
		return this.fetch('identify').then((res) => {
			console.log('identify', res);
			if (res.id) {
				mainStore.update((store) => {
					store.user.info.username = res.username;
					store.user.info.id = res.id;
					store.access_level = res.access;
					store.loggedIn = true;
					return store;
				});
				return res;
			}
		});
	}

	async signUp(credentials: { username: string; password: string; email: string }) {
		return this.post('api/users', credentials).then((res) => {
			if (res) {
				return this.login({ username: credentials.username, password: credentials.password });
			} else {
				return res;
			}
		});
	}

	async silentLogin(): Promise<any> {
		const token = localStorage.getItem('access_token');
		if (token) {
			mainStore.update((store) => {
				store.access_token = token;
				return store;
			});
			return this.identify();
		}
		return null;
	}
	async fetch(path: string) {
		return fetch(`${this.endpoint}/${path}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${this.store.access_token}`
			}
		})
			.then((res) => {
				const json = res.json();
				console.log(json);
				return json;
			})
			.catch((err) => {
				console.log(err);
			});
	}
	async post(path: string, body: object) {
		return fetch(`${this.endpoint}/${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${this.store.access_token}`
			},
			body: JSON.stringify(body)
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return null;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async put(path: string, body: object) {
		return fetch(`${this.endpoint}/${path}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${this.store.access_token}`
			},
			body: JSON.stringify(body)
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
