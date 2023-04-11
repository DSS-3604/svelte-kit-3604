<script lang="ts">
	import { comment } from 'postcss';
	import avatar from '$lib/images/avatar.webp';
	import { Timeline, TimelineItem, Select, Label, Button, Card } from 'flowbite-svelte';
	let state = 'dashboard';
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	import { onMount } from 'svelte';
	import SideBar from '../../components/sideBar.svelte';
	import utils from '$lib/stores/utils';
	import mainStore from '$lib/stores/mainStore';
	import pending from '$lib/images/pending.png';
	import { LineChart, BarChartSimple } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';
	import { goto } from '$app/navigation';
	let table = [];
	let keys = [];
	const tableNames = [
		{
			name: 'Users',
			value: 'users'
		},
		{
			name: 'Farmers Application',
			value: 'farmer_applications'
		},
		{
			name: 'Products',
			value: 'products'
		},
		{
			name: 'Contact Forms',
			value: 'contact_forms'
		},
		{
			name: 'Products Queries',
			value: 'product_queries'
		},
		{
			name: 'Product Categories',
			value: 'product_categories'
		},
		{
			name: 'Logs',
			value: 'logs'
		}
	];
	let reports = {};
	let selected = '';
	const applicationAction = async (action, id) => {
		$utils.farmerApplicationActions(action, id).then((res) => {
			if (res) {
				console.log('farmer application action', res);
			}
		});
	};
	const adminPageFetch = () => {
		$utils.fetchTable('users').then((res) => {
			table = res;
			keys = Object.keys(table[0]);
			console.log(table);
		});
		$utils.fetchReports().then((res) => {
			reports = {
				'New Users': res.new_user_count,
				'New Products': res.new_product_count,
				'New Farmers': res.new_farmer_count,
				'Pending Applications ': res.total_pending_applications_count
			};
		});
	};
	let logs = [];
	onMount(async () => {
		selected = 'users';
		if (!$mainStore.loggedIn) {
			$utils.silentLogin().then((res) => {
				if (!$mainStore.loggedIn || $mainStore.access_level !== 'admin') {
					goto('/');
				} else {
					$utils.getFarmerApplications();
					$utils.fetchLogs().then((res) => {
						logs = res;
						console.log('logs', logs);
					});
					adminPageFetch();
					getAdminMessages();
				}
			});
		} else {
			$utils.getFarmerApplications();
			$utils.fetchLogs().then((res) => {
				logs = res;
				console.log('logs', logs);
			});
			adminPageFetch();
			getAdminMessages();
		}
	});
	const getTable = async (e) => {
		$utils.fetchTable(selected).then((res) => {
			table = res;
			keys = Object.keys(table[0]);
		});
	};
	const download = async () => {
		$utils.downloadTable(selected).then((res) => {
			console.log('csv', res);
			const blob = new Blob([res], { type: 'text/csv' });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('hidden', '');
			a.setAttribute('href', url);
			const date = new Date();
			const dateTime = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}`;
			a.setAttribute('download', `${selected + dateTime}.csv`);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});
	};
	const getAdminMessages = async () => {
		$utils.getMessages('messages').then((res) => {
			console.log(res);
		});
	};
</script>

<div class="grid grid-cols-12">
	<div class="col-span-1 lg:col-span-2 2xl:col-span-1">
		<SideBar bind:state />
	</div>
	<div class="p-5 col-span-11 lg:col-span-10 2xl:col-span-11 container mx-auto">
		{#if state === 'dashboard'}
			<div class="flex flex-wrap -mx-3">
				{#each Object.entries(reports) as [key, value]}
					<div
						class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4 dark:text-white"
					>
						<div
							class="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-900 shadow-soft-xl rounded-2xl bg-clip-border"
						>
							<div class="flex-auto p-4">
								<div class="flex flex-row -mx-3">
									<div class="flex-none w-2/3 max-w-full px-3">
										<div>
											<p class="mb-0 font-sans font-semibold leading-normal text-size-sm">{key}</p>
											<h5 class="mb-0 font-bold">
												{value ? value : 0}
												<span class="leading-normal text-size-sm font-weight-bolder text-lime-500"
													>+5%</span
												>
											</h5>
										</div>
									</div>
									<div class="px-3 text-right basis-1/3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="inline-block w-12 h-12 text-center rounded-lg text-pink-500"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="flex flex-col lg:flex-row  w-full item gap-5 mt-5">
				<div class="flex flex-col gap-10 lg:w-3/4">
					<BarChartSimple
						class=" bg-white p-3"
						data={[
							{
								group: 'Users',
								date: '2019-01-01T04:00:00.000Z',
								value: 100
							},
							{
								group: 'Users',
								date: '2019-01-02T04:00:00.000Z',
								value: 65
							},
							{
								group: 'Users',
								date: '2019-01-03T04:00:00.000Z',
								value: 300
							},
							{
								group: 'Users',
								date: '2019-01-06T04:00:00.000Z',
								value: 492
							},
							{
								group: 'Users',
								date: '2019-01-07T04:00:00.000Z',
								value: 512
							}
						]}
						options={{
							title: 'Users (time series)',
							axes: {
								left: {
									mapsTo: 'value'
								},
								bottom: {
									mapsTo: 'date',
									scaleType: 'time'
								}
							},
							height: '400px'
						}}
					/>
					<BarChartSimple
						class=" bg-white p-3"
						data={[
							{
								group: 'Products',
								date: '2019-01-01T04:00:00.000Z',
								value: 35
							},
							{
								group: 'Products',
								date: '2019-01-02T04:00:00.000Z',
								value: 70
							},
							{
								group: 'Products',
								date: '2019-01-03T04:00:00.000Z',
								value: 90
							},
							{
								group: 'Products',
								date: '2019-01-06T04:00:00.000Z',
								value: 100
							},
							{
								group: 'Products',
								date: '2019-01-07T04:00:00.000Z',
								value: 120
							}
						]}
						options={{
							title: 'Products (time series)',
							axes: {
								left: {
									mapsTo: 'value'
								},
								bottom: {
									mapsTo: 'date',
									scaleType: 'time'
								}
							},
							height: '400px'
						}}
					/>
				</div>
				<div class="dark:bg-gray-900 pl-10 rounded-2xl lg:w-1/4 overflow-auto">
					<div class="dark:text-white p-6 pb-0">
						<h6>Activity Log</h6>
						<p class="leading-normal text-size-sm">
							<i class="fa fa-arrow-up text-lime-500" />
							<span class="font-semibold">+24%</span> this month
						</p>
					</div>
					<br />
					<div class="w-full">
						<div class="relative h-96">
							<Timeline order="vertical">
								{#each logs.reverse() as item}
									<!-- content here -->
									<TimelineItem
										title={item.description}
										date={$utils.timeConverter(item.timestamp)}
									>
										<svelte:fragment slot="icon">
											<span
												class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
											>
												<svg
													aria-hidden="true"
													class="w-3 h-3 text-blue-600 dark:text-blue-400"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
													><path
														fill-rule="evenodd"
														d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
														clip-rule="evenodd"
													/></svg
												>
											</span>
										</svelte:fragment>
										<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
											<!-- Get access to over 20+ pages including a dashboard layout, charts, kanban board,
											calendar, and pre-order E-commerce & Marketing pages. -->
										</p>
									</TimelineItem>
								{/each}
							</Timeline>
						</div>
					</div>
				</div>
			</div>
			<!-- Farmer Applications -->
		{:else if state === 'tables'}
			<div class="w-full">
				<div class="pb-8 dark:bg-gray-900 rounded-2xl p-5">
					<div
						class=" shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid  bg-clip-border"
					>
						<div class=" mb-0 p-6 pb-0 dark:text-white">
							<div class="flex justify-between">
								<Label
									>Select Table
									<Select
										class="mt-2"
										items={tableNames}
										bind:value={selected}
										on:change={(e) => {
											getTable(e);
										}}
									/>
								</Label>
								<button class="" on:click={download}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6 "
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
										/>
									</svg>
								</button>
							</div>
							<div class="flex flex-wrap mt-0 -mx-3">
								<div class="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none" />
							</div>
						</div>
						<div class="flex-auto p-6 px-0 pb-2 ">
							<div class="overflow-x-auto">
								<table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
									<thead class="align-bottom dark:white">
										<tr>
											{#each keys as item}
												<th
													class="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70"
												>
													{item}</th
												>
											{/each}
										</tr>
									</thead>
									<tbody>
										{#each table as item}
											<tr>
												{#each Object.values(item) as value}
													<td class="p-2 align-middle bg-transparent border-b">
														<div class="flex px-2 gap-2 py-1">
															<div class="flex flex-col justify-center sm:w-full">
																<h6 class="mb-0 leading-normal text-size-sm">{value}</h6>
															</div>
														</div>
													</td>
												{/each}
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else if state === 'users'}
			<h3 class="dark:text-gray-300 text-center">Pending Farmer Applications</h3>
			{#if $mainStore.farmerApplications.length === 0}
				<div class="flex  justify-center mt-5">
					<div
						class="flex justify-center h-48 rounded-lg w-80 bg-gray-900 items-center text-center"
					>
						<p class="text-center text-gray-300 dark:text-gray-400">No pending applications</p>
					</div>
				</div>
			{/if}
			<div class="mt-5 overflow-x-auto grid grid-flow-col gap-7">
				{#each $mainStore.farmerApplications as item}
					<Card class="w-80 relative  dark:bg-gray-900 dark:text-gray-200 border-none" color="none">
						<p class="text-sm absolute  right-3 top-3">
							{$utils.timeConverter(item.created_timestamp)}
						</p>
						<div class="flex gap-10">
							<div class="">
								<img src={pending} alt="pending" class="w-16" />
							</div>
							<div class="w-3/4">
								<div class="flex flex-col">
									<p class="font-md mt-5 truncate">
										User: {item.user_name}
									</p>
								</div>
							</div>
						</div>
						<p class="font-md">Comment:</p>
						<p class="font-md overflow-auto max-h-28 ">
							{item.comment}
						</p>
						<div class="flex justify-between mt-3">
							<Button
								size="xs"
								color="green"
								class=" text-white font-bold py-2 px-4 rounded"
								on:click={() => {
									applicationAction('approve', item.id);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
								</svg>
							</Button>
							<Button
								size="xs"
								color="red"
								class=" text-white font-bold py-2 px-4 rounded"
								on:click={() => {
									applicationAction('reject', item.id);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</Button>
						</div>
					</Card>
				{/each}
			</div>

			<h3 class="dark:text-gray-300 text-center m-5">Messages</h3>
			<div class="mt-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
				{#each $mainStore.contactForm as item}
					<Card class="w-80 relative  dark:bg-gray-900 dark:text-gray-200 border-none" color="none">
						<div class="flex gap-10">
							<div class="">
								<img src={avatar} alt="pending" class=" rounded-full w-16" />
							</div>
							<div class="w-3/4">
								<div class="flex flex-col">
									<p class="font-md truncate">
										User: {item.name}
									</p>
									<p class="font-md truncate">
										Phone: {item.phone}
									</p>
									<p class="font-md truncate flex gap-2">
										<span> Email: </span>
										<a href="mailto:{item.email}" class="underline text-blue-500">
											<p class="truncate">
												{item.email}
											</p>
										</a>
									</p>
									<p class="text-sm truncate">
										{$utils.timeConverter(item.timestamp)}
									</p>
								</div>
							</div>
						</div>
						<p class="font-md">Message:</p>
						<p class="font-md overflow-auto max-h-28 ">
							{item.message}
						</p>
						<div class="flex justify-between">
							{#if item.resolved === false}
								<Button
									size="xs"
									color="green"
									on:click={() => $utils.resolveMessage(item)}
									class=" bg-primary mt-4 font-bold py-2 px-4 rounded"
								>
									Mark as Resolved
								</Button>
								<Button size="xs" color="blue" class="mt-4 font-bold py-2 px-4 rounded">
									<a href="mailto:{item.email}">
										<p class="text-gray-200 text-sm">Reply</p>
									</a>
								</Button>
							{:else}
								<Button
									size="xs"
									color="green"
									disabled
									class=" bg-primary mt-4 font-bold py-2 px-4 rounded"
								>
									Resolved
								</Button>
								<Button size="xs" disabled color="blue" class="mt-4 font-bold py-2 px-4 rounded">
									Reply
								</Button>
							{/if}
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</div>
</div>
