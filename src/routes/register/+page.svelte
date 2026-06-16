<script>
	// `form` holds whatever the register action in +page.server.js sends back.
	// On a failed registration it contains { error, username } so we can show
	// the error message and refill the username box. $props() is how a Svelte 5
	// component receives data (runes mode).
	let { form } = $props();
</script>

<svelte:head>
	<!-- Sets the browser tab title for this page only -->
	<title>Sign up • Pictura</title>
</svelte:head>

<!-- Full-screen black wrapper, centers the card vertically + horizontally -->
<div class="min-h-screen flex items-center justify-center px-4 py-12" style="background:#000;">
	<div class="w-full max-w-sm">

		<!-- App logo. The gradient is the Instagram-style colour blend applied
		     to the text via background-clip:text. -->
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
				Pictura
			</h1>
			<p class="mt-2 text-sm" style="color:#a8a8a8;">Sign up to see photos from your friends.</p>
		</div>

		<!-- Thin gradient line, purely decorative -->
		<div class="h-0.5 rounded mb-6 ig-gradient"></div>

		<!-- CARD 1: the registration form -->
		<div class="ig-card p-8">

			<!-- Only shows if the server returned an error (e.g. username taken).
			     {#if} is Svelte's way of conditionally rendering HTML. -->
			{#if form?.error}
				<div class="mb-4 p-3 rounded text-sm text-center" style="background:#2d0000;color:#ff6b6b;border:1px solid #5c1a1a;">
					{form.error}
				</div>
			{/if}

			<!-- method="POST" + action="?/register" sends the form data to the
			     `register` action in +page.server.js. No JavaScript needed:
			     SvelteKit form actions handle the submit on the server. -->
			<form action="?/register" method="POST" class="space-y-4">

				<div>
					<label for="username" class="block mb-1.5 text-sm" style="color:#a8a8a8;">Username</label>
					<!-- `name` is the key the server reads with form.get('username').
					     `required` + `minlength` are browser-side checks; the server
					     re-checks them too because the browser can be bypassed.
					     value={form?.username ?? ''} refills the box after a failed try. -->
					<input
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						class="ig-input"
						value={form?.username ?? ''}
						autocomplete="username"
						required
						minlength="3"
					/>
				</div>

				<div>
					<label for="password" class="block mb-1.5 text-sm" style="color:#a8a8a8;">Password</label>
					<!-- type="password" hides the characters. The value is never
					     refilled on error, for security. The server hashes it with
					     bcrypt before storing — we never save the plain password. -->
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						class="ig-input"
						autocomplete="new-password"
						required
						minlength="6"
					/>
				</div>

				<!-- Submits the form. hover:scale makes it grow slightly on hover. -->
				<button type="submit" class="ig-btn w-full text-center py-2 transition hover:scale-[1.02]">
					Register
				</button>

			</form>

		</div>

		<!-- CARD 2: separate card below the form, links to the login page.
		     It's a sibling of CARD 1 (not inside it) so it renders as its own box. -->
		<div class="ig-card p-4 mt-3 text-center text-sm" style="color:#a8a8a8;">
			Already have an account?
			<a href="/login" class="font-semibold hover:opacity-80" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
				Log in
			</a>
		</div>

	</div>
</div>