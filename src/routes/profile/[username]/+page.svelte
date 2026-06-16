<script>
	let { data } = $props();
</script>

<div class="max-w-6xl mx-auto p-6">

	<h1 class="text-4xl font-bold mb-6">
		{data.user.username}
	</h1>

	<div class="grid md:grid-cols-3 gap-4">

		{#each data.posts as post}

			<img
				src={post.image_url}
				alt=""
				class="rounded-xl h-72 object-cover w-full"
			/>

		{/each}

	</div>

</div>