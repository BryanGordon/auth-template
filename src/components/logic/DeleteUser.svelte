<script lang="ts">
  export let idUser: string = ''

  async function HandleDeleteUser () {
    try {
      const resp = await fetch(`http://localhost:3000/admin/users/${idUser}`, {
        method: "DELETE"
      })

      if (resp.ok) {
        alert("User deleted succesfully")
        window.location.href="/admin/users"
      }
    }
    catch(e) {
      console.log(e)
      alert("Could not delete user")
    }
  }

</script>

<div>
  <button on:click={HandleDeleteUser}>
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