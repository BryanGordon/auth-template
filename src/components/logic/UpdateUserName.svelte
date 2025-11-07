<script lang="ts">
  export let nameUser: string = ''
  export let userId: string = ''

  let newUserName: string = ''

  function HandleUpdateUserName (e: Event) {
    e.preventDefault()

    try {
      fetch(`http://localhost:3000/update-name/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({name: newUserName}),
        headers: {
          "Content-Type": "application/json"
        }
      })

      alert("User name updated successfully")
    }
    catch(e) {
      console.error(e)
      alert("Could not update name")
    }
  }
</script>

<section>
  <h1>Update book name</h1>

  <article>
    <h3>Current Name: {nameUser}</h3>

    <form on:submit={HandleUpdateUserName}>
      <label for="updated-name">New name:</label>
      <input id="updated-name" type="text" bind:value={newUserName}/>
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
    border-radius: 8px;
    padding: 6px;
    border: none;
  }

  button:hover {
    background-color: #90ee90bc;

  }

  button {
    width: 20%;
    border-radius: 8px;
    padding: 10px;
    background-color: lightgreen;
    cursor: pointer;
    transition: all ease 0.3s;
  }
</style>
