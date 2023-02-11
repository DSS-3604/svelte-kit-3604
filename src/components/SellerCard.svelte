<script lang="ts">
	import { Avatar, Card, Rating, Badge } from 'flowbite-svelte';
	export let rating: string = '';
	export let image: string = '';
	export let desciption: string = '';
	export let name: string = '';
	export let role: string = '';
</script>

<Card padding="none" class="w-80 text-center shadow-xl">
	<div class="relative">
		<a href="/profile">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 absolute top-3 right-3 text-gray-500 dark:text-gray-400 cursor-pointer"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
				/>
			</svg>
		</a>
	</div>
	<div class="flex flex-col items-center p-4">
		<Avatar size="xl" src={image} />
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
		<span class="text-sm text-gray-500 dark:text-gray-400">{role}</span>
		<Rating {rating} size="18" class="m-2.5">
			<Badge slot="text" class="ml-3">{rating}</Badge>
		</Rating>
		<div class="flex space-x-3">
			<p>{desciption}</p>
		</div>
	</div>
</Card>
