<script lang="ts">
	import { Card, Rating, Badge, Progressbar } from 'flowbite-svelte';
	export let image = '';
	export let name: string = '';
	export let category: string = '';
	export let description: string = '';
</script>

<Card padding="10px" class="flex items-center text-center w-80 shadow-xl">
	<a href="/">
		<img class="p-8 rounded-t-lg  h-40" src={image} alt="product 1" />
	</a>
	<div class="px-5">
		<a href="/">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
		</a>
	</div>
	<div class="p-5">
		{#if description === ''}
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				A {name} is a {category} product.
			</p>
		{:else}
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				{description}
			</p>
		{/if}
	</div>
	
</Card>

<style>
	.progress {
		transform: rotate(-90deg);
		-ms-transform: rotate(-90deg); /* IE 9 */
		-webkit-transform: rotate(-90deg);
	}
	.un-progress {
		transform: rotate(90deg);
		-ms-transform: rotate(90deg); /* IE 9 */
		-webkit-transform: rotate(90deg);
	}
</style>
