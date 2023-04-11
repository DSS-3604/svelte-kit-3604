<script>
	import { Label, Input, Helper, Textarea, Button } from 'flowbite-svelte';
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte/internal';

	let name = '';
	let number = '';
	let email = '';
	let message = '';
	let error = '';

	onMount(async () => {
		if (!$mainStore.loggedIn) {
			$utils.silentLogin().then((res) => {
				if (!$mainStore.loggedIn) {
					goto('/');
				}
			});
		}
	});

	const sendMessage = async () => {
		error = '';
		console.log('message', message);
		if (name != '' && number != '' && email != '' && message != '') {
			let sending = {
				name: name,
				phone: number,
				email: email,
				message: message
			};
			$utils.submitContactForm(sending).then((res) => {
				if (res) {
					name = '';
					number = '';
					email = '';
					message = '';
				} else {
					error = 'Could not send message.';
					console.log(error);
				}
			});
		} else {
			error = 'Please fill all fields.';
		}
	};
</script>

<div class="m-5">
	<div>
		<p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
			Contact Us
		</p>
	</div>
	<div>
		<p class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
			Administration Contact Form
		</p>
	</div>
	<div
		class="m-5 w-3/4 w-full mt-4 p-5 justify-center border-2 border-dashed border-gray-600 rounded-lg center"
	>
		<form>
			<div class="mb-6">
				<Label class="block mb-2">Full Name</Label>
				<Input
					bind:value={name}
					label="name"
					id="name"
					name="name"
					required
					placeholder="Full Name"
				/>
			</div>
			<div class="mb-6">
				<Label class="block mb-2">Phone Number</Label>
				<Input
					bind:value={number}
					label="number"
					id="number"
					name="number"
					required
					placeholder="Phone Number"
				/>
			</div>
			<div class="mb-6">
				<Label class="block mb-2">Your email</Label>
				<Input
					bind:value={email}
					label="email"
					id="email"
					name="email"
					required
					placeholder="name@flowbite.com"
				/>
			</div>
			<div class="mb-6">
				<Label class="block mb-2">Message Details</Label>
				<Textarea
					bind:value={message}
					label="message"
					id="message"
					name="message"
					required
					placeholder="I would like information."
				/>
			</div>
			<Button
				type="submit"
				class="w-full text-white text-base xs:text-3xl bg-primary-light p-2 lg:p-4  m-2 rounded-xl"
				color="lime"
				on:click={sendMessage}>Submit</Button
			>
		</form>
	</div>
</div>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<style>
	.center {
		margin-left: auto;
		margin-right: auto;
	}
</style>
