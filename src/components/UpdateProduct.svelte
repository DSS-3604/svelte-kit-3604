<script>
	import utils from '$lib/stores/utils';
	import { goto } from '$app/navigation';
	import mainStore from '$lib/stores/mainStore';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Textarea, Label, Input, Select, Button, Avatar } from 'flowbite-svelte';
	let fileinput;
	export let item = {
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
	let product = JSON.parse(JSON.stringify(item));
	let currency = [
		{ value: 'USD', name: 'USD' },
		{ value: 'TTD', name: 'TTD' }
	];
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		uploadImage(image);
	};
	//submit image to imgbb
	const uploadImage = async (image) => {
		const formData = new FormData();
		formData.append('image', image);
		const res = await fetch('https://api.imgbb.com/1/upload?key=fea6b09c3477595b6e498116bfeedb0a', {
			method: 'POST',
			body: formData
		});
		const data = await res.json();
		console.log(data.data.url);
		product.image = data.data.url;
	};
	const updateProduct = async () => {
		$utils.updateProduct(product);
	};
	const units = [
		{
			value: '1',
			name: 'Kg'
		},
		{
			value: '2',
			name: 'g'
		},
		{
			value: '3',
			name: 'lb'
		}
	];
	onMount(() => {
		$utils.fetchProductCategories();
	});
</script>

<div class="bg-gray-white w-full dark:bg-gray-800 p-3 rounded-xl">
	<div
		class="mt-1 mb-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
	>
		{#if product.image}
			<div class="relative">
				<div>
					<button
						class="absolute h-10 w-10 right-0 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-full p-2"
						on:click={() => {
							product.image = '';
						}}
					>
						<svg
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
							/>
						</svg>
					</button>
				</div>
				<div>
					<img class="p-2 rounded-t-lg h-36" src={product.image} alt="product 1" />
				</div>
			</div>
		{:else}
			<div class="space-y-1 text-center">
				<svg
					class="mx-auto dark:text-gray-400"
					stroke="currentColor"
					fill="none"
					viewBox="0 0 48 48"
					aria-hidden="true"
				>
					<path
						d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<div class="flex text-sm text-gray-600">
					<label
						for="file-upload"
						class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
					>
						<span
							class=""
							on:click={() => {
								fileinput.click();
							}}>Upload a file</span
						>
						<input
							style="display:none"
							type="file"
							accept=".jpg, .jpeg, .png"
							on:change={(e) => onFileSelected(e)}
							bind:this={fileinput}
						/>
					</label>
					<p class="pl-1 dark:text-gray-300 ">or drag and drop</p>
				</div>
				<p class="text-xs dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
			</div>
		{/if}
	</div>
	<div class="flex flex-col gap-2">
		<div>
			<Input
				bind:value={product.name}
				type="text"
				id="product_name"
				placeholder="Product Name"
				required
			/>
		</div>
		<div>
			<Input
				bind:value={product.description}
				type="text"
				id="description"
				placeholder="Description"
				required
			/>
		</div>
		<div class="flex gap-2">
			<div class="w-full">
				<Select
					bind:value={product.category_id}
					on:change={(e) => {
						//find the category using the id
						const category = $mainStore.product_categories.find((category) => {
							return category.value == e.target.value;
						});
						product.category_name = category.name;
					}}
					id="category"
					items={$mainStore.product_categories}
					placeholder="Category"
					required
				/>
			</div>
			<div class="w-full">
				<Select id="currency" items={currency} placeholder="Currency" required />
			</div>
		</div>
		<div>
			<Input
				bind:value={product.retail_price}
				type="text"
				id="retail_price"
				placeholder="Retail Price"
				required
			/>
		</div>
		<div>
			<Input
				bind:value={product.wholesale_price}
				type="number"
				id="wholesale_price"
				placeholder="Wholesale Price"
				required
			/>
		</div>
		<div class="flex gap-2">
			<div>
				<Input
					bind:value={product.wholesale_unit_quantity}
					type="number"
					id="wholesale_unit_quantity"
					placeholder="Wholesale Quantity"
					required
				/>
			</div>
			<div>
				<Input
					bind:value={product.total_product_quantity}
					type="number"
					id="quantity"
					placeholder="Retail Quantity"
					required
				/>
			</div>
		</div>
	</div>
	{#if product.image}
		<div class="pt-2">
			<Button
				class="w-full text-white text-base xs:text-3xl bg-primary-light"
				color="lime"
				on:click={updateProduct}>Update</Button
			>
		</div>
	{/if}
</div>
