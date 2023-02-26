<script lang="ts">
	import {
		Card,
		Button,
		Input,
		InputAddon,
		ButtonGroup,
		Chevron,
		Dropdown,
		DropdownItem,
		Carousel,
		CarouselTransition,
		Label,
		Toolbar,
		ToolbarButton,
		ToolbarGroup,
		Textarea
	} from 'flowbite-svelte';
</script>

<div class="flex items-center justify-center h-screen">
	<Card class="h-2/4">
		<div class="settings-page">
			<div class="settings-container">
				<h1>Account</h1>
				<div class="setting-section">
					<h2 class="settings-title">General Information</h2>
					<div class="non-active-form">
						<p>Name:</p>
						<svg
							class="h-8 w-8 text-green-500"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
							<path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
							<line x1="16" y1="5" x2="19" y2="8" /></svg
						>
					</div>
					<div class="non-active-form">
						<p>Number:</p>
						<svg
							class="h-8 w-8 text-green-500"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
							<path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
							<line x1="16" y1="5" x2="19" y2="8" /></svg
						>
					</div>
					<div class="non-active-form">
						<p>Email:</p>
						<svg
							class="h-8 w-8 text-green-500"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
							<path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
							<line x1="16" y1="5" x2="19" y2="8" /></svg
						>
					</div>
				</div>
			</div>
		</div>
	</Card>
</div>
