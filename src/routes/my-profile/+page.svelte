<script lang="ts">
	import avatar from '$lib/images/avatar.webp';
	import mainStore from '$lib/stores/mainStore';
	import DisplayReview from '../../components/DisplayReview.svelte';
	import utils from '$lib/stores/utils';
	import {
		Card,
		Rating,
		RatingComment,
		Avatar,
		Button,
		Modal,
		Select,
		Label,
		Input,
		Textarea
	} from 'flowbite-svelte';
	import darkVeg from '$lib/images/dark-veg.png';
	import { onMount } from 'svelte';
	import Upload from '../../components/Upload.svelte';
	import { goto } from '$app/navigation';
	import UpdateProduct from '../../components/UpdateProduct.svelte';
	import NoItems from '../../components/NoItems.svelte';
	let btnDefault = 'bg-gray-200';
	let btnActive = 'bg-primary rounded-lg text-white';
	let activeButton = 'about';

	let about_btn_color = btnDefault;
	let reviews_btn_color = btnDefault;
	let post_btn_color = btnDefault;
	let queries_btn_color = btnDefault;

	const setActive = (btn) => {
		activeButton = btn;
		if (btn === 'about') {
			about_btn_color = btnActive;
			reviews_btn_color = btnDefault;
			post_btn_color = btnDefault;
			queries_btn_color = btnDefault;
		} else if (btn === 'review') {
			about_btn_color = btnDefault;
			reviews_btn_color = btnActive;
			post_btn_color = btnDefault;
			queries_btn_color = btnDefault;
		} else if (btn === 'post') {
			about_btn_color = btnDefault;
			reviews_btn_color = btnDefault;
			post_btn_color = btnActive;
			queries_btn_color = btnDefault;
		} else if (btn === 'queries') {
			about_btn_color = btnDefault;
			reviews_btn_color = btnDefault;
			post_btn_color = btnDefault;
			queries_btn_color = btnActive;
		}
	};
	let tem = {};
	let queryType = '';
	let popupModal = false;
	let replyMessage = '';
	let averageRating = '0';
	onMount(() => {
		$utils.silentLogin().then(() => {
			if ($mainStore.loggedIn) {
				$utils.fetchUserInfo();
				if ($mainStore.access_level === 'farmer') {
					$utils.fetchUserProducts();
					$utils.getFarmerReviews($mainStore.user.info.id).then((res) => {
						$mainStore.user.reviews = res;
						let total = 0;
						let count = 0;
						for (let i = 0; i < $mainStore.user.reviews.length; i++) {
							total = total + parseInt($mainStore.user.reviews[i].rating);
							count++;
						}
						if (count > 0) {
							averageRating = (total / count).toFixed(1);
						} else {
							averageRating = '0';
						}
					});
				}
				if ($mainStore.access_level === 'user') {
					$utils.getUserReviews($mainStore.user.info.id).then((res) => {
						$mainStore.user.reviews = res;
					});
				}
				$utils.fetchQueryUser($mainStore.user.info.id);
				$utils.fetchQueryFarmer($mainStore.user.info.id);
			} else {
				goto('/');
			}
		});
		queryType = 'farmer';
		setActive('queries');
	});
	let toEdit = {};
	let edit = false;
	let replyQuery = false;
	const time = (item) => {
		let date = new Date(item);
		let time = date.toLocaleTimeString();
		let date2 = date.toLocaleDateString();
		return `${date2} ${time}`;
	};
	const queryTypes = [
		{ name: 'My Queries', value: 'user' },
		{ name: 'Queries to me', value: 'farmer' }
	];
	let truncate = 'truncate';
	let messageAction = 'Show more';
	const message = () => {
		if (truncate === 'truncate') {
			truncate = '';
			messageAction = 'Show less';
		} else {
			truncate = 'truncate';
			messageAction = 'Show more';
		}
	};
	let error = '';
	const sendQueryReply = async () => {
		error = '';
		if (replyMessage != '') {
			let sending = {
				body: replyMessage
			};
			$utils.getQueryReply(sending, tem.id).then((res) => {
				if (res) {
					goto('/my-profile');
				} else {
					error = 'Could not send message.';
				}
			});
		} else {
			error = 'Please fill all fields.';
		}
	};
	const getQueryReplies = async (item) => {
		$utils.fetchQueryReplies(item.id);
	};
	let response = false;
</script>

<div class="flex justify-center items-center text-center">
	<Modal bind:open={popupModal} size="xl" autoclose>
		<Upload />
	</Modal>
</div>
<div class="m-5">
	<div class="p-4">
		<div class="flex flex-col items-center pb-4">
			<Avatar size="xl" src={$mainStore.user.info.avatar} />
			<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
				{$mainStore.user.info.username}
			</h5>
			<span class="text-sm text-gray-500 dark:text-gray-400">{$mainStore.access_level}</span>
			<div class="flex mt-4 space-x-3 lg:mt-6">
				<Button
					on:click={() => goto('/settings')}
					class="bg-primary rounded-lg text-white"
					style="background:#889c0c">Edit Profile</Button
				>
				{#if $mainStore.access_level === 'farmer'}
					<Button on:click={() => (popupModal = true)} color="light" class="dark:text-white"
						>New Post</Button
					>
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-center">
			<div class="flex space-x-12">
				{#if $mainStore.access_level === 'farmer'}
					<div class="flex flex-col items-center">
						<p class="text-xl font-semibold text-gray-900 dark:text-white">
							{$mainStore.user.products.length}
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
				{/if}
				<div class="flex flex-col items-center">
					<p class="text-xl font-semibold text-gray-900 dark:text-white">
						{$mainStore.user.reviews.length}
					</p>
					<p class="text-sm text-gray-500 dark:text-gray-400">Reviews</p>
				</div>
			</div>
			<div class="mt-5 w-full">
				<div class="flex items-center bg-gray-200 p-1 rounded-lg w-full">
					{#if $mainStore.access_level === 'farmer'}
						<button class="w-full {post_btn_color} py-1" on:click={() => setActive('post')}>
							Posts
						</button>
					{/if}
					<button class="w-full {about_btn_color} py-1" on:click={() => setActive('about')}>
						About
					</button>
					<button class="w-full {reviews_btn_color} py-1" on:click={() => setActive('review')}>
						Reviews
					</button>
					<button class="w-full {queries_btn_color} py-1" on:click={() => setActive('queries')}>
						Queries
					</button>
				</div>
			</div>
			{#if activeButton === 'post'}
				{#if $mainStore.user.products.length === 0}
					<NoItems name="products" actionText="creating a product" image={darkVeg} />
				{/if}
				<div class="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{#each $mainStore.user.products as item}
						<Card padding="none" class="flex items-center text-center w-80 shadow-xl p-4">
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
								class="w-full text-white text-base xs:text-3xl bg-primary-light"
								color="lime"
								on:click={() => {
									toEdit = item;
									edit = true;
								}}>Edit</Button
							>
						</Card>
					{/each}
				</div>
			{:else if activeButton === 'review'}
				{#if $mainStore.user.reviews.length === 0}
					<NoItems
						name="reviews"
						action="/catalog"
						actionText="reviewing a farmer"
						image={darkVeg}
					/>
				{/if}
				<div class="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{#each $mainStore.user.reviews as item}
						<DisplayReview {item} />
					{/each}
				</div>
			{:else if activeButton === 'about'}
				<div class="mt-5 flex flex-col w-full">
					<div class=" rounded-lg p-5 border">
						<p class="font-semibold dark:text-white">Bio</p>
						<p class="text-gray-500 dark:text-gray-400">{$mainStore.user.info.bio}</p>
					</div>
					<div class=" rounded-lg mt-5 p-5 border">
						<p class="font-semibold dark:text-white">Contact</p>
						<div class="flex flex-col gap-2 text-gray-500 dark:text-gray-400">
							<div class="flex justify-between">
								<p>Phone</p>
								<p class="">{$mainStore.user.info.phone}</p>
							</div>
							<div class="flex justify-between">
								<p>Address</p>
								<p>{$mainStore.user.info.address}</p>
							</div>
							<div class="flex justify-between">
								<p>Email</p>
								<p>{$mainStore.user.info.email}</p>
							</div>
						</div>
					</div>
				</div>
			{:else if activeButton === 'queries'}
				<div class="flex items-center justify-center gap-5 p-5">
					<p class="text-gray-500 dark:text-gray-400">Filter</p>
					<Select items={queryTypes} bind:value={queryType} />
				</div>
				{#if $mainStore.farmerQuery.length === 0 && queryType === 'farmer'}
					<NoItems name="Queries" actionText="reviewing a product" image={darkVeg} />
				{:else if $mainStore.userQuery.length === 0 && queryType === 'user'}
					<NoItems name="Queries" actionText="reviewing a product" image={darkVeg} />
				{/if}

				<div class="mt-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{#each queryType === 'user' ? $mainStore.userQuery : $mainStore.farmerQuery as item}
						<Card
							padding="none"
							class="flex relative w-80  shadow-xl p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:duration-300"
						>
							<div class="flex items-center gap-5 p-2">
								<div class="relative w-28">
									<img src={avatar} alt="product" />
									<img
										src={avatar}
										alt="user"
										class="w-10 h-10 absolute bottom-1 right-1 rounded-full"
									/>
								</div>
								<div class="w-2/3">
									{#if queryType === 'user'}
										<div class="flex gap-2">
											<p class="font-semibold">To:</p>
											<a
												href={'/profile/' + item.farmer_id}
												class="truncate underline text-blue-500">{item.farmer_name}</a
											>
										</div>
										<div class="flex gap-2">
											<p class="font-semibold">Product:</p>
											<a
												href={'/products/' + item.product_id}
												class="truncate underline text-blue-500">{item.product_name}</a
											>
										</div>
									{:else}
										<div class="flex gap-2">
											<p class="font-semibold">From:</p>
											<a href={'/profile/' + item.user_id} class="truncate underline text-blue-500"
												>{item.user_name}</a
											>
										</div>
										<div class="flex gap-2">
											<p class="font-semibold">Product:</p>
											<a
												href={'/products/' + item.product_id}
												class="truncate underline text-blue-500">{item.product_name}</a
											>
										</div>
										<div class="w-full">
											<a href="mailto:{item.email}" class="underline text-blue-500">
												<p class="truncate">
													{item.email}
												</p>
											</a>
										</div>
									{/if}
								</div>
							</div>
							<div class="p-2">
								<p class="font-semibold">Message:</p>
								<p class="break-words {truncate}">
									{item.message}
								</p>
								{#if item.message.length > 31}
									<div class="flex">
										<button class="underline" on:click={message}>{messageAction}</button>
									</div>
								{/if}
							</div>
							{#if $mainStore.user.info.access != 'user' && queryType != 'user'}
								<div class="p-2 flex items-center justify-end">
									<div class="justify-start">
										<Button
											size="sm"
											class="w-full text-white text-base xs:text-3xl bg-primary-light"
											color="lime"
											on:click={() => {
												replyQuery = true;
												tem = item;
											}}>Reply</Button
										>
									</div>
									<div class="justify-start ml-2">
										<Button
											size="sm"
											class="w-full text-white text-base xs:text-3xl bg-primary-light"
											color="lime"
											on:click={() => {
												getQueryReplies(item);
												tem = item;
												response = true;
											}}>View Response</Button
										>
									</div>
								</div>
							{/if}
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<div class="flex justify-center items-center text-center">
	<Modal bind:open={edit} size="xl" autoclose>
		<UpdateProduct item={toEdit} />
	</Modal>
</div>

<Modal bind:open={replyQuery} size="xl" class="w-full h-full" autoclose>
	<form class="w-full h-full">
		<div class="w-full">
			<Label class="block mb-2">Query:</Label>
			<Input class="w-full" label="query" id="query" name="query" disabled value={tem.message} />
		</div>
		<div class="w-full mt-4">
			<Label class="block mb-2">Query Reply</Label>
			<Textarea
				class="w-full h-44"
				bind:value={replyMessage}
				label="replyMessage"
				id="replyMessage"
				name="replyMessage"
				required
				placeholder="Reply Message"
			/>
		</div>
		<Button
			type="submit"
			class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
			color="lime"
			on:click={sendQueryReply}>Submit</Button
		>
	</form>
</Modal>

<Modal bind:open={response} size="xl" class="w-full h-full" autoclose>
	<div class="w-full">
		<Label class="block mb-2">Query:</Label>
		<Input class="w-full" label="query" id="query" name="query" disabled value={tem.message} />
	</div>
	<div class="w-full mt-4">
		<Label class="block mb-2">Response</Label>
		<!-- {#each $mainStore.queryReply as item}
			{#if item.query_id === tem.id}
				<Textarea
					class="w-full"
					label="response"
					id="response"
					name="response"
					disabled
					value={item.body}
				/>
			{/if}
		{/each} -->
		{#if $mainStore.queryReply.length > 0}
			{#each $mainStore.queryReply as item}
				{#if item.query_id === tem.id}
					<Textarea
						class="w-full"
						label="response"
						id="response"
						name="response"
						disabled
						value={item.body}
					/>
				{/if}
			{/each}
		{:else}
			<Textarea
				class="w-full"
				label="response"
				id="response"
				name="response"
				disabled
				value="No Response"
			/>
		{/if}
	</div>
</Modal>

<svelte:head>
	<title>{$mainStore.user.info.username}</title>
</svelte:head>
