<script>
    let { form } = $props();
</script>

<svelte:head>
	<title>Sign up • Pictura</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4 py-12" style="background:#000;">
	<div class="w-full max-w-sm">

		<!-- Logo -->
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
				Pictura
			</h1>
			<p class="mt-2 text-sm" style="color:#a8a8a8;">Sign up to see photos from your friends.</p>
		</div>

		<!-- Gradient divider decoration -->
		<div class="h-0.5 rounded mb-6 ig-gradient"></div>

		<!-- Card -->
		<div class="ig-card p-8">

			{#if form?.error}
				<div class="mb-4 p-3 rounded text-sm text-center" style="background:#2d0000;color:#ff6b6b;border:1px solid #5c1a1a;">
					{form.error}
				</div>
			{/if}

    <form action="?/register" method="POST" class="space-y-4">
    
        <div>
            <label for="username">Username</label>
            <input type="text" name="username" id="username" placeholder="Username" class="ig-input" value={form?.username ?? ''} autocomplete="username">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" class="ig-input" autocomplete="new-password">
        </div>
        <button type="submit" class="ig-btn w-full text-center py-2">Register</button>

    </form>
    
        <div class="ig-card p-4 mt-3 text-center text-sm" style="color:#a8a8a8;">
			Already have an account?
			<a href="/login" class="font-semibold hover:opacity-80" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
				Log in
			</a>
		</div>
    </div>
</div>
</div>