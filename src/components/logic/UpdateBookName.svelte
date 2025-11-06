<script lang="ts">

</script>

<section>
  <h1>Update book name</h1>

  <article>
    <h3>Current Name: </h3>

    <form>
      <label for="updated-name">New name:</label>
      <input type="text">
      <button type="submit">Update</button>
    </form>
  </article>
</section>

<style>
  h1 {
    color: peru;
    margin-block: 50px;
    text-align: center;
  }

  h3 {
    width: 65dvw;
    margin: 0 auto;
    color: #cc7a29c3;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 45dvw;
    margin: 0 auto;
    margin-top: 50px;
    gap: 15px;
  }

  label {
    color: #c07d2b;
  }

  input {
    width: 55%;
  }

  button {
    width: 20%;
  }
</style>