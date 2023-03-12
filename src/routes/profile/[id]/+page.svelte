<script lang="ts">
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	export let data;
	import { Card, Rating, RatingComment, Avatar, Button, Badge } from 'flowbite-svelte';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		$utils.getFarmer(data.id).then((res) => {
			console.log(res);
		});
		$utils.silentLogin().then((res) => {
			$utils.fetchFarmerProducts(data.id).then((res) => {
				console.log(res);
			});
		});
		setActive('about');
	});
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
				<Button>Add friend</Button>
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
					<p class="text-sm text-gray-500 dark:text-gray-400">4.38</p>
				</div>
				<div class="flex flex-col items-center">
					<p class="text-xl font-semibold text-gray-900 dark:text-white">0</p>
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
			<div class="mt-5">
				{#if activeButton === 'post'}
					<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
						{#each $mainStore.farmer.products as item}
							<Card padding="none" class="flex items-center text-center w-80 shadow-xl p-4">
								<img class="p-2 rounded-t-lg h-36" src={item.image} alt="product 1" />
								<div class="px-5">
									<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
										{item.name}
									</h5>
									<Rating rating="4" size="18" class="m-2.5">
										<Badge slot="text" class="ml-3">4</Badge>
									</Rating>
								</div>
								<p class="text-xl dark:text-gray-300 p-1">{item.description}</p>
								<div class="flex justify-between gap-10 p-1">
									<p class="text-lg dark:text-gray-300">Price: ${item.retail_price}</p>
									<p class="text-lg dark:text-gray-300">Quantity: {item.product_quantity}</p>
								</div>
								<Button class="w-full" color="blue">Query</Button>
							</Card>
						{/each}
					</div>
				{:else if activeButton === 'review'}
					<div class="flex flex-col gap-3">
						<div class="rounded-lg border p-5">
							<RatingComment {comment} helpfullink="/" abuselink="/">
								<p class="mb-2 font-light text-gray-500 dark:text-gray-400">
									This is my third Invicta Pro Diver. They are just fantastic value for money. This
									one arrived yesterday and the first thing I did was set the time, popped on an
									identical strap from another Invicta and went in the shower with it to test the
									waterproofing.... No problems.
								</p>
								<a
									href="/"
									class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
									>Read more</a
								>
								<svelte:fragment slot="evaluation">19 people found this helpful</svelte:fragment>
							</RatingComment>
						</div>
						<div class="rounded-lg border p-5">
							<RatingComment {comment} helpfullink="/" abuselink="/">
								<p class="mb-2 font-light text-gray-500 dark:text-gray-400">
									This is my third Invicta Pro Diver. They are just fantastic value for money. This
									one arrived yesterday and the first thing I did was set the time, popped on an
									identical strap from another Invicta and went in the shower with it to test the
									waterproofing.... No problems.
								</p>
								<a
									href="/"
									class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
									>Read more</a
								>
								<svelte:fragment slot="evaluation">19 people found this helpful</svelte:fragment>
							</RatingComment>
						</div>
					</div>
				{:else if activeButton === 'about'}
					<div class=" rounded-lg p-5 border">
						<p class="font-semibold dark:text-white">Bio</p>
						<p class="text-gray-500 dark:text-gray-400">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, impedit,
							aspernatur sapiente deleniti aperiam ad expedita quis quae voluptatem pariatur ducimus
							accusantium
						</p>
					</div>
					<div class=" rounded-lg mt-5 p-5 border">
						<p class="font-semibold dark:text-white">Contact</p>
						<div class="flex flex-col gap-2 text-gray-500 dark:text-gray-400">
							<div class="flex justify-between ">
								<p>Phone</p>
								<p class="">123123123123</p>
							</div>
							<div class="flex justify-between">
								<p>Address</p>
								<p>123123123123</p>
							</div>
							<div class="flex justify-between">
								<p>Email</p>
								<p>something@gmail.com</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
<!-- <div class="hidden md:block w-full">
	<div class="flex justify-around items-center">
		<div>
			<img src="avatar.webp" class="w-full max-h-80" alt="avatar" />
		</div>
		<div>
			<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
			<span class="text-sm text-gray-500 dark:text-gray-400">Farmer</span>
			<div class="flex mt-4 space-x-3 lg:mt-6">
				<Button>Add friend</Button>
				<Button color="light" class="dark:text-white">Message</Button>
			</div>
		</div>
	</div> -->
<!-- </div> -->
