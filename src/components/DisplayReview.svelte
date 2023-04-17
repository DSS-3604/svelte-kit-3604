<script lang="ts">
	import { Card, Rating, RatingComment, Avatar, Button, Badge, Textarea } from 'flowbite-svelte';
	import utils from '$lib/stores/utils';
	import avatar from '$lib/images/avatar.webp';
	export let item = {
		id: '',
		user_name: '',
		rating: '',
		body: '',
		timestamp: ''
	};
	export let type: string = '';
	const time = (item) => {
		let date = new Date(item);
		let date2 = date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
		return date2;
	};
	const deleteReview = async (item: string) => {
		$utils.deleteFarmerReview(item).then((res) => {
			console.log(res);
		});
	};
</script>

<Card padding="none" class="flex relative w-80 h-64 p-3 border-solid border-white">
	{#if type === 'user'}
		<button on:click={() => deleteReview(item.id)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 absolute top-3 right-3 hover:text-red-600 cursor-pointer"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
				/>
			</svg>
		</button>
	{/if}
	<div class="flex gap-4 p-1">
		<Avatar size="sm" src={avatar} />
		<p class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
			{item.user_name}
		</p>
	</div>

	<div class="flex gap-2 p-1">
		<Rating rating={item.rating} />
		<p>{time(item.timestamp)}</p>
	</div>
	<p class="text-md dark:text-gray-300 p-1 break-words overflow-y-auto">
		{item.body}
	</p>
</Card>
