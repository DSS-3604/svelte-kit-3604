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
		CarouselTransition
	} from 'flowbite-svelte';
</script>

<div class="user-account">
	<div class="profile-imgs">
		<div class="user-picture" style="">
			<div class="user-pucture-background">
				<img src="https://imagizer.imageshack.com/img921/9628/VIaL8H.jpg" alt="background-img" />
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

	<div class="user-information">
		<div class="side-info">
			<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 user-details">
				<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">User Details</h5>

				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Name: </p>
				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Business: </p>
				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Contact: </p>
				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Number of Posts: </p>
				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Product Type: </p>
				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Location: </p>

			</div>

			<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 user-recent">
				<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Recent Viewed</h5>

				<Card padding="5px" class="flex items-center text-center p-5">
					<!-- <a href="/"> -->
					<img class="rounded-t-lg h-40" src="orange.webp" alt="product 1" />
					<!-- </a> -->
					<p class="text-2xl dark:text-white p-5">Oranges</p>
				</Card>
			</div>
		</div>
		<div class="user-activity">

		</div>
	</div>
</div>

<style>
	.user-information{
		margin-top: 15px;
		width: 100%;
		display: flex;
		background-color: green;
		height:fit-content;
	}
	.side-info{
		width: 30%;
		padding: 5px;
		background-color:orange;
		border: 5px solid red;
		height:fit-content;
		margin-left: 10%;
		margin-right: 15px;
	}
	.user-recent{
		margin-top: 15px;
	}
	.user-activity{
		width: 100%;
		background-color:white;
		border: 5px solid yellow;
		height:fit-content;
		margin-right: 10%;
	}


	.profile-imgs {
		position: relative;
	}
	.user-picture {
		border: 5px solid black;
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
