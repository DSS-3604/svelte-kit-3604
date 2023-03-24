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
	let active="";
	onMount(() => {
		let url = window.location.href;
		console.log("Pain:",url);
		if (url.includes('my-profile')) {
			active = 'Profile';
		} else if (url.includes('settings')) {
			active = 'Settings';
		} else if (url.includes('report')) {
			active = 'Report';
		} else if (url.includes('contact')) {
			active = 'Contact';
		}else if (url.includes('catalog')) {
			active = 'Catalog';
		}else {
			active = 'Home';
		}
	});



</script>

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
			<NavLi active={active=="Home"?true:false} href="/" on:click={() => active="Home"}>Home</NavLi>
			<NavLi active={active=="Catalog"?true:false} href="/catalog" on:click={() => active="Catalog"}>Catalog</NavLi>
			<NavLi active={active=="Contact"?true:false} href="/contact" on:click={() => active="Contact"}>Contact</NavLi>
			<NavLi active={active=="Profile"?true:false} href="/my-profile" on:click={() => active="Profile"}>Profile</NavLi>
			<NavLi active={active=="Report"?true:false} href="/report" on:click={() => active="Report"}>Report</NavLi>
			<NavLi active={active=="Settings"?true:false} href="/settings" on:click={() => active="Settings"}>Settings</NavLi>
		</NavUl>
	</Navbar>
</div>

<slot />

<svelte:head>
	<title>Home</title>
</svelte:head>
