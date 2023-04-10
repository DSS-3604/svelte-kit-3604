<script lang="ts">
	import { Card, Rating, RatingComment, Avatar, Button, Badge, Textarea } from 'flowbite-svelte';
	import avatar from '$lib/images/avatar.webp';
	export let item = {
		user_name: '',
		rating: '',
		body: '',
		timestamp: ''
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
</script>

<Card padding="none" class="flex relative w-80 h-64 p-3">
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
