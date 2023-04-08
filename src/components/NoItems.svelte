<script lang="ts">
	import bunny_carrot from '$lib/images/bunny_carrot.png';
	export let name = 'NoItems';
	export let image = bunny_carrot;
	export let action = '';
	export let actionText = '';
</script>

<div
	class="w-full mt-4 p-4 flex flex-column justify-center border-2 border-dashed border-gray-600 rounded-lg"
>
	<div class="flex items-center md:justify-between w-full">
		<div class="hidden md:flex flex-column w-52" />
		<div>
			<p class="text-lg md:text-2xl font-medium tracking-tight text-gray-500 dark:text-gray-300">
				You don't have any {name} yet :(
			</p>
			{#if action != ''}
				<p>
					<span class="text-gray-500 dark:text-gray-400 md:text-lg">You can start by</span>
					<a href={action} class="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
						>{actionText}</a
					>
				</p>
			{/if}
		</div>
		<div>
			<img src={image} alt="bunny-carrot" class="md:opacity-25 opacity-50" />
		</div>
	</div>
</div>
