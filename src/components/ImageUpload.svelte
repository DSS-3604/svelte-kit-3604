<script lang="ts">
	import utils from '$lib/stores/utils';
	import { Button } from 'flowbite-svelte';
	import mainStore from '$lib/stores/mainStore';
	let avatar: string, fileinput;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		uploadImage(image);
	};
	const uploadImage = async (image) => {
		const formData = new FormData();
		formData.append('image', image);
		const res = await fetch('https://api.imgbb.com/1/upload?key=fea6b09c3477595b6e498116bfeedb0a', {
			method: 'POST',
			body: formData
		});
		const data = await res.json();
		console.log(data.data.url);
		avatar = data.data.url;
	};
	const updateAvatar = async () => {
		let newInfo = {
			avatar: avatar,
			id: $mainStore.user.info.id
		};
		$utils.updateUserInfo(newInfo).then((res) => {
			$mainStore.user.info.avatar = avatar;
		});
	};
</script>

<div class="bg-gray-white w-full dark:bg-gray-800 p-3 rounded-xl">
	<div
		class="mt-1 mb-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
	>
		{#if avatar}
			<div class="">
				<div>
					<img class="p-2 rounded-t-lg h-36" src={avatar} alt="d" />
				</div>
			</div>
		{:else}
			<div class="space-y-1 text-center">
				<svg
					class="mx-auto dark:text-gray-400"
					stroke="currentColor"
					fill="none"
					viewBox="0 0 48 48"
					aria-hidden="true"
				>
					<path
						d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<div class="flex text-sm text-gray-600">
					<label
						for="file-upload"
						class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
					>
						<span
							class=""
							on:click={() => {
								fileinput.click();
							}}>Upload a file</span
						>
						<input
							style="display:none"
							type="file"
							accept=".jpg, .jpeg, .png"
							on:change={(e) => onFileSelected(e)}
							bind:this={fileinput}
						/>
					</label>
					<p class="pl-1 dark:text-gray-300 ">or drag and drop</p>
				</div>
				<p class="text-xs dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
			</div>
		{/if}
	</div>
	{#if avatar}
		<div class="pt-2">
			<Button class="w-full" color="blue" on:click={updateAvatar}>Save</Button>
		</div>
	{/if}
</div>
