<script lang="ts">
	import {
		Card,
		Button,
		Input,
		InputAddon,
		ButtonGroup,
		Chevron,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';
</script>

<div class="m-5">
	<div>
		<p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
			Products
		</p>
	</div>
	<div>
		<div>
			<ButtonGroup class="w-full">
				<Button
					color="none"
					class="flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
				>
					<Chevron>All categories</Chevron>
				</Button>
				<Dropdown>
					<DropdownItem>Vegetables</DropdownItem>
					<DropdownItem>Fruits</DropdownItem>
				</Dropdown>
				<Input placeholder="Search" />
				<Button color="blue" class="!p-2.5" type="submit">
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</Button>
			</ButtonGroup>
		</div>
	</div>
	<br />
	<div>
		<div class="flex justify-between">
			<p class="text-sm dark:text-white">Showing list 1-10 of 28 results</p>
			<!-- <button class="text-sm dark:text-white bg-slate-500">filter button</button> -->
		</div>
	</div>
	<br />
	<div
		class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-center justify-center gap-3"
	>
		{#each [1, 2, 3, 4, 5, 6, 7] as item}
			<!-- content here -->
			<Card padding="none" class="flex items-center text-center p-5">
				<!-- <a href="/"> -->
				<img class="rounded-t-lg h-40" src="orange.webp" alt="product 1" />
				<!-- </a> -->
				<p class="text-2xl dark:text-white p-5">Oranges</p>
			</Card>
		{/each}
	</div>
</div>
