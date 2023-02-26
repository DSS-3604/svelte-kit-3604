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
		Textarea,
		Modal,
		Checkbox
	} from 'flowbite-svelte';

	let formModal = false;
</script>

<div class="flex items-center justify-center h-screen mainwrapper">
	<Card size="xl" class="h-2/4">
		<div class="settings-page">
			<div class="settings-container">
				<h1 class="page-title">Account</h1>
				<div class="settings-section">
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

				<div class="settings-section">
					<h2 class="settings-title">Profile</h2>
					<div class="flex justify-center">
						<button
							on:click={() => (formModal = true)}
							class="text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
							>Change Profile Picture</button
						>
					</div>
				</div>

				<div class="settings-section">
					<h2 class="settings-title">Security</h2>
					<form class="flex flex-col" action="#">
						<div class="mb-6">
							<Label for="default-input" class="block mb-2">Old Password:</Label>
							<Input id="default-input" placeholder="Default input" />
						</div>
						<div class="mb-6">
							<Label for="default-input" class="block mb-2">New Password:</Label>
							<Input id="default-input" placeholder="Default input" />
						</div>
						<Button type="submit" class="w-full1">Submit</Button>
					</form>
				</div>
			</div>
		</div>
	</Card>
</div>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Change Profile Picture</h3>
		<Label class="space-y-2">
			<span>Current Profile Picture</span>
			<Card />
		</Label>

		<Button type="submit" class="w-full1">Submit</Button>
	</form>
</Modal>

<style>
	.mainwrapper {
		color: white;
	}
	.page-title {
		margin-bottom: 20px;
		font-size: 30px;
		font-weight: normal;
	}

	.settings-page {
		background-color: black;
		border-radius: 10px;
		width: 100%;
		min-height: fit-content;
	}
	.settings-container {
		width: 100%;
		max-width: 850px;
		margin: auto;
		padding: 20px;
		padding-top: 40px;
	}
	.settings-title {
		color: #454545;
		text-transform: uppercase;
		font-weight: normal;
		font-size: 20px;
		padding-bottom: 5px;
	}
	.settings-section {
		width: 100%;
		border-top: 2px solid #454545;
		padding-top: 10px;
		margin-bottom: 20px;
	}
	.non-active-form {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
	p {
		padding: 7px 15px;
		margin-bottom: 0;
		font-size: 1rem;
		cursor: default;
	}
	svg {
		cursor: pointer;
		color: #454545;
		transition: all 0.5s;
		margin-right: 10px;
	}
	svg:hover {
		color: green;
		transform: scale(1.1);
	}
</style>
