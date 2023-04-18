<script lang="ts">
	import '../app.postcss';
	import { PUBLIC_API_URL } from '$env/static/public';
	import mainStore from '$lib/stores/mainStore';
	import { Chevron, DarkMode } from 'flowbite-svelte';
	import carigro_logo from '$lib/images/carigro-logo.webp';
	import avatar from '$lib/images/avatar.webp';
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
		Alert,
		Avatar,
		Modal,
		Input,
		Label,
		Checkbox,
		Button,
		Footer,
		FooterLink,
		FooterLinkGroup,
		FooterCopyright
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let placement = 'bottom';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 m-1 z-50';

	const signOut = () => {
		localStorage.removeItem('access_token');
		window.location.href = '/';
	};
	let signInModal = false;
	let active = '';
	onMount(() => {
		let url = window.location.href;
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
		// preloader;
		const preloader = document.querySelector('.preloader-wrapper');
		setTimeout(() => {
			preloader.classList.add('hidden');
		}, 1500);
	});
	let password = '';
	let username = '';
	let error = '';
	const login = async () => {
		if (username == '' || password == '') {
			alert(
				'Please fill in the form correctly. Ensure both username and password fields are filled in.'
			);
		}
		error = '';
		let user = {
			username: username,
			password: password
		};
		$utils.login(user).then((res) => {
			if (res) {
				goto('/my-profile');
			} else {
				error = 'username or password is incorrect';
			}
		});
		signInModal = false;
	};
</script>

<div
	class="preloader-wrapper h-screen flex justify-center items-center fixed top-0 left-0 z-50 w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
>
	<div id="loader" class="preloader" />
	<h1 class="text-xl font-semibold text-white-600/100 dark:text-white ml-2 animate-bounce">
		Page Loading...
	</h1>
</div>

<div class="sticky top-0 z-40">
	<Navbar let:hidden let:toggle>
		<NavBrand>
			<DarkMode btnClass={darkmodebtn} />
			<img
				src={carigro_logo}
				on:click={() => goto('/')}
				class="mr-3 h-6 sm:h-9 p-0"
				alt="Carigo Logo"
			/>
		</NavBrand>
		<div class="flex items-center md:order-2">
			<p class="px-2">{$mainStore.user.info.username}</p>
			<Avatar
				id="profile"
				class="w-full md:flex md:w-auto md:order-1 hover:cursor-pointer"
				src={$mainStore.user.info.avatar ? $mainStore.user.info.avatar : avatar}
				size="md"
			/>
			<Dropdown triggeredBy="#profile" class="w-44 z-20">
				{#if $mainStore.loggedIn}
					<DropdownItem on:click={() => goto('/my-profile')}>Profile</DropdownItem>
					<DropdownItem on:click={() => goto('/settings')}>Settings</DropdownItem>
					<DropdownItem>
						<p class="capitalize">
							Type:
							<span class="text-primary font-bold">{$mainStore.access_level}</span>
						</p>
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem on:click={signOut}>Sign out</DropdownItem>
					<DropdownDivider />
				{:else}
					<DropdownDivider />
					<DropdownItem on:click={() => (signInModal = true)}>Sign in</DropdownItem>
					<DropdownDivider />
				{/if}
			</Dropdown>
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden}>
			<NavLi active={active === 'Home'} href="/" on:click={() => (active = 'Home')}>Home</NavLi>
			<NavLi active={active === 'Catalog'} href="/catalog" on:click={() => (active = 'Catalog')}
				>Catalog</NavLi
			>
			<NavLi active={active === 'Contact'} href="/contact" on:click={() => (active = 'Contact')}
				>Contact</NavLi
			>
			{#if $mainStore.access_level === 'admin'}
				<NavLi active={active === 'Admin'} href="/admin" on:click={() => (active = 'Admin')}
					>Admin</NavLi
				>
			{/if}
		</NavUl>
	</Navbar>
</div>
{#if $mainStore.notification && $mainStore.notification.active ? setTimeout(() => {
			$mainStore.notification.active = false;
	  }, 3000) : null}
	<div class="relative z-50">
		<div class="w-80 fixed top-15 right-5">
			{#if $mainStore.notification.type === 'success'}
				<Alert dismissable color="green">
					<span slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</span>
					<span class="font-medium">{$mainStore.notification.message}</span>
				</Alert>
			{:else}
				<Alert dismissable color="red">
					<span slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</span>
					<span class="font-medium">{$mainStore.notification.message}</span>
				</Alert>
			{/if}
		</div>
	</div>
{/if}

<slot />

<Footer
	class="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600"
>
	<FooterCopyright href="/" by="Carigro™" year={2023} />
	<FooterLinkGroup
		ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
	>
		<FooterLink href="/contact">Contact</FooterLink>
	</FooterLinkGroup>
</Footer>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Modal bind:open={signInModal} size="xs" autoclose={false} class="w-full">
	<div class="flex flex-col space-y-6">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Username</span>
			<Input bind:value={username} type="text" name="username" placeholder="username" required />
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input bind:value={password} type="password" name="password" placeholder="•••••" required />
		</Label>
		<div class="flex items-start">
			<Checkbox>Remember me</Checkbox>
			<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
				>Lost password?</a
			>
		</div>
		<Button
			type="submit"
			class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
			color="lime"
			on:click={login}>Submit</Button
		>
	</div>
</Modal>

<style>
	.preloader {
		width: 100px;
		height: 100px;
		border: 5px solid #333;
		border-radius: 50%;
		border-top-color: transparent;
		animation: spin 1s linear infinite;
	}
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
