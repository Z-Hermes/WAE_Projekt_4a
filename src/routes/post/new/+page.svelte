<script>
	let { form } = $props();
</script>

<div class="max-w-2xl mx-auto p-6">

	<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

		<h1 class="text-3xl font-bold mb-2">
			Create New Post
		</h1>

		<p class="text-zinc-400 mb-6">
			Share a new image with your followers.
		</p>

		{#if form?.error}
			<div
				class="mb-4 p-4 rounded-lg bg-red-950 border border-red-900 text-red-300"
			>
				{form.error}
			</div>
		{/if}

		<form
			method="POST"
			action="?/create"
			class="space-y-5"
		>

			<div>

				<label
					for="image_url"
					class="block mb-2 text-zinc-300"
				>
					Image URL
				</label>

				<input
					type="text"
					id="image_url"
					name="image_url"
					required
					placeholder="https://example.com/image.jpg"
					class="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-pink-500"
				/>

			</div>

			<div>

				<label
					for="description"
					class="block mb-2 text-zinc-300"
				>
					Description
				</label>

				<textarea
					id="description"
					name="description"
					rows="5"
					placeholder="Write a description..."
					class="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-pink-500"
				></textarea>

			</div>

			<button
				type="submit"
				class="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 hover:scale-[1.02] transition"
			>
				Upload Post
			</button>

		</form>

	</div>

</div>