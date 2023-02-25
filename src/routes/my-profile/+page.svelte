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

	<div class="user-information" style="background-color: green;height:30vh">
		<div class="side-info">

		</div>
		<div class="user-activity">

		</div>
	</div>
</div>

<style>
	.user-information{
		width: 100%;
		display: flex;
	}
	.side-info{
		width: 30%;
		background-color:orange;
		height:10px;
		margin-left: 10%;
	}
	.user-activity{
		width: 100%;
		background-color:white;
		height:10px;
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
