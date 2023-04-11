//a class to store functions
import { PUBLIC_API_URL } from '$env/static/public';
import mainStore from '$lib/stores/mainStore';
import { main } from '@popperjs/core';

export default class Service {
	endpoint: string;
	store: any;
	constructor() {
		this.endpoint = PUBLIC_API_URL;
		mainStore.subscribe((value) => {
			this.store = value;
		});
	}
	async fetchLogs() {
		return this.fetch('api/logs').then((res) => {
			return res;
		});
	}
	async fetchReports() {
		return this.fetch('api/reports').then((res) => {
			return res;
		});
	}
	async farmerApplicationActions(action: string, id: string) {
		const promise = [];
		if (action === 'approve') {
			promise.push(this.put(`api/farmer_applications/approve/${id}`, { action }));
		} else if (action === 'reject') {
			promise.push(this.put(`api/farmer_applications/reject/${id}`, { action }));
		}
		Promise.all(promise).then((res) => {
			this.getFarmerApplications().then((res) => {
				return res;
			});
		});
	}
	timeConverter(data: string) {
		const dateTime = new Date(data);
		const date = dateTime.toDateString();
		const time = dateTime.toLocaleTimeString();
		return date + ' ' + time;
	}
	async getQueryReply(reply: any, id: string) {
		return this.post(`api/query/${id}/reply`, reply).then((res) => {
			if (res) {
				mainStore.update((store) => {
					store.queryReply = res;
					return store;
				});
			}
			return res;
		});
	}
	async fetchQueryReplies(query_id: string) {
		return this.fetch(`api/query/${query_id}/replies`).then((res) => {
			mainStore.update((store) => {
				store.queryReply = res;
				return store;
			});
			return res;
		});
	}
	async submitForm(form: any) {
		return this.post('api/product_queries', form).then((res) => {
			return res;
		});
	}
	async fetchQueryUser(user_id: string) {
		return this.fetch(`api/product_queries/user/${user_id}`).then((res) => {
			mainStore.update((store) => {
				store.userQuery = res;
				return store;
			});
			return res;
		});
	}
	async fetchQueryFarmer(user_id: string) {
		return this.fetch(`api/product_queries/farmer/${user_id}`).then((res) => {
			mainStore.update((store) => {
				store.farmerQuery = res;
				return store;
			});
			return res;
		});
	}
	async upgradeAccount(message: object) {
		return this.post('api/farmer_applications', message).then((res) => {
			return res;
		});
	}
	async getFarmerApplications() {
		return this.fetch('api/farmer_applications/pending').then((res) => {
			mainStore.update((store) => {
				store.farmerApplications = res;
				return store;
			});
			return res;
		});
	}
	async getMessages(message: any) {
		return this.fetch('api/contact_forms').then((res) => {
			if (res) {
				mainStore.update((store) => {
					store.contactForm = res;
					return store;
				});
			}
			return res;
		});
	}
	async resolveMessage(message: any) {
		return this.put(`api/contact_forms/${message.id}/resolve`, message).then((res) => {
			console.log('this', res);
			if (res) {
				mainStore.update((store) => {
					store.notification = {
						message: 'Message has been resolved',
						type: 'success',
						active: true
					};
					// update the message to resolved
					store.contactForm = store.contactForm.map((item: any) => {
						if (item.id === message.id) {
							item.resolved = true;
						}
						return item;
					});
					return store;
				});
			}
			return res;
		});
	}

	async submitContactForm(message: any) {
		return this.post('api/contact_forms', message).then((res) => {
			if (res) {
				mainStore.update((store) => {
					store.notification = {
						message: 'Your message has been sent',
						type: 'success',
						active: true
					};
					return store;
				});
			}
			return res;
		});
	}
	async fetchTable(name: string) {
		return this.fetch(`api/${name}`).then((res) => {
			return res;
		});
	}
	async downloadTable(name: string) {
		return this.fetchCSV(`api/reports/export/${name}`).then((res) => {
			return res;
		});
	}
	async fetchUserProducts() {
		return this.fetch(`api/products/farmer/${this.store.user.info.id}`).then((res) => {
			console.log('products', res);
			mainStore.update((store) => {
				store.user.products = res;
				return store;
			});
			return res;
		});
	}
	async updateUserInfo(user: any) {
		if (user.username === this.store.user.info.username) {
			delete user.username;
		}
		if (user.email === this.store.user.info.email) {
			delete user.email;
		}
		return this.put(`api/users/${this.store.user.info.id}`, user);
	}

	async fetchUserInfo() {
		return this.fetch(`api/users/${this.store.user.info.id}`).then((res) => {
			mainStore.update((store) => {
				store.user.info = res;
				console.log(res);
				return store;
			});
			return res;
		});
	}
	async filterProducts(filter: any) {
		return this.fetch(`api/products/category/${filter}`).then((res) => {
			if (res.message) {
				mainStore.update((store) => {
					store.catalog = [];
					return store;
				});
			} else {
				mainStore.update((store) => {
					store.catalog = res;
					return store;
				});
			}
			return res;
		});
	}
	async searchProducts(search: any) {
		return this.fetch(`api/products/search/${search}`).then((res) => {
			if (res.message) {
				mainStore.update((store) => {
					store.catalog = [];
					return store;
				});
			} else {
				mainStore.update((store) => {
					store.catalog = res;
					return store;
				});
			}
			return res;
		});
	}

	async fetchProductCategories() {
		return this.fetch(`api/product_categories`).then((res) => {
			if (res.message) {
				mainStore.update((store) => {
					store.product_categories = [];
					return store;
				});
			} else {
				mainStore.update((store) => {
					store.product_categories = res.map((category: any) => {
						return {
							name: category.name,
							value: category.id
						};
					});
					return store;
				});
			}
			return res;
		});
	}

	async fetchProduct(id: string) {
		return this.fetch(`api/products/${id}`).then((res) => {
			mainStore.update((store) => {
				store.product = res;
				return store;
			});
			return res;
		});
	}

	async fetchFarmerProducts(id: string) {
		return this.fetch(`api/products/farmer/${id}`).then((res) => {
			console.log(res);
			mainStore.update((store) => {
				store.farmer.products = res;
				return store;
			});
		});
	}
	async getFarmerReviews(id: string) {
		return this.fetch(`api/farmer/${id}/review`).then((res) => {
			return res;
		});
	}
	async getUserReviews(id: string) {
		return this.fetch(`api/farmer/review/user/${id}`).then((res) => {
			mainStore.update((store) => {
				store.user.reviews = res;
				return store;
			});
			return res;
		});
	}

	async getFarmer(id: string) {
		return this.fetch(`api/users/${id}`).then((res) => {
			mainStore.update((store) => {
				store.farmer.info = res;
				return store;
			});
			return res;
		});
	}
	async reviewProduct(review: any) {
		return this.post(`api/product/review`, review).then((res) => {
			if (res) {
				console.log(res);
			}
		});
	}
	async reviewFarmer(review: any) {
		return this.post(`api/farmer/${review.farmer_id}/review`, review).then((res) => {
			if (res) {
				if (res.message) {
					return new Error(res.message);
				} else {
					mainStore.update((store) => {
						store.farmer.reviews.push(res);
						return store;
					});
				}
			}
		});
	}

	async fetchProducts() {
		return this.fetch('api/products').then((res) => {
			if (res.message) {
				mainStore.update((store) => {
					store.catalog = [];
					return store;
				});
			} else {
				mainStore.update((store) => {
					store.catalog = res;
					return store;
				});
			}
		});
	}

	async createComment(comment: any) {
		return this.post(`api/product/comment`, comment).then((res) => {
			if (res) {
				mainStore.update((store) => {
					store.product.comments.push(res);
					return store;
				});
			}
		});
	}
	async createProduct(product: any) {
		return this.post('api/products', product).then((res) => {
			console.log(res);
			if (res) {
				//update the store
				mainStore.update((store) => {
					store.user.products.push(res);
					return store;
				});
			}
		});
	}
	async updateProduct(product: any) {
		return this.put(`api/products/${product.id}`, product).then((res) => {
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
			} else {
				return null;
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
				if (res.ok) {
					return json;
				} else {
					json.then((res) => {
						if (!res.ok) {
							mainStore.update((store) => {
								store.notification = {
									message: res.message,
									type: 'error',
									active: true
								};
								return store;
							});
						}
						return null;
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	async fetchCSV(path: string) {
		return fetch(`${this.endpoint}/${path}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'text/csv',
				Authorization: `JWT ${this.store.access_token}`
			}
		})
			.then((res) => {
				const json = res.text();
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
					res.json().then((json) => {
						if (!json.ok) {
							mainStore.update((store) => {
								store.notification = {
									message: json.message,
									type: 'error',
									active: true
								};
								return store;
							});
						}
						return null;
					});
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
				if (res.ok) {
					return res.json();
				} else {
					res.json().then((json) => {
						if (!json.ok) {
							mainStore.update((store) => {
								store.notification = {
									message: json.message,
									type: 'error',
									active: true
								};
								return store;
							});
						}
						return null;
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
