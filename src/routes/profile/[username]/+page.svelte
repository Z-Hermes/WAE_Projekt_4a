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

		<div class="flex-1">

			<h1 class="text-4xl font-bold mb-2">
				{data.user.username}
			</h1>

			<p class="text-zinc-400">
				{data.posts.length} posts
			</p>

		</div>

		<!-- Only show button on your own profile -->
		{#if data.isOwnProfile}
			<a
				href="/post/new"
				class="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
			>
				+ New Post
			</a>
		{/if}

	</div>

	<!-- No Posts -->
	{#if data.posts.length === 0}

		<div
			class="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center"
		>
			<p class="text-zinc-400">
				This user has not uploaded any posts yet.
			</p>
		</div>

	{:else}

		<!-- Posts Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">

			{#each data.posts as post}

				<div
					class="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
				>

					<a href="/image/{post.id}">

						<img
							src={post.image_url}
							alt={post.description}
							class="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
						/>

					</a>

					{#if data.isOwnProfile}

						<form
							method="POST"
							action="?/delete"
							class="p-3"
						>

							<input
								type="hidden"
								name="id"
								value={post.id}
							>

							<button
								class="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
							>
								Delete Post
							</button>

						</form>

					{/if}

				</div>

			{/each}

		</div>

	{/if}

</div>