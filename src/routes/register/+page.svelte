<h2>Register</h2>

<script>
    let { form } = $props();
</script>

{#if form?.error}

    <p id="warning">
        {form.error}
    </p>
{/if}

<section>

    <form action="?/register" method="POST">
    
        <div>
            <label for="username">Username</label>
            <input type="text" name="username" id="username">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>
        <div>
            <button type="submit">Register</button>
        </div>

    </form>
    
        <a href="/login">Already have an account? Log in</a>

</section>