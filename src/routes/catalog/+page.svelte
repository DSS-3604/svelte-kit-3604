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
		if (current_filter == 'all') {
			$utils.fetchProducts();
			return;
		}
		$utils.filterProducts(current_filter);
	};

	let search = '';
	const doSearch = () => {
		if (search == '' || search == null) {
			$utils.fetchProducts();
			return;
		} else {
			$utils.searchProducts(search);
		}
	};
	let message = '';
	function myFunction() {
		let form = { product_id: tem.id, message: message };
		$utils.submitForm(form).then((res) => {
			query = false;
			tem.id = '';
			message = '';
		});
	}
	const deleteProduct = async (item: string) => {
		$utils.deleteProduct(item).then((res) => {
			if (res) {
				$mainStore.catalog = $mainStore.catalog.filter((i) => i.id != item);
			}
		});
	};
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
				<Button on:click={doSearch} class="!p-2.5 bg-primary-light" color="lime" type="submit">
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
			<p class="text-sm dark:text-white">Showing list of {$mainStore.catalog.length} results</p>
		</div>
	</div>
	<br />
	<div
		class="w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-center justify-center"
	>
		{#each $mainStore.catalog as item}
			<Card
				padding="none"
				class="border-solid border-white relative flex items-center text-center w-80 shadow-xl p-4"
			>
				{#if $mainStore.loggedIn}
					<div class="absolute right-3">
						<button on:click={() => goto(`/profile/${item.farmer_id}`)}>
							<img class="w-8 h-8 rounded-full cursor-pointer" src={avatar} alt="farmer" />
						</button>
					</div>
				{/if}
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
							class="w-8 h-8 hover:text-green-400"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
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
				{#if $mainStore.loggedIn}
					{#if $mainStore.user.info.id != item.farmer_id}
						<Button
							class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
							color="lime"
							on:click={() => {
								query = true;
								tem = item;
							}}>Query</Button
						>
					{:else}
						<Button
							class="w-full text-white text-base xs:text-3xl p-2 lg:p-4  m-2 rounded-xl"
							color="red"
							on:click={() => deleteProduct(item.id)}>Delete</Button
						>
					{/if}
				{/if}
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
		<Button
			type="submit"
			class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
			color="lime"
			on:click={myFunction}>Submit</Button
		>
	</div>
</Modal>
<svelte:head>
	<title>Catalog</title>
</svelte:head>
