<script lang="ts">
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import {
		Card,
		Rating,
		Textarea,
		RatingComment,
		Avatar,
		Button,
		Badge,
		Modal
	} from 'flowbite-svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Account from '../../account.svelte';
	export let data = {
		id: ''
	};
	export let product = {
		name: '',
		description: '',
		retail_price: '',
		currency: '',
		product_quantity: '',
		image: '',
		farmer_id: '',
		reviews: [
			{
				body: '',
				rating: 0,
				user_id: '',
				product_id: '',
				timestamp: ''
			}
		]
	};

	let btnDefault = 'bg-gray-200';
	let btnActive = 'bg-primary rounded-lg text-white';
	let activeButton = 'about';

	let about_btn_color = btnDefault;
	let reviews_btn_color = btnDefault;
	let post_btn_color = btnDefault;

	const setActive = (btn) => {
		activeButton = btn;
		if (btn === 'about') {
			about_btn_color = btnActive;
			reviews_btn_color = btnDefault;
			post_btn_color = btnDefault;
		} else if (btn === 'review') {
			about_btn_color = btnDefault;
			reviews_btn_color = btnActive;
			post_btn_color = btnDefault;
		} else if (btn === 'post') {
			about_btn_color = btnDefault;
			reviews_btn_color = btnDefault;
			post_btn_color = btnActive;
		}
	};
	let comment = {
		id: '1',
		user: {
			name: 'John Doe',
			img: {
				src: 'avatar.webp',
				alt: 'avatar'
			},
			joined: 'Joined 2 years ago'
		},
		rating: 4,
		total: 5,
		heading: 'Great Product',
		address: 'New York, USA',
		datetime: '2 days ago'
	};
	let popupModal = false;

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
	const updateProducts = () => {
		$utils.updateProduct(product);
	};
	let rate = false;
	let rankingOptions = [
		{
			id: 1,
			color: 'text-gray-300'
		},
		{
			id: 2,
			color: 'text-gray-300'
		},
		{
			id: 3,
			color: 'text-gray-300'
		},
		{
			id: 4,
			color: 'text-gray-300'
		},
		{
			id: 5,
			color: 'text-gray-300'
		}
	];
	let review = {
		user_id: '',
		product_id: '',
		rating: 0,
		body: ''
	};
	const rateProduct = (item) => {
		review.user_id = $mainStore.user.info.id;
		review.product_id = item.id;
		$utils.reviewProduct(review).then(() => {
			$utils.fetchProducts();
		});
	};
	const setRating = (n) => {
		let newList = rankingOptions;
		newList.forEach((option, index) => {
			if (index < n) {
				option.color = 'text-yellow-400';
			} else {
				option.color = 'text-gray-300';
			}
		});
		rankingOptions = newList;
		review.rating = n;
	};
</script>

<div class="flex justify-center items-center text-center">
	<!-- <Modal bind:open={popupModal} size="xl" autoclose>
		<Upload {product} />
	</Modal> -->
</div>
<Modal bind:open={rate} size="xs" autoclose={false} class="w-full">
	<div class="flex flex-col space-y-6 items-center text-center">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Add review</h3>
		<div class="">
			<img class="w-28 h-28" src={product.image} alt="product" />
			<p class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
				{product.name}
			</p>
			<p class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
				by {product.farmer_id}
			</p>
		</div>
		<div class="flex items-center">
			{#each rankingOptions as option}
				<svg
					on:click={() => setRating(option.id)}
					aria-hidden="true"
					class="w-8 h-8 {option.color} hover:cursor-pointer"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><title>star</title><path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					/></svg
				>
			{/each}
		</div>
		<Textarea rows="6" bind:value={review.body} placeholder="Write your review" class="w-full" />
		<Button type="submit" on:click={() => rateProduct(product)} class="w-full">Submit</Button>
	</div>
</Modal>

<div class="m-5">
	<div class="p-4">
		<div class="flex flex-col items-center pb-4">
			<img src={product.image} class="h-48 border" alt="product" />
		</div>

		<div class="flex flex-col items-center">
			<div class="flex mt-4 space-x-3 lg:mt-6">
				<Button on:click={() => (rate = true)}>Review</Button>
			</div>
			<div class="mt-5 w-full">
				<div class="flex bg-gray-200 p-1 rounded-lg w-full">
					<button class="w-full {about_btn_color} py-1" on:click={() => setActive('about')}>
						About
					</button>
					<button class="w-full {reviews_btn_color} py-1" on:click={() => setActive('review')}>
						Reviews
					</button>
				</div>
			</div>
			<div class="mt-5">
				{#if activeButton === 'review'}
					<div class="flex flex-col gap-3">
						{#each product.reviews as item}
							<div class="rounded-lg border p-5">
								<RatingComment {comment} helpfullink="/" abuselink="/">
									<p class="mb-2 font-light text-gray-500 dark:text-gray-400">
										{item.body}
									</p>
									<a
										href="/"
										class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
										>Read more</a
									>
									<svelte:fragment slot="evaluation">19 people found this helpful</svelte:fragment>
								</RatingComment>
							</div>
						{/each}
					</div>
				{:else if activeButton === 'about'}
					<div class="p-5">
						<p class="font-semibold dark:text-white text-center">{product.name}</p>
						<p class="text-gray-500 dark:text-gray-400">
							{product.description}
						</p>
					</div>
					<div class="mt-5 p-5 gap-3 flex flex-col">
						<p class="font-semibold dark:text-white">Details</p>
						<li class="">
							<span class="font-semibold dark:text-white">Name:</span>
							<span class="text-gray-500 dark:text-gray-400">{product.name}</span>
						</li>
						<li>
							<span class="font-semibold dark:text-white">Price:</span>
							<span class="text-gray-500 dark:text-gray-400">{product.description}</span>
						</li>
						<li>
							<span class="font-semibold dark:text-white">Price:</span>
							<span class="text-gray-500 dark:text-gray-400">$ {product.retail_price}</span>
						</li>
						<li>
							<span class="font-semibold dark:text-white">Quantity:</span>
							<span class="text-gray-500 dark:text-gray-400">
								{product.product_quantity}
								{product.currency}
							</span>
						</li>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
