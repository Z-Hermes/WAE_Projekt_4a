<script>
	let { data } = $props();
</script>

<div class="max-w-6xl mx-auto p-6">

	<!-- Profile Header -->

	<div class="flex flex-col md:flex-row items-center gap-8 mb-10">

		<div
			class="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-1"
		>

			<div
				class="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-5xl font-bold"
			>
				{data.user.username.charAt(0).toUpperCase()}
			</div>

		</div>

		<div>

			<h1 class="text-4xl font-bold mb-2">
				{data.user.username}
			</h1>

			<p class="text-zinc-400">
				{data.posts.length} posts
			</p>

		</div>

	</div>

	<!-- Posts -->

	{#if data.posts.length === 0}

		<div
			class="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center"
		>

			<p class="text-zinc-400">
				This user has not uploaded any posts yet.
			</p>

		</div>

	{:else}

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">

			{#each data.posts as post}

				<a
					href="/post/{post.id}"
					class="group block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
				>

					<img
						src={post.image_url}
						alt={post.description}
						class="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
					/>

				</a>

			{/each}

		</div>

	{/if}

</div>