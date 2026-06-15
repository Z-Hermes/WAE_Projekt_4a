<script>
	let { data } = $props();
</script>

<div class="max-w-3xl mx-auto p-6">

	<img
		src={data.post.image_url}
		alt=""
		class="w-full rounded-xl"
	/>

	<h1 class="text-2xl font-bold mt-4">
		{data.post.username}
	</h1>

	<p class="mt-2">
		{data.post.description}
	</p>

	<p class="mt-4">
		❤️ {data.post.votes}
	</p>

	<form method="POST" action="?/vote">
		<button
			class="mt-4 bg-pink-500 px-4 py-2 rounded"
		>
			Like
		</button>
	</form>

	<h2 class="text-xl font-bold mt-8">
		Comments
	</h2>

	<form method="POST" action="?/comment">
		<textarea
			name="text"
			class="w-full mt-4 bg-zinc-900 p-2 rounded"
		></textarea>

		<button
			class="mt-2 bg-purple-500 px-4 py-2 rounded"
		>
			Add Comment
		</button>
	</form>

	{#each data.comments as comment}
		<div class="bg-zinc-900 mt-4 p-3 rounded">
			<b>{comment.username}</b>
			<p>{comment.text}</p>
		</div>
	{/each}

</div>