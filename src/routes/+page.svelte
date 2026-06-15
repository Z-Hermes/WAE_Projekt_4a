<script>
	import { enhance } from '$app/forms';

	let { data } = $props();

	// Converts a date into "5m ago", "2h ago", etc.
	function timeAgo(dateStr) {
		if (!dateStr) return '';

		const diff = Date.now() - new Date(dateStr).getTime();
		const mins = Math.floor(diff / 60000);

		if (mins < 60) return `${mins}m ago`;

		const hrs = Math.floor(mins / 60);

		if (hrs < 24) return `${hrs}h ago`;

		return `${Math.floor(hrs / 24)}d ago`;
	}
</script>

<svelte:head>
	<title>Pictura – Home</title>
</svelte:head>

<!-- Main feed container -->
<div class="mx-auto max-w-xl px-4 py-6">

	<!-- Empty state -->
	{#if !data?.posts?.length}

		<div class="py-20 text-center">
			<div class="mb-4 text-6xl">📸</div>

			<h2 class="mb-2 text-xl font-semibold text-white">
				No posts yet
			</h2>

			<p class="mb-6 text-sm text-gray-400">
				Be the first to share a photo.
			</p>

			<a
				href="/register"
				class="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
			>
				Sign up
			</a>
		</div>

	{:else}

		<!-- Post feed -->
		{#each data.posts as post}

			<article class="mb-6 overflow-hidden rounded-lg border border-neutral-800 bg-black">

				<!-- User header -->
				<div class="flex items-center gap-3 p-3">

					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 font-bold text-white"
					>
						{post.username?.[0]?.toUpperCase() ?? '?'}
					</div>

					<div class="flex-1">
						<a
							href="/user/{post.username}"
							class="text-sm font-semibold text-white hover:underline"
						>
							{post.username}
						</a>
					</div>

					<span class="text-xs text-gray-400">
						{timeAgo(post.created_at)}
					</span>

				</div>

				<!-- Post image -->
				<a href="/post/{post.id}">
					<img
						src={post.url}
						alt={post.description}
						class="aspect-square w-full object-cover"
					/>
				</a>

				<!-- Like + Comment buttons -->
				<div class="flex gap-4 p-3">

					<form method="POST" action="/post/{post.id}?/upvote" use:enhance>

						<button
							type="submit"
							class="text-white transition hover:opacity-70"
						>
							♥
						</button>

					</form>

					<a
						href="/post/{post.id}"
						class="text-white transition hover:opacity-70"
					>
						💬
					</a>

				</div>

				<!-- Like count -->
				<div class="px-3 text-sm font-semibold text-white">
					{post.votes ?? 0} likes
				</div>

				<!-- Description -->
				{#if post.description}

					<div class="p-3 text-sm text-white">

						<a
							href="/user/{post.username}"
							class="font-semibold hover:underline"
						>
							{post.username}
						</a>

						{' '}{post.description}

					</div>

				{/if}

				<!-- Comments link -->
				<div class="px-3 pb-3">
					<a
						href="/post/{post.id}"
						class="text-xs text-gray-400 hover:underline"
					>
						View comments
					</a>
				</div>

			</article>

		{/each}

	{/if}

</div>