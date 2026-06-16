<h1 class="text-3xl font-bold mb-6">
    Upload Image
</h1>

<form
    method="POST"
    action="?/create"
    class="space-y-4"
>

    <div>
        <label class="block mb-2">
            Image URL
        </label>

        <input
            type="text"
            name="image_url"
            required
            class="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
        />
    </div>

    <div>
        <label class="block mb-2">
            Description
        </label>

        <textarea
            name="description"
            rows="5"
            class="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
        ></textarea>
    </div>

    <button
        class="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-6 py-3 rounded font-bold"
    >
        Upload
    </button>

</form>