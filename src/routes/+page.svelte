<script>
	let { data } = $props();
</script>

<div class="max-w-6xl mx-auto p-6">

	<h2 class="text-3xl font-bold mb-4">🔥 Trending</h2>

	<div class="grid md:grid-cols-3 gap-4 mb-10">
		{#each data.topPosts as post}
			<img
				src={post.image_url}
				alt=""
				class="rounded-xl h-64 w-full object-cover"
			/>
		{/each}
	</div>

	<h2 class="text-3xl font-bold mb-4">Latest Posts</h2>

	<div class="grid md:grid-cols-3 gap-6">

		{#each data.posts as post}

			<a
				href="/image/{post.id}"
				class="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition"
			>
				<img
					src={post.image_url}
					alt=""
					class="h-72 w-full object-cover"
				/>

				<div class="p-4">
					<p class="font-bold">{post.username}</p>

					<p class="text-zinc-400">
						{post.description}
					</p>

					<p class="mt-2">
						❤️ {post.votes}
					</p>
				</div>
			</a>

		{/each}

	</div>

</div>