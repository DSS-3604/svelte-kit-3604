<script>
	import '../app.postcss';
	import { Chevron, DarkMode } from 'flowbite-svelte';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Tooltip,
		Avatar
	} from 'flowbite-svelte';
	let placement = 'bottom';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 m-1 z-50';
</script>

<div class="sticky top-0 z-40">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<DarkMode btnClass={darkmodebtn} />
			<img src="carigro-logo.webp" class="mr-3 h-6 sm:h-9 p-0" alt="Carigo Logo" />
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/catalog">Catalog</NavLi>
			<NavLi href="/my-products">Products</NavLi>
			<NavLi href="/contact">Contact</NavLi>
			<NavLi id="nav-menu1" class="cursor-pointer">
				<Avatar src="avatar.webp" size="xs" />
			</NavLi>
			<Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
				<DropdownItem href="/my-profile">Profile</DropdownItem>
				<DropdownItem>Settings</DropdownItem>
				<DropdownItem>Earnings</DropdownItem>
				<DropdownDivider />
				<DropdownItem>Sign out</DropdownItem>
			</Dropdown>
		</NavUl>
	</Navbar>
</div>
<slot />

<svelte:head>
	<title>Home</title>
</svelte:head>
