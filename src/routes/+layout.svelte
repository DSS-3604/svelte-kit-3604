<script lang="ts">
	import '../app.postcss';
	import { PUBLIC_API_URL } from '$env/static/public';
	import mainStore from '$lib/stores/mainStore';
	import { Chevron, DarkMode } from 'flowbite-svelte';
	import utils from '$lib/stores/utils';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Tooltip,
		Avatar
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	let placement = 'bottom';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 m-1 z-50';

	const signOut = () => {
		localStorage.removeItem('access_token');
		window.location.href = '/';
	};
	// onMount(async () => {
	// 	//check if access token is valid
	// 	let token = localStorage.getItem('access_token');
	// 	if (!token) {
	// 		console.log('no token');
	// 	} else {
	// 		$mainStore.access_token = token;
	// 		await $utils.identify().then((res: any) => {
	// 			if (res !== null) {
	// 				if (res.username !== null) {
	// 					$mainStore.loggedIn = true;
	// 					console.log('logged in');
	// 				}
	// 			}
	// 		});
	// 	}
	// });
</script>

<div class="sticky top-0 z-40">
	<Navbar let:hidden let:toggle>
		<NavBrand>
			<DarkMode btnClass={darkmodebtn} />
			<img src="carigro-logo.webp" class="mr-3 h-6 sm:h-9 p-0" alt="Carigo Logo" />
		</NavBrand>
		<div class="flex items-center md:order-2">
			<Avatar
				id="profile"
				class="w-full md:flex md:w-auto md:order-1"
				src="avatar.webp"
				size="md"
			/>
			<Dropdown triggeredBy="#profile" class="w-44 z-20">
				<DropdownItem href="/my-profile">Profile</DropdownItem>
				<DropdownItem href="/settings">Settings</DropdownItem>
				<DropdownItem>Earnings</DropdownItem>
				<DropdownDivider />
				<DropdownItem on:click={signOut}>Sign out</DropdownItem>
			</Dropdown>
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden}>
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/catalog">Catalog</NavLi>
			<NavLi href="/my-products">Products</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</div>

<slot />

<svelte:head>
	<title>Home</title>
</svelte:head>
