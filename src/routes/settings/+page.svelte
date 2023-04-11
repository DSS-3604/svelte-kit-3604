<script lang="ts">
	import avatar from '$lib/images/avatar.webp';
	import {
		Button,
		Input,
		Label,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Modal,
		Avatar,
		Select,
		Textarea
	} from 'flowbite-svelte';
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';
	import ImageUpload from '../../components/ImageUpload.svelte';
	let formModal = false;
	let avatarModal = false;
	let upgradeModal = false;
	let upgrade = {
		comment: ''
	};
	let toChange = {
		value: '',
		placeholder: '',
		label: '',
		type: 'text',
		item: ''
	};
	let accessColor = '';

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
		let newInfo = {
			[item]: toChange.value,
			id: $mainStore.user.info.id
		};
		if (item === 'currency' || item === 'units') {
			//@ts-ignore
			newInfo[item] = $mainStore.user.info[item];
		}
		$utils.updateUserInfo(newInfo).then((res: any) => {
			if (res.message) {
				if (res.message) {
					error = res.message;
				}
			} else {
				//@ts-ignore
				$mainStore.user.info[item] = newInfo[item];
				formModal = false;
			}
		});
	};
	let error = '';
	const accessChecker = () => {
		if ($mainStore.access_level === 'user') {
			accessColor = 'text-red-500';
		} else if ($mainStore.access_level === 'farmer') {
			accessColor = 'text-green-500';
		} else if ($mainStore.access_level === 'admin') {
			accessColor = 'text-blue-500';
		}
	};
	onMount(() => {
		$utils.silentLogin().then(() => {
			if ($mainStore.loggedIn) {
				$utils.fetchUserInfo().then((res) => {});
				accessChecker();
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
	const password = {
		new: '',
		confirm: '',
		old: ''
	};
	let password_error = '';
	const changePassword = () => {
		password_error = '';
		if (password.new === password.confirm) {
			let newInfo = {
				old_password: password.old,
				password: password.new,
				id: $mainStore.user.info.id
			};
			$utils.updateUserInfo(newInfo).then((res) => {
				if (res.message) {
					if (!res.message.includes('updated')) {
						password_error = res.message;
					} else {
						formModal = false;
					}
				}
			});
		}
	};

	const upgradeAccount = () => {
		$utils.upgradeAccount(upgrade).then((res) => {
			upgradeModal = false;
		});
	};
</script>

<div class="flex justify-center min-h-full">
	<div class="flex md:grid-cols-1 justify-center w-full items-center">
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
									on:click={() => (avatarModal = true)}
									class="text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
									>Change Profile Picture</button
								>
							</div>
						</div>
					</div>
					<div class="settings-section">
						<h2 class="uppercase dark:text-gray-400 text-xl mb-2">Account</h2>
						<div class="non-active-form">
							<p class="dark:text-gray-400">Username: {$mainStore.user.info.username}</p>
							<button on:click={() => setToChange('username', 'Username')}>
								<svg
									class="h-8 w-8 button"
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
							<p class="dark:text-gray-400">
								Account Type:
								<span class="{accessColor} capitalize">
									{$mainStore.access_level}
								</span>
							</p>
							{#if $mainStore.access_level === 'user'}
								<button class="p-2" on:click={() => (upgradeModal = true)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-10 h-10 hover:text-green-400 text-primary-light"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
										/>
									</svg>
								</button>
							{/if}
						</div>
					</div>
					<div class="settings-section">
						<h2 class="uppercase dark:text-gray-400 text-xl mb-2">General Information</h2>
						<div class="non-active-form">
							<p class="dark:text-gray-400">Email: {$mainStore.user.info.email}</p>
							<button on:click={() => setToChange('email', 'email')}>
								<svg
									class="h-8 w-8 button"
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
							<p class="dark:text-gray-400">Phone: {$mainStore.user.info.phone}</p>
							<button on:click={() => setToChange('phone', 'Phone')}>
								<svg
									class="h-8 w-8 button"
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
									class="h-8 w-8 button"
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
									class="h-8 w-8 button"
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
						<div class="dark:text-gray-400 non-active-form">
							<div>
								<Label>Currency</Label>
								<Select
									bind:value={$mainStore.user.info.currency}
									on:change={() => setChange('currency')}
									items={currency}
								/>
							</div>
							<div>
								<Label>Units</Label>
								<Select
									bind:value={$mainStore.user.info.units}
									on:change={() => setChange('units')}
									items={units}
								/>
							</div>
						</div>
					</div>

					<div class="settings-section">
						<h2 class="uppercase dark:text-gray-400 text-xl mb-2">Security</h2>
						<form class="flex flex-col" action="#">
							<div class="mb-6">
								<Label for="old-password" class="block mb-2">Old Password:</Label>
								<Input
									id="old-password"
									bind:value={password.old}
									placeholder="Old password"
									type="password"
								/>
							</div>
							<div class="mb-6">
								<Label for="new-password" class="block mb-2">New Password:</Label>
								<Input
									id="new-password"
									bind:value={password.new}
									placeholder="New password"
									type="password"
								/>
							</div>
							<div class="mb-6">
								<Label for="repeat-password" class="block mb-2">Repeat Password:</Label>
								<Input
									id="repeat-password"
									bind:value={password.confirm}
									placeholder="Repeat password"
									type="password"
								/>
							</div>
							{#if password.new !== password.confirm}
								<p class="text-red-500 text-sm">Passwords do not match</p>
							{/if}
							<p class="text-red-500 text-sm">{password_error}</p>
							<Button
								on:click={changePassword}
								class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
								color="lime">Save Password</Button
							>
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
		<p class="text-red-500 text-sm">{error}</p>
		<Button
			on:click={() => setChange(toChange.item)}
			class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
			color="lime">Submit</Button
		>
	</form>
</Modal>
<Modal bind:open={upgradeModal} size="xs" autoclose={false} class="w-full">
	<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Upgrade to Farmer</h3>
	<Label class="space-y-2">
		<Textarea
			rows="7"
			bind:value={upgrade.comment}
			placeholder="Tell us why you want to upgrade to a farmer"
			class="w-full"
		/>
	</Label>
	<Button on:click={upgradeAccount} class="w-full">Submit</Button>
</Modal>

<Modal bind:open={avatarModal} size="xs" class="w-full">
	<ImageUpload />
</Modal>

<svelte:head>
	<title>Settings</title>
</svelte:head>

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
	.button {
		cursor: pointer;
		color: #454545;
		transition: all 0.5s;
		margin-right: 10px;
	}
	.button:hover {
		color: green;
		transform: scale(1.1);
	}
</style>
