<script lang="ts">
	import avatar from '$lib/images/avatar.webp';
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { Progressbar, Card, Textarea, RatingComment, Button, Avatar } from 'flowbite-svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { comment } from 'postcss';
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
	let predictions_btn_color = btnDefault;

	const setActive = (btn) => {
		activeButton = btn;
		if (btn === 'about') {
			about_btn_color = btnActive;
			comments_btn_color = btnDefault;
			predictions_btn_color = btnDefault;
		} else if (btn === 'comments') {
			about_btn_color = btnDefault;
			comments_btn_color = btnActive;
			predictions_btn_color = btnDefault;
		} else if (btn === 'predictions') {
			about_btn_color = btnDefault;
			comments_btn_color = btnDefault;
			predictions_btn_color = btnActive;
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
	let commentToPost = {
		user_id: '',
		product_id: data.id,
		body: ''
	};
	const commentProduct = () => {
		commentToPost.user_id = $mainStore.user.info.id;
		$utils.createComment(commentToPost).then((res) => {
			commentToPost.body = '';
			console.log(res);
		});
	};
	const time = (item) => {
		let date = new Date(item);
		let date2 = date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
		return date2;
	};
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
</script>

<div class="m-5">
	<div class="p-4">
		<div class="flex flex-col items-center pb-4">
			<img src={product.image} class="h-48" alt="product" />
		</div>

		<div class="flex flex-col items-center">
			<p class="text-xl font-bold dark:text-white">{product.name}</p>
			<p class="text-xl font-bold dark:text-white">by {product.farmer_name}</p>
			<div class="flex mt-4 space-x-3 lg:mt-6">
				<Button on:click={() => (query = true)}>Query</Button>
				<Button on:click={() => 'hi'} color="light" class="dark:text-white">Contact</Button>
			</div>
		</div>
		<div class="mt-5 w-full">
			<div class="flex items-center bg-gray-200 p-1 rounded-lg w-full">
				<button class="w-1/3 {about_btn_color} py-1" on:click={() => setActive('about')}>
					About
				</button>
				<button class="w-1/3 {comments_btn_color} py-1" on:click={() => setActive('comments')}>
					Comments
				</button>
				<button
					class="w-1/3 {predictions_btn_color} py-1"
					on:click={() => setActive('predictions')}
				>
					Predictions
				</button>
			</div>
		</div>
		<div class="mt-5">
			{#if activeButton === 'comments'}
				<div class="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
					{#each $mainStore.product.comments as item}
						<Card padding="none" class="flex relative w-80 h-64 shadow-xl p-3">
							<div class="flex gap-4 p-1">
								<Avatar size="sm" src={avatar} />
								<p class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
									{item.user_id}
								</p>
							</div>
							<p class="p-1">{time(item.timestamp)}</p>
							<p class="text-md dark:text-gray-300 p-1 break-words overflow-y-auto">
								{item.body}
							</p>
							<Button class="absolute bottom-2 right-2">Reply</Button>
						</Card>
					{/each}
					<div class="border sticky bottom-0 dark:bg-gray-800 bg-white p-2 rounded-lg w-80 ">
						<div class="flex flex-col items-center gap-2 text-center">
							<div class="flex gap-10 p-1">
								<h3 class="text-lg font-medium text-gray-900 dark:text-white">Add Comment</h3>
							</div>
							<Textarea
								rows="6"
								bind:value={commentToPost.body}
								placeholder="Write your review"
								class="w-full"
							/>
							<Button type="submit" on:click={commentProduct} class="w-full">Submit</Button>
						</div>
					</div>
				</div>
			{:else if activeButton === 'about'}
				<div class="flex flex-col gap-10 text-center items-center justify-center">
					<Card size="xl">
						<div class="grid grid-cols-3 gap-10">
							<p class="text-xl font-semibold text-white-600/100 dark:text-white">
								Name: {product.name}
							</p>
							<p class="text-xl font-semibold text-white-600/100 dark:text-white">
								Category: {product.category_name}
							</p>
							<p class="text-xl font-semibold text-white-600/100 dark:text-white">
								Wholesale price: {product.wholesale_price}
							</p>
							<p class="text-xl font-semibold text-white-600/100 dark:text-white">
								Wholesale unit quantity: {product.wholesale_unit_quantity}
							</p>
							<p class="text-xl font-semibold text-white-600/100 dark:text-white">
								Retail Price: {product.retail_price}
							</p>
							<p class="text-xl font-semibold text-white-600/100 dark:text-white">
								Quantity: {product.total_product_quantity}
							</p>
						</div>
						<Card size="xl" class="mt-3">
							{#if product.description === ''}
								<p class="text-xl font-semibold text-white-600/100 dark:text-white">
									Description: A {product.name} is a {product.category_name} grown by {product.farmer_name}. There are {product.wholesale_unit_quantity} {product.name} in quantity for ${product.wholesale_price} wholesale and ${product.retail_price} retail.
								</p>
							{:else}
								<p class="text-xl font-semibold text-white-600/100 dark:text-white">
									Description: {product.description}
								</p>
							{/if}
						</Card>
					</Card>
				</div>
				<hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
				<div class="grid grid-cols-3 gap-10">
					{#each nutritions as item}
						<div class="my-4 progress">
							<div class="dark:text-white un-progress">
								<p class="font-bold">{item.value} g</p>
								<p>{item.name}</p>
							</div>
							<Progressbar progress={item.value} color={item.color} class="mt-3" />
						</div>
					{/each}
				</div>
			{:else if activeButton === 'predictions'}
				<div class="flex flex-col">
					<h1>Predictions</h1>
				</div>
			{/if}
		</div>
	</div>
</div>

<svelte:head>
	<title>{$mainStore.product.name}</title>
</svelte:head>
