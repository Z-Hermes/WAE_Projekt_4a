<script>
    let { form } = $props();
</script>

<h1 class="text-3xl font-bold mb-6">Log In Page</h1>

{#if form?.error}
    <p class="border border-red-700 text-red-700 bg-red-300 p-6 m-2 rounded">
        {form.error}
    </p>
{/if}

<section class="max-w-md mx-auto">

    <form action="?/login" method="POST" class="space-y-4">

        <div class="flex flex-col">
            <label for="username" class="mb-1 font-medium">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                class="border rounded px-3 py-2"
            >
        </div>

        <div class="flex flex-col">
            <label for="password" class="mb-1 font-medium">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                class="border rounded px-3 py-2"
            >
        </div>

        <div>
            <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Log In
            </button>
        </div>

    </form>

    <a
        href="/register"
        class="inline-block mt-4 text-blue-600 hover:underline"
    >
        Register
    </a>

</section>