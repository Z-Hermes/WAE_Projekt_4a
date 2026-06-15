<script>
	let { data } = $props();
</script>

<div class="max-w-5xl mx-auto p-6">

	<div class="flex justify-between mb-6">

		<h1 class="text-3xl font-bold">
			My Posts
		</h1>

		<a
			href="/admin/post/new"
			class="bg-pink-500 px-4 py-2 rounded"
		>
			New Post
		</a>

	</div>

	<div class="grid md:grid-cols-3 gap-4">

		{#each data.posts as post}

			<div class="bg-zinc-900 rounded-xl overflow-hidden">

				<img
					src={post.image_url}
					alt=""
					class="h-60 w-full object-cover"
				/>

				<div class="p-4">

					<p>
						{post.description}
					</p>

					<p class="mt-2">
						❤️ {post.votes}
					</p>

				</div>

			</div>

		{/each}

	</div>

</div>