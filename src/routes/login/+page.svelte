<script>
	import { goto } from '$app/navigation';
	import mainStore from '$lib/stores/mainStore';
	import { onMount } from 'svelte';
	import { PUBLIC_CLIENT_ID } from '$env/static/public';

	//get google access token from the url and store it in the local storage

	onMount(() => {
		console.log('');
		const urlParams = new URLSearchParams(window.location.href);
		console.log(urlParams);
		const token = urlParams.get('access_token');
		console.log(token); // $mainStore.access_token = token;
		//use the access token to get the user's profile from the google api https://www.googleapis.com/oauth2/v2/userinfo
		fetch(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&oauth_token=${token}&key=${PUBLIC_CLIENT_ID}`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
			});
		// fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}&`)
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((data) => {
		// 		console.log(data);
		// 		$mainStore.user = data;
		// 	});
	});
</script>

looging u in
