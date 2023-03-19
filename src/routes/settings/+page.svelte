<script lang="ts">
	import {
		Card,
		Button,
		Input,
		Label,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Modal,
		Avatar,
		Select
	} from 'flowbite-svelte';
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';
	let formModal = false;
	let toChange = {
		value: '',
		placeholder: '',
		label: '',
		type: 'text',
		item: ''
	};
	const save = () => {
		$utils.updateUserInfo($mainStore.user.info).then((res) => {
			console.log(res);
		});
	};
	const setToChange = (value: string, label: string) => {
		//@ts-ignore
		toChange.value = $mainStore.user.info[value];
		toChange.item = value;
		toChange.label = label;
		toChange.placeholder = label;
		toChange.type = 'text';
		formModal = true;
	};
	const setChange = (item: string) => {
		//@ts-ignore
		$mainStore.user.info[item] = toChange.value;
		formModal = false;
	};
	onMount(() => {
		$utils.silentLogin().then(() => {
			if ($mainStore.loggedIn) {
				$utils.fetchUserInfo().then((res) => {
					console.log(res);
				});
			} else {
				goto('/');
			}
		});
	});
	const units = [
		{
			value: 'kg',
			name: 'kg'
		},
		{
			value: 'g',
			name: 'g'
		},
		{
			value: 'lb',
			name: 'lb'
		}
	];
	const currency = [
		{
			value: 'USD',
			name: 'USD'
		},
		{
			value: 'EUR',
			name: 'EUR'
		},
		{
			value: 'GBP',
			name: 'GBP'
		}
	];
</script>

<div class="flex justify-center min-h-full">
	<div class="flex md:grid-cols-2 justify-center w-full items-center">
		<div class="hidden lg:block lg:w-1/6">
			<Sidebar let>
				<Avatar src="avatar.webp" size="xl" class="mx-auto" alt="Avatar" />
				<SidebarWrapper class="ml-4">
					<SidebarGroup>
						<SidebarItem label="General">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
									/><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Account">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Privacy">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Security">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
					</SidebarGroup>
					<SidebarGroup border>
						<SidebarItem label="Terms and Conditions">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Log Out">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Delete">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Help">
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
					</SidebarGroup>
				</SidebarWrapper>
			</Sidebar>
		</div>
		<div class="w-full lg:w-5/6 lg:mr-4">
			<div class="flex justify-center">
				<div class="settings-container">
					<h1 class="dark:text-white text-2xl">Account</h1>
					<div class="settings-section">
						<h2 class="uppercase dark:text-gray-400 text-xl mb-2">Profile</h2>
						<div class="flex justify-between">
							<Avatar src={$mainStore.user.info.avatar} size="lg" />
							<div class="flex justify-center">
								<button
									class="text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
									>Change Profile Picture</button
								>
							</div>
						</div>
					</div>
					<div class="settings-section">
						<h2 class="uppercase dark:text-gray-400 text-xl mb-2">General Information</h2>
						<div class="non-active-form">
							<p class="dark:text-gray-400">Username: {$mainStore.user.info.username}</p>
							<!-- <button on:click={() => setToChange('username', 'Username')}>
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
							</button> -->
						</div>
						<div class="non-active-form">
							<p class="dark:text-gray-400">Email: {$mainStore.user.info.email}</p>
							<!-- <button on:click={() => setToChange('email', 'email')}>
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
							</button> -->
						</div>
						<div class="non-active-form">
							<p class="dark:text-gray-400">Phone: {$mainStore.user.info.phone}</p>
							<button on:click={() => setToChange('phone', 'Phone')}>
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
							</button>
						</div>
						<div class="non-active-form">
							<p class="dark:text-gray-400">Bio: {$mainStore.user.info.bio}</p>
							<button on:click={() => setToChange('bio', 'Bio')}>
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
							</button>
						</div>
						<div class="non-active-form">
							<p class="dark:text-gray-400">Address: {$mainStore.user.info.address}</p>
							<button on:click={() => setToChange('address', 'Address')}>
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
							</button>
						</div>
						<div class="text-center dark:text-gray-400 non-active-form">
							<div>
								Currency <Select bind:value={$mainStore.user.info.currency} items={currency} />
							</div>
							<div>
								Units <Select bind:value={$mainStore.user.info.units} items={units} />
							</div>
						</div>
					</div>

					<div class="settings-section">
						<h2 class="uppercase dark:text-gray-400 text-xl mb-2">Security</h2>
						<form class="flex flex-col" action="#">
							<div class="mb-6">
								<Label for="default-input" class="block mb-2">Old Password:</Label>
								<Input id="default-input" placeholder="Default input" />
							</div>
							<div class="mb-6">
								<Label for="default-input" class="block mb-2">New Password:</Label>
								<Input id="default-input" placeholder="Default input" />
							</div>
							<Button on:click={save} class="w-full">Save</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">{toChange.label}</h3>
		<Label class="space-y-2">
			<Input
				bind:value={toChange.value}
				class="w-full"
				placeholder={toChange.placeholder}
				type={toChange.type}
			/>
		</Label>

		<Button on:click={() => setChange(toChange.item)} class="w-full1">Submit</Button>
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
		/* background-color: black; */
		border-radius: 10px;
		/* width: 100%; */
		min-height: fit-content;
	}
	.settings-container {
		width: 100%;
		/* max-width: 850px; */
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
