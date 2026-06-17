<script>
	let { data } = $props();
</script>

<div class="max-w-2xl mx-auto p-6">

	<div class="bg-zinc-900 rounded-xl p-6">

		<h1 class="text-3xl font-bold mb-4">
			Edit Bio
		</h1>

		<form
	method="POST"
	action="?/save"
	enctype="multipart/form-data"
>

			<textarea
				name="bio"
				rows="6"
				class="w-full p-3 rounded bg-zinc-800 border border-zinc-700"
			>{data.bio ?? ''}</textarea>

            <div>
	<label>Profile Picture</label>

	<input
		type="file"
		name="profile_picture"
		accept="image/*"
		class="w-full"
	/>
</div>

			<button
				class="mt-4 px-6 py-3 rounded bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
			>
				Save Bio
			</button>

		</form>

	</div>

</div>