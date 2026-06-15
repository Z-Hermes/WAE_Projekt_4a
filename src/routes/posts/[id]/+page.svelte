<script>
	let { data, form } = $props();

	// Show Edit/Delete only to the owner of the post or an admin
	let canManage = $derived(
		data.user?.username === data.post.username || data.user?.role === 'admin'
	);

	function timeAgo(date) {
		if (!date) return '';
		const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
		if (mins < 60) return mins + 'm';
		if (mins < 1440) return Math.floor(mins / 60) + 'h';
		return Math.floor(mins / 1440) + 'd';
	}
</script>

<svelte:head><title>{data.post.username ?? 'Post'} • Pictura</title></svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="ig-card flex flex-col md:flex-row">
		<!-- Left: the image -->
		<div class="flex items-center justify-center bg-black md:w-1/2">
			<img
				src={data.post.image_url}
				alt={data.post.description ?? 'Post'}
				class="max-h-[600px] w-full object-contain"
			/>
		</div>

		<!-- Right: info, comments, actions -->
		<div class="flex flex-col md:w-1/2" style="border-left:1px solid #262626;">
			<!-- Author + manage controls -->
			<div class="flex items-center gap-3 p-4" style="border-bottom:1px solid #262626;">
				<a href="/user/{data.post.username}" class="avatar-ring">
					<div
						class="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
						style="background:#1a1a1a;min-width:2.25rem;border:2px solid #000;"
					>
						{data.post.username ? data.post.username[0].toUpperCase() : '?'}
					</div>
				</a>
				<a
					href="/user/{data.post.username}"
					class="text-sm font-semibold hover:underline"
					style="color:#f5f5f5;"
				>
					{data.post.username ?? 'Unknown'}
				</a>

				{#if canManage}
					<div class="ml-auto flex items-center gap-3 text-xs">
						<a href="/admin/post/{data.post.id}/edit" class="hover:underline" style="color:#a8a8a8;">
							Edit
						</a>
						<!-- Delete posts to the edit route's delete action -->
						<form method="POST" action="/admin/post/{data.post.id}/edit?/delete">
							<button
								type="submit"
								onclick={(e) => {
									if (!confirm('Delete this post?')) e.preventDefault();
								}}
								style="background:none;border:none;cursor:pointer;color:#ff6b6b;"
								class="hover:underline"
							>
								Delete
							</button>
						</form>
					</div>
				{/if}
			</div>

			<!-- Caption shown as the first entry -->
			{#if data.post.description}
				<div class="p-4 text-sm" style="border-bottom:1px solid #1a1a1a;">
					<span class="mr-2 font-semibold">{data.post.username}</span>{data.post.description}
				</div>
			{/if}

			<!-- Comments -->
			<div class="flex-1 space-y-3 overflow-y-auto p-4" style="min-height:160px;">
				{#each data.comments as c}
					<div class="text-sm">
						<a href="/user/{c.username}" class="mr-2 font-semibold hover:underline">{c.username}</a>
						<span>{c.text}</span>
						<span class="ml-2 text-xs" style="color:#a8a8a8;">{timeAgo(c.created_at)}</span>
					</div>
				{:else}
					<p class="text-center text-sm" style="color:#a8a8a8;">No comments yet.</p>
				{/each}
			</div>

			<!-- Upvote + likes -->
			<div class="px-4 pt-3" style="border-top:1px solid #262626;">
				<form method="POST" action="?/upvote">
					<button
						type="submit"
						aria-label="Upvote"
						style="background:none;border:none;cursor:pointer;color:#f5f5f5;"
						class="transition-opacity hover:opacity-70"
					>
						<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
						</svg>
					</button>
				</form>
				<p class="mt-1 text-sm font-semibold">{data.post.votes} likes</p>
			</div>

			<!-- Comment form -->
			{#if form?.error}
				<p class="px-4 pt-2 text-xs" style="color:#ff6b6b;">{form.error}</p>
			{/if}
			{#if data.user}
				<form method="POST" action="?/comment" class="flex items-center gap-2 p-4">
					<input
						type="text"
						name="text"
						placeholder="Add a comment…"
						class="ig-input flex-1 py-1.5 text-sm"
						maxlength="500"
						required
					/>
					<button
						type="submit"
						class="ig-gradient-text text-sm font-semibold"
						style="background:none;border:none;cursor:pointer;"
					>
						Post
					</button>
				</form>
			{:else}
				<p class="p-4 text-sm" style="color:#a8a8a8;">
					<a href="/login" class="ig-gradient-text font-semibold">Log in</a> to like and comment.
				</p>
			{/if}
		</div>
	</div>
</div>
