<script>
    let { data } = $props();
</script>

<h1>Edit Post</h1>

<form action="?/edit" method="POST" enctype="multipart/form-data">

<div>
        <label for="image_url">Post name</label>
        <input type="text" id="image_url" name="image_url" required value={data.event.image_url}>
    </div>

    <div>
        <label for="description">Post description</label>
        <textarea id="description" name="description" value={data.event.description}></textarea>
    </div>

    <div>
        <label for="votes">Post votes</label>
        <input type="number" id="votes" name="votes" required value={data.event.votes}>
    </div>

    <div>
        <label for="created_at">Post time</label>
        <input type="time" id="created_at" name="created_at" value={data.event.created_at}>
    </div>
    
    <div>
        <label for="name">Add Image</label>
        <input type="file" id="image" name="image" accept="image/*">
    </div>

     <div>
        <button type="submit">edit</button>
    </div>

</form>
