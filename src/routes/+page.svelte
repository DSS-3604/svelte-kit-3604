<script lang="ts">
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
	import currentUser from '../lib/stores/user';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	let formModal = false;

	const images = [
		{
			id: 0,
			name: 'Cosmic timetraveler',
			imgurl: 'bg.webp',
			attribution: 'cosmic-timetraveler-pYyOZ8q7AII-unsplash.com'
		},
		{
			id: 1,
			name: 'Cosmic timetraveler',
			imgurl: 'https://picsum.photos/2000/800',
			attribution: 'cosmic-timetraveler-pYyOZ8q7AII-unsplash.com'
		}
	];
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
	const login = async () => {
		if (!email || !password) return;
		try {
			const res = await fetch(`${PUBLIC_API_URL}/auth`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					username: username,
					password: password
				})
			});
			const data = await res.json();
			if (data) {
				if (data.access_token) {
					$currentUser.access_token = data.access_token;
					goto('/my-profile');
				}
				console.log(data);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const signUp = async () => {
		if (!email || !password) return;
		try {
			const res = await fetch(`${PUBLIC_API_URL}/api/users/farmer`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: username,
					email: email,
					password: password
				})
			});
			const data = await res.json();
			if (data) {
				console.log(data);
				login();
			}
		} catch (err) {
			console.log(err);
		}
	};
</script>

<div class="relative">
	<img class="hidden sm:block w-full bg-no-repeat bg-cover" src="bg-test.webp" alt="" />
	<img class="block sm:hidden w-full bg-no-repeat bg-cover" src="mobile-bg.webp" alt="" />
	<div
		class=" text-center dark:text-white text-primary absolute top-1/2 left-1/2 text-2xl font-semibol -translate-x-1/2 -translate-y-1/2 sm:text-4xl lg:text-7xl"
	>
		<div>
			<h1 class="font-extrabold">
				Welcome to Cari<span class="text-orange-400">g</span>ro
			</h1>
			<p>some more text</p>
			<div class="flex justify-center">
				<button
					on:click={() => (formModal = true)}
					class="text-white text-base lg:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
					>Join Today</button
				>
			</div>
		</div>
	</div>
</div>
<h1 class="text-primary text-center text-3xl m-10 font-semibold">Top Products</h1>
<div class="m-5 sm:ml-20 sm:mr-20">
	<div class="overflow-x-auto grid grid-flow-col gap-7">
		<ProductCard rating="4" image="orange.webp" {nutritions} name="Oranges" />
		<ProductCard rating="4" image="orange.webp" {nutritions} name="Oranges" />
		<ProductCard rating="4" image="orange.webp" {nutritions} name="Oranges" />
		<ProductCard rating="4" image="orange.webp" {nutritions} name="Oranges" />
		<ProductCard rating="4" image="orange.webp" {nutritions} name="Oranges" />
	</div>
</div>

<h1 class="text-primary text-center text-3xl m-10 font-semibold">Top Sellers</h1>
<div class="m-5 sm:ml-20 sm:mr-20">
	<div class="overflow-x-auto grid grid-flow-col gap-7">
		<SellerCard
			rating="4"
			image="avatar.webp"
			name="John Doe"
			role="Farmer"
			desciption="Lorem ipsum dolor sit amet consectetur adipisicing elit."
		/>
		<SellerCard
			rating="4"
			image="avatar.webp"
			name="John Doe"
			role="Farmer"
			desciption="Lorem ipsum dolor sit amet consectetur adipisicing elit."
		/>
		<SellerCard
			rating="4"
			image="avatar.webp"
			name="John Doe"
			role="Farmer"
			desciption="Lorem ipsum dolor sit amet consectetur adipisicing elit."
		/>
		<SellerCard
			rating="4"
			image="avatar.webp"
			name="John Doe"
			role="Farmer"
			desciption="Lorem ipsum dolor sit amet consectetur adipisicing elit."
		/>
		<SellerCard
			rating="4"
			image="avatar.webp"
			name="John Doe"
			role="Farmer"
			desciption="Lorem ipsum dolor sit amet consectetur adipisicing elit."
		/>
	</div>
</div>
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Username</span>
			<Input bind:value={username} type="text" name="username" placeholder="username" required />
		</Label>
		<Label class="space-y-2">
			<span>Email</span>
			<Input bind:value={email} type="email" name="email" placeholder="name@company.com" required />
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
		<Button type="submit" class="w-full1" on:click={signUp}>Submit</Button>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <a href="/signup" class="text-blue-700 hover:underline dark:text-blue-500"
				>Create account</a
			>
		</div>
	</form>
</Modal>

<!-- <Card padding="none" class="w-80 text-center shadow-xl">
	<div class="flex flex-col items-center p-4">
		<Avatar size="xl" src="avatar.webp" />
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
		<span class="text-sm text-gray-500 dark:text-gray-400">Farmer</span>
		<Rating rating="4" size="18" class="m-2.5">
			<Badge slot="text" class="ml-3">4</Badge>
		</Rating>
		<div class="flex space-x-3">
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
		</div>
	</div>
</Card> -->

<Footer>
	<FooterCopyright href="/" by="Carigro™" year={2023} />
	<FooterLinkGroup
		ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
	>
		<FooterLink href="/">About</FooterLink>
		<FooterLink href="/">Privacy Policy</FooterLink>
		<FooterLink href="/">Licensing</FooterLink>
		<FooterLink href="/">Contact</FooterLink>
	</FooterLinkGroup>
</Footer>
