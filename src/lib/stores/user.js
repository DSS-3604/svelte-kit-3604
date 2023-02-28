import { writable } from 'svelte/store';

const currentUser = writable({
	username: '',
	access_token: '',
	loggedIn: false
});
export default currentUser;
