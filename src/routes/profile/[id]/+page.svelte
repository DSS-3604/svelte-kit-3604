<script lang="ts">
	import darkVeg from '$lib/images/dark-veg.png';
	import avatar from '$lib/images/avatar.webp';
	import DisplayReview from '../../../components/DisplayReview.svelte';
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	export let data;
	import { Card, Rating, Label, Avatar, Button, Badge, Textarea, Modal } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import NoItems from '../../../components/NoItems.svelte';
	import { goto } from '$app/navigation';
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
		user_id: $mainStore.user.info.id,
		farmer_id: data.id,
		rating: 0,
		body: ''
	};
	const rateFarmer = () => {
		review.user_id = $mainStore.user.info.id;
		$utils.reviewFarmer(review).then((res) => {
			review.body = '';
			setRating(0);
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
	let averageRating = '0';
	let product = {};
	let message = '';
	let query = false;
	function myFunction() {
		let form = { product_id: product.id, message: message };
		$utils.submitForm(form).then((res) => {
			query = false;
			product = {};
			message = '';
		});
	}

	onMount(async () => {
		$utils.getFarmer(data.id).then((res) => {});
		if (!$mainStore.loggedIn) {
			if ($mainStore.user.info.id == data.id) {
				goto('/my-profile');
			}
			$utils.silentLogin().then((res) => {
				$utils.fetchFarmerProducts(data.id).then((res) => {});
				$utils.getFarmerReviews(data.id).then((res) => {
					$mainStore.farmer.reviews = res;
					let total = 0;
					let count = 0;
					for (let i = 0; i < $mainStore.farmer.reviews.length; i++) {
						total = total + parseInt($mainStore.farmer.reviews[i].rating);
						count++;
					}
					if (count > 0) {
						averageRating = (total / count).toFixed(1);
					} else {
						averageRating = '0';
					}
				});
			});
		} else {
			if ($mainStore.user.info.id == data.id) {
				goto('/my-profile');
			}
			$utils.fetchFarmerProducts(data.id).then((res) => {});
			$utils.getFarmerReviews(data.id).then((res) => {
				$mainStore.farmer.reviews = res;
				let total = 0;
				let count = 0;
				for (let i = 0; i < $mainStore.farmer.reviews.length; i++) {
					total = total + parseInt($mainStore.farmer.reviews[i].rating);
					count++;
				}
				if (count > 0) {
					averageRating = (total / count).toFixed(1);
				} else {
					averageRating = '0';
				}
			});
		}
		setActive('about');
	});
	const time = (item) => {
		let date = new Date(item);
		let date2 = date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
		return date2;
	};
</script>

<div class="m-5">
	<div class="p-4">
		<div class="flex flex-col items-center pb-4">
			<Avatar size="xl" src={$mainStore.farmer.info.avatar} />
			<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
				{$mainStore.farmer.info.username}
			</h5>
			<span class="text-sm text-gray-500 dark:text-gray-400">Farmer</span>
			<div class="flex mt-4 space-x-3 lg:mt-6">
				<Button class="dark:text-white bg-primary-light" color="lime">Report</Button>
				<Button color="light" class="dark:text-white">Message</Button>
			</div>
		</div>
		<div class="flex flex-col items-center">
			<div class="flex space-x-12">
				<div class="flex flex-col items-center">
					<p class="text-xl font-semibold text-gray-900 dark:text-white">
						{$mainStore.farmer.products.length}
					</p>
					<p class="text-sm text-gray-500 dark:text-gray-400">Posts</p>
				</div>
				<div class="text-blue-500">
					<svg
						aria-hidden="true"
						class="w-7 h-7 text-yellow-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><title>First star</title><path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						/></svg
					>
					<p class="text-sm text-gray-500 dark:text-gray-400 ml-1.5">{averageRating}</p>
				</div>
				<div class="flex flex-col items-center">
					<p class="text-xl font-semibold text-gray-900 dark:text-white">
						{$mainStore.farmer.reviews.length}
					</p>
					<p class="text-sm text-gray-500 dark:text-gray-400">Reviews</p>
				</div>
			</div>
			<div class="mt-5 w-full">
				<div class="flex items-center bg-gray-200 p-1 rounded-lg w-full">
					<button class="w-1/3 {post_btn_color} py-1" on:click={() => setActive('post')}>
						Posts
					</button>
					<button class="w-1/3 {about_btn_color} py-1" on:click={() => setActive('about')}>
						About
					</button>
					<button class="w-1/3 {reviews_btn_color} py-1" on:click={() => setActive('review')}>
						Reviews
					</button>
				</div>
			</div>
			{#if activeButton === 'post'}
				{#if $mainStore.farmer.products.length === 0}
					<NoItems name="products" image={darkVeg} />
				{/if}
				<div class="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{#each $mainStore.farmer.products as item}
						<Card
							padding="none"
							class="flex items-center text-center w-80 shadow-xl p-4 border-solid border-white "
						>
							<img class="p-2 rounded-t-lg h-36" src={item.image} alt="product 1" />
							<p>{time(item.timestamp)}</p>
							<div class="px-5">
								<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
									{item.name}
								</h5>
							</div>
							<p class="text-xl dark:text-gray-300 p-1">Description: {item.description}</p>
							<div class="flex justify-between gap-10 p-1">
								<p class="text-lg dark:text-gray-300">Retail: ${item.retail_price}</p>
								<p class="text-lg dark:text-gray-300">Wholesale: ${item.retail_price}</p>
							</div>
							<div class="flex justify-between gap-10 p-1">
								<p class="text-lg dark:text-gray-300">
									Quantity: {item.total_product_quantity}
								</p>
								<p class="text-lg dark:text-gray-300">Unit: {item.wholesale_unit_quantity}</p>
							</div>
							<Button
								class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
								color="lime"
								on:click={() => {
									product = item;
									query = true;
								}}>Query</Button
							>
						</Card>
					{/each}
				</div>
			{:else if activeButton === 'review'}
				<div class="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<Card class="w-80 h-64 border-solid border-white">
						<div class="flex flex-col items-center gap-2 text-center">
							<div class="flex gap-10">
								<h3 class="text-md font-medium text-gray-900 dark:text-white">Add review</h3>
								<div class="flex items-center">
									{#each rankingOptions as option}
										<svg
											on:click={() => setRating(option.id)}
											aria-hidden="true"
											class="w-7 h-7 {option.color} hover:cursor-pointer"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><title>star</title><path
												d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
											/></svg
										>
									{/each}
								</div>
							</div>
							<Textarea
								rows="5"
								bind:value={review.body}
								placeholder="Write your review"
								class="w-full"
							/>
							<Button
								type="submit"
								on:click={rateFarmer}
								class="w-full dark:text-white bg-primary-light"
								color="lime">Submit</Button
							>
						</div>
					</Card>
					{#each $mainStore.farmer.reviews as item}
						<DisplayReview {item} />
					{/each}
				</div>
			{:else if activeButton === 'about'}
				<div class="mt-5 flex flex-col w-full">
					<div class=" rounded-lg p-5 border">
						<p class="font-semibold dark:text-white">Bio</p>
						<p class="text-gray-500 dark:text-gray-400">{$mainStore.farmer.info.bio}</p>
					</div>
					<div class=" rounded-lg mt-5 p-5 border">
						<p class="font-semibold dark:text-white">Contact</p>
						<div class="flex flex-col gap-2 text-gray-500 dark:text-gray-400">
							<div class="flex justify-between">
								<p>Phone</p>
								<p class="">{$mainStore.farmer.info.phone}</p>
							</div>
							<div class="flex justify-between">
								<p>Address</p>
								<p>{$mainStore.farmer.info.address}</p>
							</div>
							<div class="flex justify-between">
								<p>Email</p>
								<p>{$mainStore.farmer.info.email}</p>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
<Modal bind:open={query} size="xs" autoclose={false} class="w-full">
	<div class="flex flex-col space-y-6">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
			Contact Farmer {product.farmer_name}
		</h3>
		<Label class="space-y-2">
			<h4>Farmer Name: {product.farmer_name}</h4>
		</Label>
		<Label class="space-y-2">
			<h4>Product: {product.name}</h4>
		</Label>
		<Label class="space-y-2">
			<h4>Message:</h4>
			<Textarea
				bind:value={message}
				name="message"
				placeholder="I would like to buy this product."
				required
			/>
		</Label>
		<Button
			type="submit"
			class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
			color="lime"
			on:click={myFunction}>Submit</Button
		>
	</div>
</Modal>
<svelte:head>
	<title>{$mainStore.farmer.info.username}</title>
</svelte:head>
