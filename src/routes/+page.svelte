<script lang="ts">
	import avatar from '$lib/images/avatar.webp';
	import orange from '$lib/images/orange.webp';
	import mobileBg from '$lib/images/bg-mobile.webp';
	import desktopBg from '$lib/images/bg-desktop.webp';
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		Button,
		Modal,
		Label,
		Input,
		Checkbox
	} from 'flowbite-svelte';
	import SellerCard from '../components/SellerCard.svelte';
	import ProductCard from '../components/ProductCard.svelte';
	import mainStore from '../lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte/internal';
	let formModal = false;

	let loginModal = false;
	const nutritions = [
		{
			id: 0,
			name: 'Calories',
			value: '43',
			unit: 'kcal',
			color: 'red'
		},
		{
			id: 1,
			name: 'Sugar',
			value: '20',
			unit: 'g',
			color: 'yellow'
		},
		{
			id: 3,
			name: 'Carbs',
			value: '20',
			unit: 'g',
			color: 'green'
		}
	];
	let email = '';
	let password = '';
	let username = '';
	let error = '';
	const signUp = async () => {
		error = '';
		let newUser = {
			username: username,
			password: password,
			email: email
		};
		$utils.signUp(newUser).then((res) => {
			if (res) {
				goto('/my-profile');
			} else {
				error = 'username or email already exists';
			}
		});
	};
	const login = async () => {
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
	};
	onMount(() => {
		$utils.fetchProducts();
		$utils.silentLogin().then(() => {
			$utils.fetchProducts();
		});
		$utils.fetchProductCategories().then((res) => {
			$mainStore.product_categories = [
				{
					name: 'All categories',
					value: 'all'
				},
				...$mainStore.product_categories
			];
		});
	});
</script>

<div class="relative">
	<img class="hidden sm:block w-full bg-no-repeat bg-cover" src={desktopBg} alt="" />
	<img class="block sm:hidden w-full bg-no-repeat bg-cover" src={mobileBg} alt="" />
	<div
		class=" text-center dark:text-white text-primary absolute top-1/2 left-1/2 text-2xl font-semibol -translate-x-1/2 -translate-y-1/2 sm:text-4xl lg:text-7xl"
	>
		<div>
			<h1 class="font-extrabold">
				Welcome to Cari<span class="text-orange-400">g</span>ro
			</h1>
			<div class="flex justify-center">
				<button
					on:click={() => (formModal = true)}
					class="text-white text-base lg:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
					>Join Today</button
				>
				<div
					id="g_id_onload"
					data-client_id="336005406595-j1pen5s8ouusrcc59bj0b40m56cv2am0.apps.googleusercontent.com"
					data-context="signup"
					data-callback="login"
					data-auto_select="true"
					data-itp_support="true"
				/>
			</div>
		</div>
	</div>
</div>
<h1 class="text-primary text-center text-3xl m-10 font-semibold">New Products</h1>
<div class="m-5 sm:ml-20 sm:mr-20">
	<div class="overflow-x-auto grid grid-flow-col gap-7">
		{#each $mainStore.catalog.reverse().slice(0, 5) as item}
			<ProductCard
				image={item.image}
				category={item.category_name}
				name={item.name}
				description={item.description}
			/>
		{/each}
	</div>
</div>

{#if !loginModal}
	<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
		<div class="flex flex-col space-y-6">
			<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
				Register to our platform
			</h3>
			<Label class="space-y-2">
				<span>Username</span>
				<Input bind:value={username} type="text" name="username" placeholder="username" required />
			</Label>
			<Label class="space-y-2">
				<span>Email</span>
				<Input
					bind:value={email}
					type="email"
					name="email"
					placeholder="name@company.com"
					required
				/>
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
				on:click={signUp}>Submit</Button
			>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Registered? <a
					on:click={() => (loginModal = true)}
					class="text-blue-700 hover:underline dark:text-blue-500">Sign In</a
				>
			</div>
			<div class="text-sm font-medium text-red-500 dark:text-red-300">
				{error}
			</div>
		</div>
	</Modal>
{:else}
	<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
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
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a
					on:click={() => (loginModal = false)}
					class="text-blue-700 hover:underline dark:text-blue-500">Create account</a
				>
			</div>
			<!-- error message -->
			<div class="text-sm font-medium text-red-500 dark:text-red-300">
				{error}
			</div>
		</div>
	</Modal>
{/if}

<svelte:head>
	<title>Home</title>
</svelte:head>
