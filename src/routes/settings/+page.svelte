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
						<p>Name: </p>
						<i class="fas fa-pen" />
					</div>
				</div>
			</div>
		</div>
	</Card>
</div>
