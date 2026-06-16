<script>
	let { data } = $props();
</script>

{#if !data.post}

	<div class="max-w-3xl mx-auto p-6 text-center">

		<h1 class="text-3xl font-bold mb-4">
			Post not found
		</h1>

		<p class="text-zinc-400">
			This image does not exist.
		</p>

	</div>

{:else}

	<div class="max-w-4xl mx-auto p-6">

		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

			<!-- Image -->

			<img
				src={data.post.image_url}
				alt={data.post.description}
				class="w-full max-h-[700px] object-cover"
			/>

			<!-- Post Info -->

			<div class="p-6">

				<div class="flex items-center justify-between">

					<a
						href="/profile/{data.post.username}"
						class="text-xl font-bold hover:text-pink-400 transition"
					>
						@{data.post.username}
					</a>

					<p class="text-zinc-400">
						❤️ {data.post.votes} votes
					</p>

				</div>

				<p class="mt-4 text-zinc-200">
					{data.post.description}
				</p>

				<!-- Vote Button -->

				<form method="POST" action="?/vote">

					<button
						class="mt-6 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
					>
						❤️ Like Post
					</button>

				</form>

			</div>

		</div>

		<!-- Comments -->

		<div class="mt-8">

			<h2 class="text-2xl font-bold mb-4">
				Comments
			</h2>

			<form
				method="POST"
				action="?/comment"
				class="mb-6"
			>

				<textarea
					name="text"
					rows="4"
					placeholder="Write a comment..."
					class="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:border-pink-500"
				></textarea>

				<button
					class="mt-3 px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition"
				>
					Add Comment
				</button>

			</form>

			{#if data.comments.length === 0}

				<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

					<p class="text-zinc-400">
						No comments yet.
					</p>

				</div>

			{:else}

				<div class="space-y-4">

					{#each data.comments as comment}

						<div
							class="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
						>

							<a
								href="/profile/{comment.username}"
								class="font-bold hover:text-pink-400 transition"
							>
								{comment.username}
							</a>

							<p class="mt-2 text-zinc-300">
								{comment.text}
							</p>

						</div>

					{/each}

				</div>

			{/if}

		</div>

	</div>

{/if}