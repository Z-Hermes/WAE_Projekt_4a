<script>
	let { data, children } = $props();
</script>

<header class="bg-zinc-950 border-b border-zinc-800">
	<div class="max-w-6xl mx-auto flex justify-between items-center p-4">
		<a
			href="/"
			class="font-bold text-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent"
		>
			InstaClone
		</a>

		<nav class="flex gap-4 text-white">
			<a href="/">Home</a>

			{#if data.user}
				<a href="/admin">Dashboard</a>
				<a href="/profile/{data.user.id}">Profile</a>
				<a href="/logout">Logout</a>
			{:else}
				<a href="/login">Login</a>
				<a href="/register">Register</a>
			{/if}
		</nav>
	</div>
</header>

<main class="min-h-screen bg-zinc-950 text-white">
	{@render children()}
</main>