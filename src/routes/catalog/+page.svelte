<script lang="ts">
	import avatar from '$lib/images/avatar.webp';
	import { onMount } from 'svelte/internal';
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { PUBLIC_API_URL } from '$env/static/public';
	import {
		Card,
		Button,
		Input,
		ButtonGroup,
		Chevron,
		Select,
		Modal,
		Textarea,
		Label,
		GroupItem
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		$utils.fetchProducts();
		$utils.silentLogin().then(() => {
			$utils.fetchProducts();
		});
		$utils.fetchProductCategories().then((res) => {
			console.log(res);
			$mainStore.product_categories = [
				{
					name: 'All categories',
					value: 'all'
				},
				...$mainStore.product_categories
			];
		});
	});
	let tem = {};
	let query = false;
	let current_filter = 'all';
	const time = (item) => {
		let date = new Date(item);
		// let time = date.toLocaleTimeString();
		let date2 = date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
		return date2;
	};
	let filter = () => {
		console.log(current_filter);
		if (current_filter == 'all') {
			$utils.fetchProducts();
			return;
		}
		$utils.filterProducts(current_filter).then((res) => {
			console.log(res);
		});
	};

	let search = '';
	const doSearch = () => {
		console.log(search);
		if (search == '' || search == null) {
			$utils.fetchProducts();
			return;
		} else {
			$utils.searchProducts(search).then((res) => {
				console.log(res);
			});
		}
	};
	let message = '';
	function myFunction() {
		let form = { product_id: tem.id, message: message };
		console.log(form);
		$utils.submitForm(form).then((res) => {
			console.log(res);
			query = false;
		});
	}
</script>

<div class="m-5">
	<div>
		<p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
			Catalog
		</p>
	</div>
	<div>
		<div>
			<ButtonGroup class="w-full">
				<div class="w-64">
					<Select
						class="rounded-none rounded-l-lg text-gray-900"
						id="wholesale_unit_quantity"
						placeholder="All Category"
						items={$mainStore.product_categories}
						bind:value={current_filter}
						on:change={filter}
					/>
				</div>
				<Input bind:value={search} placeholder="Search" on:keyup={doSearch} />
				<Button on:click={doSearch} color="blue" class="!p-2.5" type="submit">
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
		class="w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-center justify-center"
	>
		{#each $mainStore.catalog as item}
			<Card padding="none" class=" relative flex items-center text-center w-80 shadow-xl p-4">
				<div class="absolute right-3">
					<button on:click={() => goto(`/profile/${item.farmer_id}`)}>
						<img class="w-8 h-8 rounded-full cursor-pointer" src={avatar} alt="farmer" />
					</button>
				</div>
				<div class="absolute left-3">
					<button
						on:click={() => {
							goto(`/products/${item.id}`);
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
				<p class="text-sm">{time(item.timestamp)}</p>
				<div class="px-5">
					<h5 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
						{item.name}
					</h5>
					<p class="text-md tracking-tight text-gray-900 dark:text-gray-200">
						Category: {item.category_name}
					</p>
				</div>
				<div class="text-md tracking-tight dark:text-gray-300">
					<div class="flex justify-between gap-10 p-1">
						<p>Retail: ${item.retail_price}</p>
						<p>Unit: 1</p>
					</div>
					<div class="flex justify-between gap-10 p-1">
						<p class="">Wholesale: ${item.retail_price}</p>
						<p class="">Unit: {item.wholesale_unit_quantity}</p>
					</div>
					<p class="">
						Quantity: {item.total_product_quantity}
					</p>
				</div>
				<Button
					class="w-full"
					color="blue"
					on:click={() => {
						query = true;
						tem = item;
					}}>Query</Button
				>
			</Card>
		{/each}
	</div>
</div>
<Modal bind:open={query} size="xs" autoclose={false} class="w-full">
	<div class="flex flex-col space-y-6">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
			Contact Farmer {tem.farmer_name}
		</h3>
		<Label class="space-y-2">
			<h4>Farmer Name: {tem.farmer_name}</h4>
		</Label>
		<Label class="space-y-2">
			<h4>Product: {tem.name}</h4>
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
		<Button type="submit" class="w-full1" on:click={myFunction}>Submit</Button>
	</div>
</Modal>
<svelte:head>
	<title>Catalog</title>
</svelte:head>
