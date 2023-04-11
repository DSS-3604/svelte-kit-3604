<script lang="ts">
	import avatar from '$lib/images/avatar.webp';
	import mainStore from '$lib/stores/mainStore';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';
	import utils from '$lib/stores/utils';
	import { LineChart } from '@carbon/charts-svelte';
	import {
		Progressbar,
		Card,
		Textarea,
		RatingComment,
		Checkbox,
		Input,
		Label,
		Button,
		Modal,
		Avatar,
		Skeleton
	} from 'flowbite-svelte';
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

	let message = '';
	let farmer = '';
	let email = '';
	let productID = '';

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
	function myFunction() {
		let form = { product_id: product.id, message: message };
		$utils.submitForm(form).then((res) => {
			query = false;
		});
	}
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
				{#if $mainStore.loggedIn}
					<Button
						on:click={() => (query = true)}
						class="dark:text-white bg-primary-light"
						color="lime">Query</Button
					>
				{/if}
				<Button
					on:click={() => 'hi'}
					href="/contact"
					color="light"
					class="dark:text-white border-solid border-2 border-white-500">Contact Form</Button
				>
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
					History
				</button>
			</div>
		</div>
		<div class="mt-5">
			{#if activeButton === 'comments'}
				<div class="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
					{#if $mainStore.loggedIn}
						<Card class="shadow-2xl p-3 h-64 w-80 border-solid border-black">
							<div class="rounded-lg w-100 p-2">
								<div class="flex flex-col items-center gap-2 text-center">
									<div class="flex gap-10">
										<h3 class="text-lg font-medium text-gray-900 dark:text-white w-100">
											Add Comment
										</h3>
									</div>
									<Textarea
										rows="5"
										bind:value={commentToPost.body}
										placeholder="Write your review"
										class="w-full"
									/>
									<Button
										type="submit"
										on:click={commentProduct}
										class="mt-1 w-full dark:text-white bg-primary-light"
										color="lime">Submit</Button
									>
								</div>
							</div>
						</Card>
					{/if}
					{#each $mainStore.product.comments as item}
						<Card class="shadow-xl w-80 h-64 border-solid border-black p-3">
							<div class="flex justify-between p-1">
								<div class="flex gap-4">
									<Avatar size="sm" src={avatar} />
									<p class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
										{item.user_name}
									</p>
								</div>
								<div class="">
									<p class="p-1">{time(item.timestamp)}</p>
								</div>
							</div>

							<div class="mt-3">
								{#if item.body === ''}
									<p class="text-md dark:text-gray-300 p-1 break-words overflow-y-auto">
										{product.name} is a {product.category_name} grown by {product.farmer_name}. It
										is an excellent product and is highly recommended.
									</p>
								{:else}
									<p class="text-md dark:text-gray-300 p-1 break-words overflow-y-auto h-28">
										{item.body}
									</p>
								{/if}
							</div>
							{#if $mainStore.loggedIn}
								<Button class="mt-3 text-white text-base bg-primary-light" color="lime"
									>Reply</Button
								>
							{/if}
						</Card>
					{/each}
				</div>
			{:else if activeButton === 'about'}
				<div class="flex flex-col gap-10 text-center items-center justify-center">
					<Card size="xl" class="w-100">
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
									Description: A {product.name} is a {product.category_name} grown by {product.farmer_name}.
									There are {product.wholesale_unit_quantity}
									{product.name} in quantity for ${product.wholesale_price} wholesale and ${product.retail_price}
									retail.
								</p>
							{:else}
								<p class="text-xl font-semibold text-white-600/100 dark:text-white">
									Description: {product.description}
								</p>
							{/if}
						</Card>
					</Card>
				</div>
			{:else if activeButton === 'predictions'}
				<!-- Line chart with product cost on y-axis and time on x-axis -->
				<LineChart
					class=" bg-white p-3"
					data={[
						{
							group: $mainStore.product.name,
							date: '2019-01-02T04:00:00.000Z',
							value: 0
						},
						{
							group: $mainStore.product.name,
							date: '2019-01-06T04:00:00.000Z',
							value: 20
						},
						{
							group: $mainStore.product.name,
							date: '2019-01-08T04:00:00.000Z',
							value: 30
						},
						{
							group: $mainStore.product.name,
							date: '2019-01-15T04:00:00.000Z',
							value: 15
						},
						{
							group: $mainStore.product.name,
							date: '2019-01-19T04:00:00.000Z',
							value: 25
						}
					]}
					options={{
						title: $mainStore.product.name + ' Price Predictions',
						axes: {
							bottom: {
								title: '2023 Annual Sales Figures',
								mapsTo: 'date',
								scaleType: 'time'
							},
							left: {
								mapsTo: 'value',
								title: 'Retail Price ($ USD)'
							}
						},
						curve: 'curveMonotoneX',
						height: '400px'
					}}
				/>
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
	<title>{$mainStore.product.name}</title>
</svelte:head>
