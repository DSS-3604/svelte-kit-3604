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

<div>
	<div class="profile-imgs">
		<div class="user-picture">
			<div class="user-pucture-background">
				<img src="profileDefault.webp" class="" alt="background-img" />
			</div>
			<div class="user-profile-picture ">
				<div class="profile-pic">
					<img
						class="h-auto max-w-full"
						src="https://imagizer.imageshack.com/img921/3072/rqkhIb.jpg"
						alt="profile-pic"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="grid sm:grid-cols-2 items-center justify-center gap-5 p-5">
		<div>
			<Card size="xl">
				<h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
					User Details
				</h5>
				<div class=" flex flex-col gap-2">
					<p class=" font-normal text-gray-500 dark:text-gray-400">Name: lorem ipsum</p>
					<p class=" font-normal text-gray-500 dark:text-gray-400">Business: lorem ipsum</p>
					<p class=" font-normal text-gray-500 dark:text-gray-400">Contact: lorem ipsum</p>
					<p class=" font-normal text-gray-500 dark:text-gray-400">Number of Posts: lorem ipsum</p>
					<p class=" font-normal text-gray-500 dark:text-gray-400">Product Type: lorem ipsum</p>
					<p class=" font-normal text-gray-500 dark:text-gray-400">Location: lorem ipsum</p>
				</div>
			</Card>
		</div>
		<div>
			<Card size="xl" class="flex items-center text-center">
				<img class="rounded-t-lg h-36" src="orange.webp" alt="product 1" />
				<p class="text-2xl dark:text-white p-5">Oranges</p>
			</Card>
		</div>
		<div class="">
			<Card size="xl">
				<form>
					<label for="editor" class="sr-only">Publish post</label>
					<Textarea id="editor" rows="8" class="mb-4" placeholder="Write a comment">
						<Toolbar slot="header" embedded>
							<ToolbarGroup>
								<ToolbarButton name="Attach file"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
										/></svg
									></ToolbarButton
								>
								<ToolbarButton name="Embed map"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
										/><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
										/></svg
									></ToolbarButton
								>
								<ToolbarButton name="Upload image"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/></svg
									></ToolbarButton
								>
							</ToolbarGroup>
							<ToolbarGroup>
								<ToolbarButton name="Add emoji"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
										/></svg
									></ToolbarButton
								>
							</ToolbarGroup>
							<ToolbarButton name="send" slot="end"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
									/></svg
								></ToolbarButton
							>
						</Toolbar>
					</Textarea>
					<Button>Post</Button>
				</form>
			</Card>
		</div>
		<div class="">
			<Card size="xl" padding="0">
				<div class="flex justify-center flex-col text-center">
					<img
						class="h-64 rounded-lg m-4"
						src="https://www.thespruceeats.com/thmb/chvLMHkhIDqPIxZnRrRg_CR2w_Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1135990803-d7634745adad465fb7f80e6fcae3f358.jpg"
						alt=""
					/>
					<p class="text-2xl dark:text-white p-3">
						Oranges Selling dragon fruits in Curep for a dollar!!
					</p>
				</div>
			</Card>
		</div>
	</div>
</div>

<style scoped>
	.user-activity {
		width: 100%;
		height: fit-content;
		margin-right: 10%;
		padding: 5px;
	}
	.previous-post img {
		max-width: 300px;
		max-height: 300px;
	}
	.profile-imgs {
		position: relative;
	}
	.user-picture {
		/*border: 5px solid black;*/
		height: fit-content;
	}
	.user-pucture-background {
		height: 360px;
		overflow: hidden;
		z-index: 1;
	}
	.user-pucture-background img {
		width: 100%;
		margin-top: -20%;
		filter: blur(3px);
		-webkit-filter: blur(3px);
	}
	.user-profile-picture {
		position: absolute;
		left: 5%;
		top: 10%;
		bottom: 0px;
		right: 0px;
		height: 180px;
		z-index: 2;
	}
	.profile-pic {
		max-width: 180px;
		max-height: 180px;
		border-radius: 3px;
		margin-top: 28px;
		overflow: hidden;
		box-shadow: 0 0 0 5px #fff;
	}
	.profile-pic img {
		width: 100%;
	}
	@media only screen and (max-width: 600px) {
		.profile-pic {
			max-width: 80px;
			max-height: 80px;
			border-radius: 3px;
			margin-top: 28px;
			overflow: hidden;
			box-shadow: 0 0 0 5px #fff;
		}
	}
</style>
