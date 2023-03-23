<script lang="ts">
	import { onMount } from 'svelte/internal';
	import mainStore from '$lib/stores/mainStore';
	import utils from '$lib/stores/utils';
	import { PUBLIC_API_URL } from '$env/static/public';
	import {
		Card,
		Button,
		Input,
		InputAddon,
		ButtonGroup,
		Chevron,
		Dropdown,
		Modal,
		DropdownItem,
		Rating,
		Textarea,
		Badge
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let products = [];
	let rate = false;
	let itemToRate = {
		id: 0,
		name: '',
		image: '',
		farmer_id: 0,
		rating: 0,
		reviews: []
	};
	onMount(() => {
		$utils.fetchProducts();
		$utils.silentLogin().then(() => {
			$utils.fetchProducts();
		});
	});
</script>

<div class="card">
	<section class="report-dashboard">
		<h2 class="report-dashboard-title">Weekly Performance</h2>
		<div class="row">
			<div class="flex-container">
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">New Users</div>
					<div class="report-dashboard-number">80</div>
				</div>
				<!-- .report-dashboard-item -->
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">New Farmers</div>
					<div class="report-dashboard-number">16</div>
				</div>
				<!-- .report-dashboard-item -->
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">New Contact Form Requests</div>
					<div class="report-dashboard-number">6</div>
				</div>
				<!-- .report-dashboard-item -->
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">Number of Products</div>
					<div class="report-dashboard-number">58</div>
				</div>
				<!-- .report-dashboard-item -->
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">Number of Posts</div>
					<div class="report-dashboard-number">164</div>
				</div>
				<!-- .report-dashboard-item -->
			</div>
			<!-- .flex-container -->
		</div>
		<!-- /.row -->

		<div class="row">
			<div class="flex-container">
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">Resolved Contact Requests</div>
					<div class="report-dashboard-number">20<span class="percentage-unit">%</span></div>
				</div>
				<!-- /.report-dashboard-item -->
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">Average Change in Quantity of Products</div>
					<div class="report-dashboard-number">29<span class="percentage-unit">%</span></div>
				</div>
				<!-- /.report-dashboard-item -->
			</div>
			<!-- /.flex-container -->
		</div>
		<!-- /.row -->

		<div class="row">
			<div class="flex-container">
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">Total Members</div>
					<div class="report-dashboard-number"><span class="dollar-unit"></span>1179</div>
				</div>
				<!-- /.report-dashboard-item -->
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">Total Farmers</div>
					<div class="report-dashboard-number"><span class="dollar-unit"></span>700</div>
				</div>
				<!-- /.report-dashboard-item -->
				<div class="report-dashboard-item">
					<div class="report-dashboard-label">Total Products</div>
					<div class="report-dashboard-number"><span class="dollar-unit"></span>96</div>
				</div>
				<!-- /.report-dashboard-item -->
			</div>
			<!-- /.flex-container -->
		</div>
		<!-- /.row -->
	</section>
	<!-- /.report-dashboard -->

	<section class="eodr-section">
		<h2 class="eodr-section-title">Daily Numbers</h2>
		<ul class="accordion">
			<li>
				<div class="">
					<h1>Posts By Farmers</h1>
					<table class="eodr-data-table">
						<thead>
							<tr>
								<th class="eodr-data-table-cell--non-numeric">Name</th>
								<th>Number of Posts</th>
								<th>Posts Status</th>
							</tr>
						</thead>
						<tbody>
							<tr class="on-target">
								<td class="eodr-data-table-cell--non-numeric">Frank Sinatra</td>
								<td>3</td>
								<td>Active</td>
							</tr>
							<tr>
								<td class="eodr-data-table-cell--non-numeric">Prakash Ramoutar</td>
								<td>10</td>
								<td>Inactive</td>
							</tr>
						</tbody>
					</table>
				</div>
			</li>
		</ul>
		<!-- /.accordion -->
	</section>
	<!-- /.eodr-section -->
</div>

<style>
	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		padding: 20px;
		width: 98vw;
		margin: 0 auto;
		background-color: white;
		border-radius: 10px;
		margin-top: 4px;
	}
	.card:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}

	h2 {
		color: #333;
		font-family: 'Alegreya Sans';
		font-size: 28px;
		font-weight: 300;
		line-height: 1;
		letter-spacing: -0.015em;
		margin-bottom: 36px;
		max-width: 600px;
	}

	h2:before {
		background: #2fa500;
		content: '';
		display: block;
		height: 3px;
		margin: 12px 0;
		width: 50px;
	}

	* {
		box-sizing: border-box;
		font-family: sans-serif;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	body {
		background-color: #eee;
		max-width: 90%;
		margin: 1.5em auto;
		padding: 5rem;
	}

	ul .inner {
		padding-left: 0;
		overflow: hidden;
		display: none;
	}

	ul li {
		margin-bottom: 1rem;
		background-color: #fff;
		list-style: none;
	}

	thead {
		border-bottom: 1px solid #eee;
	}

	th,
	td {
		box-sizing: border-box;
		padding: 12px 18px;
		font-size: 12px;
	}

	/* Base Styles */

	.eodr-data-table {
		border-bottom: 1px solid #ebeff6;
		text-align: right;
		width: 100%;
	}

	.eodr-data-table-cell--non-numeric {
		text-align: left;
	}

	/* Accordion Component */

	.accordion {
		padding: 0;
	}

	.accordion--item {
		background-color: #fff;
		position: relative;
		border-right: 1px solid #ebeff6;
		border-bottom: 1px solid #ebeff6;
		padding: 2rem;
		text-align: center;
		flex-grow: 1;
		flex-basis: 100%;
	}

	@media screen and (min-width: 40em) {
		.accordion--item {
			flex-basis: 33.33%;
		}
	}

	.accordion--item:nth-child(3),
	.accordion--item:last-child {
		border-right: none;
	}

	.accordion--numberValue {
		font-size: 6.25rem;
	}

	.accordion--byline {
		color: #bbbbbb;
		display: block;
		font-size: 0.75rem;
	}

	.accordion--subitem {
		font-size: 14px;
	}

	.percentage-unit {
		font-size: 16px;
		position: absolute;
		top: 65px;
	}

	/* Flex Container */

	.flex-container {
		display: flex;
		flex-wrap: wrap;
	}

	.is-collapsed:after,
	.is-expanded:after {
		font-family: 'Font Awesome 5 Free';
		font-size: 10px;
		position: absolute;
		right: 25px;
		top: 22px;
	}

	.is-collapsed:after {
		content: '';
	}

	.is-expanded:after {
		content: '';
	}

	.is-expanded {
		color: #d60c8c;
	}

	/* Flags */

	.on-target {
		color: green;
	}

	/* Reporting Styles */

	.report-dashboard {
		margin-bottom: 4rem;
	}
	.report-dashboard .row {
		margin-bottom: 1rem;
	}

	.report-dashboard-item {
		background-color: #fff;
		border-right: 1px solid #ebeff6;
		border-bottom: 1px solid #ebeff6;
		flex-grow: 1;
		flex-basis: 20%;
		text-align: center;
		padding: 2rem;
		position: relative;
	}

	.report-dashboard-label {
		color: #999;
		display: block;
		font-size: 0.875rem;
		margin-bottom: 0.675rem;
	}

	.report-dashboard-number {
		color: #525252;
		font-size: 2.25rem;
	}
</style>


<svelte:head>
	<title>Report</title>
</svelte:head>