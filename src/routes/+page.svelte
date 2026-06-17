<script>
	let { data } = $props();
</script>

<div class="max-w-6xl mx-auto p-6">

	<!-- Trending Section -->

	<h2
		class="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
	>
		🔥 Trending Posts
	</h2>

	<div class="grid md:grid-cols-3 gap-4 mb-12">

		{#each data.topPosts as post}

			<div
				class="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
			>

				<img
	src={post.image_url}
	alt="{post.description}"
	class={`h-72 w-full object-cover ${
		post.filter_name === 'grayscale'
			? 'grayscale'
			: post.filter_name === 'sepia'
			? 'sepia'
			: ''
	}`}
/>

				<div class="p-4">

					<p class="font-semibold">
						❤️ {post.votes} votes
					</p>

					<p class="text-zinc-400 text-sm mt-1">
						{post.username}
					</p>

				</div>

			</div>

		{/each}

	</div>

	<!-- Latest Posts -->

	<h2 class="text-3xl font-bold mb-6">
		Latest Posts
	</h2>

	<div class="grid md:grid-cols-3 gap-6">

		{#each data.posts as post}

			<a
				href="/image/{post.id}"
				class="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-pink-500 transition"
			>

			<img
	src={post.image_url}
	alt=""
	class="h-72 w-full object-cover"
	style="
		filter:
		{post.filter_name === 'grayscale'
			? 'grayscale(100%)'
			: post.filter_name === 'sepia'
			? 'sepia(100%)'
			: post.filter_name === 'blue'
			? 'hue-rotate(180deg)'
			: 'none'};
	"
/>

				<div class="p-4">

					<p class="font-bold">
						{post.username}
					</p>

					<p class="text-zinc-400 mt-2 line-clamp-2">
						{post.description}
					</p>

					<p class="mt-3">
						❤️ {post.votes}
					</p>

				</div>

			</a>

		{/each}

	</div>

</div>