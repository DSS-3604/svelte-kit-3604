import { writable } from 'svelte/store';

const currentUser = writable({
	username: '',
	id: '',
	access_token: '',
	loggedIn: false
});
export default currentUser;
