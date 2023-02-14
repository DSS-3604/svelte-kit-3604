<div class="sidebar-contact">
	<div class="toggle" />
	<h2>Contact Us</h2>
	<div class="scroll">
		<h1>Phone:</h1>
		<h1>Address:</h1>
	</div>
</div>

<div class="formbold-main-wrapper">
	<!-- Author: FormBold Team -->
	<!-- Learn More: https://formbold.com -->
	<div class="formbold-form-wrapper">
		<form action="https://formbold.com/s/FORM_ID" method="POST">
			<div class="formbold-mb-5">
				<label for="name" class="formbold-form-label"> Full Name </label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Full Name"
					class="formbold-form-input"
					required
				/>
			</div>
			<div class="formbold-mb-5">
				<label for="phone" class="formbold-form-label"> Phone Number </label>
				<input
					type="text"
					name="phone"
					id="phone"
					placeholder="Enter your phone number"
					class="formbold-form-input"
				/>
			</div>
			<div class="formbold-mb-5">
				<label for="email" class="formbold-form-label"> Email Address </label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Enter your email"
					class="formbold-form-input"
					required
				/>
			</div>
			<div class="formbold-mb-5">
				<label for="email" class="formbold-form-label"> Date </label>
				<input type="date" name="date" id="date" class="formbold-form-input" />
			</div>
			<div class="formbold-mb-5">
				<label class="formbold-form-label formbold-form-label-2"> Message Details </label>
				<textarea
					type="text"
					name="area"
					id="area"
					placeholder="Details..."
					class="formbold-form-input"
					required
					maxlength="1080"
					minlength="100"
				/>
			</div>

			<div>
				<button class="formbold-btn">Send</button>
			</div>
		</form>
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		font-family: 'Inter', Arial, Helvetica, sans-serif;
	}
	.formbold-mb-5 {
		margin-bottom: 20px;
	}
	.formbold-pt-3 {
		padding-top: 12px;
	}
	.formbold-main-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 48px;
	}

	.formbold-form-wrapper {
		margin: 0 auto;
		max-width: 550px;
		width: 100%;
		background: white;
		padding: 20px;
		border-radius: 1.5%;
	}

	.formbold-form-label {
		display: block;
		font-weight: 500;
		font-size: 16px;
		color: #07074d;
		margin-bottom: 12px;
	}
	.formbold-form-label-2 {
		font-weight: 600;
		font-size: 20px;
		margin-bottom: 20px;
		display: block;
		overflow: hidden;
		overflow-y: auto;
	}

	.formbold-form-input {
		width: 100%;
		padding: 12px 24px;
		border-radius: 6px;
		border: 1px solid #e0e0e0;
		background: white;
		font-weight: 500;
		font-size: 16px;
		color: #6b7280;
		outline: none;
		resize: none;
	}
	.formbold-form-input:focus {
		border-color: #6a64f1;
		box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
	}

	.formbold-btn {
		text-align: center;
		font-size: 16px;
		border-radius: 6px;
		padding: 14px 32px;
		border: none;
		font-weight: 600;
		background-color: #6a64f1;
		color: white;
		width: 100%;
		cursor: pointer;
	}
	.formbold-btn:hover {
		box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
	}

	.formbold--mx-3 {
		margin-left: -12px;
		margin-right: -12px;
	}
	.formbold-px-3 {
		padding-left: 12px;
		padding-right: 12px;
	}
	.flex {
		display: flex;
	}
	.flex-wrap {
		flex-wrap: wrap;
	}
	.w-full {
		width: 100%;
	}

	@media (min-width: 540px) {
		.sm\:w-half {
			width: 50%;
		}
	}

	.sidebar-contact {
		position: fixed;
		top: 50%;
		left: -350px;
		transform: translateY(-50%);
		width: 350px;
		height: auto;
		padding: 40px;
		background: #fff;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
		box-sizing: border-box;
		transition: 0.5s;
	}
	.sidebar-contact.active {
		left: 0;
	}
	.sidebar-contact input,
	.sidebar-contact textarea {
		width: 100%;
		height: 36px;
		padding: 5px;
		margin-bottom: 10px;
		box-sizing: border-box;
		border: 1px solid rgba(0, 0, 0, 0.5);
		outline: none;
	}
	.sidebar-contact h2 {
		margin: 0 0 20px;
		padding: 0;
	}
	.sidebar-contact textarea {
		height: 60px;
		resize: none;
	}
	.sidebar-contact input[type='submit'] {
		background: #00bcd4;
		color: #fff;
		cursor: pointer;
		border: none;
		font-size: 18px;
	}
	.toggle {
		position: absolute;
		height: 48px;
		width: 48px;
		text-align: center;
		cursor: pointer;
		background: #f00;
		top: 0;
		right: -48px;
		line-height: 48px;
	}
	.toggle:before {
		content: '\f003';
		font-family: fontAwesome;
		font-size: 18px;
		color: #fff;
	}
	.toggle.active:before {
		content: '\f00d';
	}
	@media (max-width: 768px) {
		.sidebar-contact {
			width: 100%;
			height: 100%;
			left: -100%;
		}
		.sidebar-contact .toggle {
			top: 50%;
			transform: translateY(-50%);
			transition: 0.5s;
		}
		.sidebar-contact.active .toggle {
			top: 0;
			right: 0;
			transform: translateY(0);
		}
	}
</style>
