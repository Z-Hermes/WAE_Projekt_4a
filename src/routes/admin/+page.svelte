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
	class="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
>
	New Post
</a>

	</div>

	{#if data.posts.length === 0}

	<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">

		<p class="text-zinc-400">
			You haven't uploaded any posts yet.
		</p>

	</div>

{:else}

	<div class="grid md:grid-cols-3 gap-4">

		{#each data.posts as post}

			<div class="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">

				<img
					src={post.image_url}
					alt={post.description}
					class="h-60 w-full object-cover"
				/>

				<div class="p-4">

	<p>
		{post.description}
	</p>

	<p class="mt-2 text-zinc-400">
		❤️ {post.votes}
	</p>

	<form
		method="POST"
		action="?/delete"
		class="mt-4"
	>

		<input
			type="hidden"
			name="id"
			value={post.id}
		>

		<button
			type="submit"
			class="text-red-400 hover:text-red-300 transition"
		>
			Delete Post
		</button>

	</form>

</div>

			</div>

		{/each}

	</div>

{/if}
</div>