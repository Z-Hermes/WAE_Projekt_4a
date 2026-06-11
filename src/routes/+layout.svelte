
<script>
	let { children } = $props();
</script>

{@render children()}


<header class="bg-0d0d0d text-white p-4 flex items-center justify-between">
    <img src="" alt="">
    <div>
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/logout">Logout</a>
    </div>
</header>