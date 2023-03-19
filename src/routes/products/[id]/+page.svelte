<script lang="ts">
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { Card, Rating, Textarea, RatingComment, Button, Review } from 'flowbite-svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data = {
		id: ''
	};
	export let product = {
		id: '',
		farmer_id: '',
		category_id: '',
		name: '',
		description: '',
		image: '',
		retail_price: '',
		wholesale_price: '',
		wholesale_unit_quantity: '',
		total_product_quantity: '',
		farmer_name: '',
		comments: [],
		timestamp: '',
		category_name: ''
	};

	let btnDefault = 'bg-gray-200';
	let btnActive = 'bg-primary rounded-lg text-white';
	let activeButton = 'about';

	let about_btn_color = btnDefault;
	let comments_btn_color = btnDefault;

	const setActive = (btn) => {
		activeButton = btn;
		if (btn === 'about') {
			about_btn_color = btnActive;
			comments_btn_color = btnDefault;
		} else if (btn === 'comments') {
			about_btn_color = btnDefault;
			comments_btn_color = btnActive;
		}
	};
	let query = false;

	onMount(() => {
		$utils.fetchProduct(data.id).then((res) => {
			product = res;
			console.log('product', product);
		});
		$utils.silentLogin().then((res) => {
			if ($mainStore.loggedIn) {
				console.log(res);
			} else {
				goto('/');
			}
		});
		setActive('about');
	});
</script>

<div class="m-5">
	<div class="p-4">
		<div class="flex flex-col items-center pb-4">
			<img src={product.image} class="h-48 border" alt="product" />
		</div>

		<div class="flex flex-col items-center">
			<p class="text-2xl font-bold dark:text-white">by {product.farmer_name}</p>
			<div class="flex mt-4 space-x-3 lg:mt-6">
				<Button on:click={() => (query = true)}>Query</Button>
				<Button on:click={() => 'hi'} color="light" class="dark:text-white">Contact</Button>
			</div>
		</div>
		<div class="mt-5 w-full">
			<div class="flex items-center bg-gray-200 p-1 rounded-lg w-full">
				<button class="w-1/2 {about_btn_color} py-1" on:click={() => setActive('about')}>
					About
				</button>
				<button class="w-1/2 {comments_btn_color} py-1" on:click={() => setActive('comments')}>
					Comments
				</button>
			</div>
		</div>
		<div class="mt-5">
			{#if activeButton === 'comments'}
				<div class="flex flex-col gap-3">comments</div>
			{:else if activeButton === 'about'}
				<p class="dark:text-white">Name: {product.name}</p>
				<br />
				<p class="text-gray-500 dark:text-gray-400">
					Description: {product.description}
				</p>
				<div class="mt-5 p-5 gap-3 flex flex-col">
					<p class="font-semibold dark:text-white">Details</p>
					<li class="">
						<span class="font-semibold dark:text-white">Category:</span>
						<span class="text-gray-500 dark:text-gray-400">{product.category_id}</span>
					</li>
					<li>
						<span class="font-semibold dark:text-white">Wholesale price:</span>
						<span class="text-gray-500 dark:text-gray-400">{product.wholesale_price}</span>
					</li>
					<li>
						<span class="font-semibold dark:text-white">Retail Price:</span>
						<span class="text-gray-500 dark:text-gray-400">$ {product.retail_price}</span>
					</li>
					<li>
						<span class="font-semibold dark:text-white">Quantity:</span>
						<span class="text-gray-500 dark:text-gray-400">
							{product.total_product_quantity}
						</span>
					</li>
					<li>
						<span class="font-semibold dark:text-white">Farmer:</span>
						<span class="text-gray-500 dark:text-gray-400">{product.farmer_id}</span>
					</li>
					<li>
						<span class="font-semibold dark:text-white">Wholesale unit:</span>
						<span class="text-gray-500 dark:text-gray-400">{product.wholesale_unit_quantity}</span>
					</li>
				</div>
			{/if}
		</div>
	</div>
</div>
