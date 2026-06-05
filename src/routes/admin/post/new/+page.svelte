<script>
    let {data} = $props();

</script>

<h1>New post</h1>

<form method="POST" action="?/create">

    <div>
        <label for="name">image URL</label>
        <input type="text" id="name" name="name" required>
    </div>

    <div>
        <label for="description">Post description</label>
        <textarea id="description" name="description"></textarea>
    </div>

    <div>
        <label for="name">Event start date</label>
        <input type="date" id="startdate" name="startdate">
    </div>

    <div>
        <label for="name">Post author</label>
        <input type="text" id="author" name="author">
    </div>

    <div>
        <label for="categorie">Votes</label>
        <input type="text" id="votes" name="votes">
    </div>

    <div>
        <label for="categorie">Created at</label>
        <input type="time" id="created_at" name="created_at">
    </div>

    <div>
        <button type="submit">create</button>
    </div>
</form>