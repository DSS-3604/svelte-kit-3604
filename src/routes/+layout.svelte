<script lang="ts">
	import '../app.postcss';
	import { PUBLIC_API_URL } from '$env/static/public';
	import mainStore from '$lib/stores/mainStore';
	import { Chevron, DarkMode } from 'flowbite-svelte';
	import carigro_logo from '$lib/images/carigro-logo.webp';
	import avatar from '$lib/images/avatar.webp';
	import utils from '$lib/stores/utils';
	console.log('mainStore' + $mainStore.user.info.username);
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
	let active = '';
	onMount(() => {
		let url = window.location.href;
		console.log('Pain:', url);
		if (url.includes('my-profile')) {
			active = 'Profile';
		} else if (url.includes('settings')) {
			active = 'Settings';
		} else if (url.includes('report')) {
			active = 'Report';
		} else if (url.includes('contact')) {
			active = 'Contact';
		} else if (url.includes('catalog')) {
			active = 'Catalog';
		} else {
			active = 'Home';
		}
	});
	onMount(() => {
		//preloader
		const preloader = document.querySelector('.preloader-wrapper');
		setTimeout(() => {
			preloader.classList.add('hidden');
		}, 3000);
	});	
</script>

<div class="preloader-wrapper h-screen flex justify-center items-center fixed top-0 left-0 z-50 w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
	<div id="loader" class="preloader" />
	<h1 class="text-xl font-semibold text-white-600/100 dark:text-white ml-2 animate-bounce">
		Page Loaging...
	</h1>
</div>

<div class="sticky top-0 z-40">
	<Navbar let:hidden let:toggle>
		<NavBrand>
			<DarkMode btnClass={darkmodebtn} />
			<img src={carigro_logo} class="mr-3 h-6 sm:h-9 p-0" alt="Carigo Logo" />
		</NavBrand>
		<div class="flex items-center md:order-2">
			<Avatar
				id="profile"
				class="w-full md:flex md:w-auto md:order-1"
				src={$mainStore.user.info.avatar ? $mainStore.user.info.avatar : avatar}
				size="md"
			/>
			<p class="px-2 hidden md:block">{$mainStore.user.info.username}</p>
			<Dropdown triggeredBy="#profile" class="w-44 z-20">
				<DropdownDivider />
				<DropdownItem on:click={signOut}>Sign out</DropdownItem>
				<DropdownDivider />
			</Dropdown>
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden}>
			<NavLi active={active == 'Home' ? true : false} href="/" on:click={() => (active = 'Home')}
				>Home</NavLi
			>
			<NavLi
				active={active == 'Catalog' ? true : false}
				href="/catalog"
				on:click={() => (active = 'Catalog')}>Catalog</NavLi
			>
			<NavLi
				active={active == 'Contact' ? true : false}
				href="/contact"
				on:click={() => (active = 'Contact')}>Contact</NavLi
			>
			<NavLi
				active={active == 'Profile' ? true : false}
				href="/my-profile"
				on:click={() => (active = 'Profile')}>Profile</NavLi
			>
			<NavLi
				active={active == 'Report' ? true : false}
				href="/report"
				on:click={() => (active = 'Report')}>Report</NavLi
			>
			<NavLi
				active={active == 'Settings' ? true : false}
				href="/settings"
				on:click={() => (active = 'Settings')}>Settings</NavLi
			>
		</NavUl>
	</Navbar>
</div>

<slot />

<svelte:head>
	<title>Home</title>
</svelte:head>

<style>
	.preloader {
		width: 100px;
		height: 100px;
		border: 5px solid #333;
		border-radius: 50%;
		border-top-color: transparent;
		animation: spin 1s linear infinite;
	}
	/* 
	#preloader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	} */
	#loader {
		display: block;
		position: relative;
		width: 150px;
		height: 150px;
		border-radius: 50%;
		border: 3px solid transparent;
		border-top-color: #7bb516;
		-webkit-animation: spin 2s linear infinite;
		animation: spin 2s linear infinite;
	}
	#loader:before {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		right: 5px;
		bottom: 5px;
		border-radius: 50%;
		border: 3px solid transparent;
		border-top-color: #f86104;
		-webkit-animation: spin 3s linear infinite;
		animation: spin 3s linear infinite;
	}
	#loader:after {
		content: '';
		position: absolute;
		top: 15px;
		left: 15px;
		right: 15px;
		bottom: 15px;
		border-radius: 50%;
		border: 3px solid transparent;
		border-top-color: #5c7e00;
		-webkit-animation: spin 1.5s linear infinite;
		animation: spin 1.5s linear infinite;
	}
	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>
