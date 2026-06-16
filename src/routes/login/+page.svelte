<script>
	let { form } = $props();
</script>

<div class="min-h-[80vh] flex items-center justify-center px-4">

	<div class="w-full max-w-md">

		<!-- Logo -->

		<h1
			class="text-center text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
		>
			InstaClone
		</h1>

		<!-- Login Card -->

		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">

			<h2 class="text-2xl font-bold mb-6 text-center">
				Log In
			</h2>

			{#if form?.error}
				<div
					class="mb-6 p-4 rounded-lg border border-red-900 bg-red-950 text-red-300"
				>
					{form.error}
				</div>
			{/if}

			<form
				action="?/login"
				method="POST"
				class="space-y-4"
			>

				<div>

					<label
						for="username"
						class="block mb-2 text-zinc-300"
					>
						Username
					</label>

					<input
						type="text"
						name="username"
						id="username"
						class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
					>

				</div>

				<div>

					<label
						for="password"
						class="block mb-2 text-zinc-300"
					>
						Password
					</label>

					<input
						type="password"
						name="password"
						id="password"
						class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
					>

				</div>

				<button
					type="submit"
					class="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
				>
					Log In
				</button>

			</form>

		</div>

		<!-- Register Link -->

		<div
			class="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center"
		>
			Don't have an account?

			<a
				href="/register"
				class="ml-1 text-pink-400 hover:text-pink-300"
			>
				Register
			</a>

		</div>

	</div>

</div>