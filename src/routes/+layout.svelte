<script>
	let { data, children } = $props();
	import "./layout.css";

</script>

<svelte:head>
	<title>InstaClone</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-white flex flex-col">

	<!-- Header -->
	<header class="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">

		<div class="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

			<a
				href="/"
				class="font-bold text-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
			>
				InstaClone
			</a>

			<nav class="flex items-center gap-2">

				<a
					href="/"
					class="px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
				>
					Home
				</a>

				{#if data.user}

					<a
						href="/admin"
						class="px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
					>
						Dashboard
					</a>

					<a
						href="/profile/{data.user.id}"
						class="px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
					>
						Profile
					</a>

					<a
						href="/logout"
						class="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 font-semibold"
					>
						Logout
					</a>

				{:else}

					<a
						href="/login"
						class="px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
					>
						Login
					</a>

					<a
						href="/register"
						class="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 font-semibold"
					>
						Register
					</a>

				{/if}

			</nav>

		</div>

	</header>

	<!-- Main Content -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-zinc-800 mt-12">

		<div class="max-w-6xl mx-auto px-6 py-6 text-center text-zinc-500">

			<p>
				InstaClone • WAE Project • Hermes Zalla
			</p>

		</div>

	</footer>

</div>