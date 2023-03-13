<script lang="ts">
	import { onMount } from 'svelte/internal';
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { PUBLIC_API_URL } from '$env/static/public';
	import {
		Card,
		Button,
		Input,
		InputAddon,
		ButtonGroup,
		Chevron,
		Dropdown,
		Modal,
		DropdownItem,
		Rating,
		Textarea,
		Badge
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let products = [];
	let rate = false;
	let itemToRate = {
		id: 0,
		name: '',
		image: '',
		farmer_id: 0,
		rating: 0,
		reviews: []
	};
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

	onMount(() => {
		$utils.fetchProducts();
		$utils.silentLogin().then(() => {
			$utils.fetchProducts();
		});
	});
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

<div class="m-5">
	<div>
		<p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
			Products
		</p>
	</div>
	<div>
		<div>
			<ButtonGroup class="w-full">
				<Button
					color="none"
					class="flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
				>
					<Chevron>All categories</Chevron>
				</Button>
				<Dropdown>
					<DropdownItem>Vegetables</DropdownItem>
					<DropdownItem>Fruits</DropdownItem>
				</Dropdown>
				<Input placeholder="Search" />
				<Button color="blue" class="!p-2.5" type="submit">
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</Button>
			</ButtonGroup>
		</div>
	</div>
	<br />
	<div>
		<div class="flex justify-between">
			<p class="text-sm dark:text-white">Showing list 1-10 of 28 results</p>
		</div>
	</div>
	<br />
	<div
		class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-center justify-center gap-3"
	>
		{#each $mainStore.catalog as item}
			<Card padding="none" class=" relative flex items-center text-center w-80 shadow-xl p-4">
				<div class="absolute right-3">
					<button on:click={() => goto(`/profile/${item.farmer_id}`)}>
						<img class="w-8 h-8 rounded-full cursor-pointer" src="avatar.webp" alt="farmer" />
					</button>
				</div>
				<div class="absolute left-3">
					<button
						on:click={() => {
							itemToRate = item;
							rate = true;
						}}
					>
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
								d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
							/>
						</svg>
					</button>
				</div>
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
</div>
<Modal bind:open={rate} size="xs" autoclose={false} class="w-full">
	<div class="flex flex-col space-y-6 items-center text-center">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Add review</h3>
		<div class="">
			<img class="w-28 h-28" src={itemToRate.image} alt="product" />
			<p class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
				{itemToRate.name}
			</p>
			<p class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
				by {itemToRate.farmer_id}
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
		<Button type="submit" on:click={() => rateProduct(itemToRate)} class="w-full">Submit</Button>
	</div>
</Modal>
