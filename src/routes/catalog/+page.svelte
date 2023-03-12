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
		DropdownItem,
		Rating,
		Badge
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let products = [];

	onMount(() => {
		$utils.fetchProducts();
		$utils.silentLogin().then(() => {
			$utils.fetchProducts();
		});
	});
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
			<!-- <button class="text-sm dark:text-white bg-slate-500">filter button</button> -->
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
