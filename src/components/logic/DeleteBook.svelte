<script lang="ts">

  export let idBook: string = ''

  async function HandleDeleteBook () {
    try{
      const resp = await fetch(`http://localhost:3000/books/${idBook}`, {
        method: "DELETE"
      })

      if (resp.ok) {
        alert("User deleted succesfully")
        window.location.href="/admin/books"
      }
    }
    catch (e) {
      console.log(e)
      alert("Could not delete book")
    }
  }

</script>

<div>
  <button on:click={HandleDeleteBook}>
    Delete
  </button>
</div>

<style>
  div {
    text-align: center;
    margin: 30px auto;
    width: 25dvw;
  }

  button:hover {
    background-color: #dc143c7c;
  }

  button {
    background-color: crimson;
    color: whitesmoke;
    border-radius: 8px;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: all ease 0.3s;
  }
</style>