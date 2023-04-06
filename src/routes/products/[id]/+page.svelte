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
	let productID='';

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
	function myFunction() {
		let form = {"product_id":product.id,"message":message};
		console.log(form);
		$utils.submitForm(form).then((res) => {
			console.log(res);
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
				<div class="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
					{#if $mainStore.product.comments.length === 0}
						<div class="flex justify-center items-center">
							<Card
								padding="sm"
								class="flex items-center text-center w-100 shadow-xl p-2 mt-5 w-100"
								size="xl"
							>
								<h1 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
									No Comments
								</h1>
								<Skeleton size="xl" />
							</Card>
						</div>
					{/if}
					{#each $mainStore.product.comments as item}
						<Card
							size="xl"
							class="flex relative w-100 h-64 shadow-xl p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:duration-300 "
						>
							<div class="flex gap-4 p-1 w-100">
								<Avatar size="sm" src={avatar} />
								<p class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
									{item.user_id}
								</p>
								<div class="text-right items-right ml-3">
									<p class="p-1">{time(item.timestamp)}</p>
								</div>
							</div>

							<Card size="xl" class="mt-3">
								{#if item.body === ''}
									<p class="text-md dark:text-gray-300 p-1 break-words overflow-y-auto">
										{product.name} is a {product.category_name} grown by {product.farmer_name}. It
										is an excellent product and is highly recommended.
									</p>
								{:else}
									<p class="text-md dark:text-gray-300 p-1 break-words overflow-y-auto">
										{item.body}
									</p>
								{/if}
							</Card>

							<Button class="absolute bottom-2 right-2">Reply</Button>
						</Card>
					{/each}

					<div class="border bottom-0 dark:bg-gray-800 bg-white p-2 rounded-lg w-100">
						<div class="flex flex-col items-center gap-2 text-center">
							<div class="flex gap-10 p-1">
								<h3 class="text-lg font-medium text-gray-900 dark:text-white w-100">Add Comment</h3>
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
					<Card size="xl" class="">
						<p>
							There currently exists {product.comments.length} comments for the product {product.name},
							add a comment above containing your reviews about said product.
						</p>
					</Card>
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
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Contact Farmer {product.farmer_name}</h3>
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
		<Button type="submit" class="w-full1" on:click={myFunction}>Submit</Button>
	</div>
</Modal>

<svelte:head>
	<title>{$mainStore.product.name}</title>
</svelte:head>