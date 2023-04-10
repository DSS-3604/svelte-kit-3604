<script lang="ts">
	import avatar from '$lib/images/avatar.webp';
	import { Timeline, TimelineItem, Select, Label, Button, Card} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import utils from '$lib/stores/utils';
	import mainStore from '$lib/stores/mainStore';
	import { goto } from '$app/navigation';
	let table = [];
	let keys = [];
	let tkeys=["name", "phone", "email", "message", "time"];
	const tableNames = [
		{
			name: 'Users',
			value: 'users'
		},
		// {
		// 	name: 'Farmers Application',
		// 	value: 'farmers_application'
		// },
		{
			name: 'Products',
			value: 'products'
		}
		// {
		// 	name: 'Product Categories',
		// 	value: 'product_categories'
		// },
		// {
		// 	name: 'Logs',
		// 	value: 'logs'
		// },
		// {
		// 	name: 'Product Comments',
		// 	value: 'product/comments'
		// }
	];
	let reports = {};
	let selected = '';
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
	onMount(async () => {
		// if ($mainStore.access_level !== 'admin') {
		// 	goto('/');
		// }
		selected = 'users';
		if (!$mainStore.loggedIn) {
			$utils.silentLogin().then((res) => {
				if (!$mainStore.loggedIn || $mainStore.access_level !== 'admin') {
					goto('/');
				} else {
					adminPageFetch();
					getAdminMessages();
				}
			});
		} else {
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
			console.log("why:",res);
		});
	};
</script>

<div class="p-5">
	<!-- row 1 -->
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
	<div class="flex flex-wrap my-6 -mx-3 ">
		<div
			class="pb-8 dark:bg-gray-900 rounded-2xl w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/3 lg:flex-none"
		>
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

		<!-- card 2 -->

		<div class="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
			<div class="dark:bg-gray-900 pl-10 rounded-2xl">
				<div class="dark:text-white p-6 pb-0">
					<h6>Activity Log</h6>
					<p class="leading-normal text-size-sm">
						<i class="fa fa-arrow-up text-lime-500" />
						<span class="font-semibold">+24%</span> this month
					</p>
				</div>
				<br />
				<div class="flex-auto">
					<div class="relative h-96">
						<Timeline order="vertical">
							{#each [1, 2, 3, 4] as item}
								<!-- content here -->
								<TimelineItem title="New Farmer" date="January 13th, 2022">
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
			<div class="dark:bg-gray-900 pl-10 rounded-2xl pb-8 dark:bg-gray-900 rounded-2xl w-full max-w-full px-3 mt-3 md:flex-none lg:flex-none p-5">
				<h6 class="dark:text-white">Contact Form Requests</h6>
				<div class="flex-auto p-6 px-0 pb-2 ">
					<div class="overflow-x-auto">
						<table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
							<thead class="align-bottom dark:white">
								<tr>
									{#each tkeys as item}
										<th
											class="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70"
										>
											{item}</th
										>
									{/each}
								</tr>
							</thead>
							<tbody>
								<h1>{$mainStore.contactForm}</h1>
								<!-- {#each $mainStore.contactForm as item}
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
								{/each} -->
							</tbody>
						</table>
					</div>
				</div>


			</div>
		</div>
	</div>
</div>
