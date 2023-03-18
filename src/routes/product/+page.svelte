<script lang="ts">
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import {
		Card,
		Rating,
		RatingComment,
		Avatar,
		Button,
		Badge,
		Modal,
		Img,
		Review
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Upload from '../../components/Upload.svelte';
	import { goto } from '$app/navigation';
	import UpdateProduct from '../../components/UpdateProduct.svelte';
	let btnDefault = 'bg-gray-200';
	let btnActive = 'bg-primary rounded-lg text-white';
	let activeButton = 'about';

	let about_btn_color = btnDefault;
	let comments_btn_color = btnDefault;

	const setActive = (btn) => {
		activeButton = btn;
		if (btn === 'about') {
			about_btn_color = btnActive;
			comments_btn_color = btnDefault;
		} else if (btn === 'comments') {
			about_btn_color = btnDefault;
			comments_btn_color = btnActive;
		}
	};
	let review = {
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
	let popupModal = false;
	let product = {
		name: '',
		description: '',
		retail_price: '',
		currency: '',
		product_quantity: '',
		image: '',
		farmer_id: ''
	};
	onMount(() => {
		$utils.silentLogin().then(() => {
			if ($mainStore.loggedIn) {
				$utils.fetchUserProducts();
			} else {
				goto('/');
			}
		});
		setActive('comments');
	});
	let edit = false;
</script>

<div class="flex justify-center items-center text-center">
	<Modal bind:open={popupModal} size="xl" autoclose>
		<h1>Comment</h1>
	</Modal>
</div>

<div class="m-5">
	<div class="p-4">
		<div class="flex flex-col items-center pb-4">
			<Img
				src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/07/what_to_know_apples_green_red_1296x728_header-1024x575.jpg?w=1155&h=1528"
				alt="Product"
				size="max-w-xl"
				class="shadow-xl dark:shadow-gray-800"
			/>
			<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Apples</h5>
			<span class="text-sm text-gray-500 dark:text-gray-400"
				>product supplied by: {$mainStore.user.info.username}</span
			>
			<div class="flex mt-4 space-x-3 lg:mt-6">
				<Button href="/contact">Contact</Button>
				<Button on:click={() => (popupModal = true)} color="light" class="dark:text-white"
					>Comment</Button
				>
			</div>
		</div>
		<div class="flex flex-col items-center">
			<div class="flex space-x-12">
				<div class="flex flex-col items-center">
					<p class="text-xl font-semibold text-gray-900 dark:text-white">1,200</p>
					<p class="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
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
					<p class="text-xl font-semibold text-gray-900 dark:text-white">10</p>
					<p class="text-sm text-gray-500 dark:text-gray-400">Comments</p>
				</div>
			</div>
			<div class="mt-5 w-full">
				<div class="flex items-center bg-gray-200 p-1 rounded-lg w-full">
					<button class="w-1/2 {about_btn_color} py-1" on:click={() => setActive('about')}>
						About
					</button>
					<button class="w-1/2 {comments_btn_color} py-1" on:click={() => setActive('comments')}>
						Comments
					</button>
				</div>
			</div>
			<div class="mt-5">
				{#if activeButton === 'comments'}
					<div class="flex flex-col gap-3">
						<div class="rounded-lg border p-5" style="width:90vw">
							<Review {review}>
								<p class="mb-2 font-light text-gray-500 dark:text-gray-400">
									The flat was spotless, very comfortable, and the host was amazing. I highly
									recommend this accommodation for anyone visiting Brasov city centre. It's quite a
									while since we are no longer using hotel facilities but self contained places. And
									the main reason is poor cleanliness and staff not being trained properly. This
									place exceeded our expectation and will return for sure.
								</p>
								<p class="mb-5 font-light text-gray-500 dark:text-gray-400">
									It is obviously not the same build quality as those very expensive watches. But
									that is like comparing a Citroën to a Ferrari. This watch was well under £100! An
									absolute bargain.
								</p>
								<svelte:fragment slot="item1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-4 h-4 mr-2"
										><path
											fill-rule="evenodd"
											d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z"
											clip-rule="evenodd"
										/></svg
									>
									{review.item1}
								</svelte:fragment>
								<svelte:fragment slot="item2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-4 h-4 mr-2"
										><path
											fill-rule="evenodd"
											d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
											clip-rule="evenodd"
										/></svg
									>
									{review.item2}
								</svelte:fragment>
								<svelte:fragment slot="item3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-4 h-4 mr-2"
										><path
											fill-rule="evenodd"
											d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
											clip-rule="evenodd"
										/><path
											d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z"
										/></svg
									>
									{review.item3}
								</svelte:fragment>
								<aside class="flex items-center mt-3 space-x-5">
									<a
										href="/"
										class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="w-5 h-5 mr-1"
											><path
												d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"
											/></svg
										>
										Helpful
									</a>
									<a
										href="/"
										class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 group"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="w-5 h-5 mr-1"
											><path
												d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z"
											/></svg
										>
										Not helpful
									</a>
								</aside>
							</Review>
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
