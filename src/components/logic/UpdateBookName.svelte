<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../../lib/supabaseClient';


  export let idBook: string = ''

  let newName: string = ''
  let token: string | undefined = undefined
  let nameBook = {name: ''}
  let load = true
  let isAdmin = false

  function HandleUpdateName (e: Event) {
    e.preventDefault()

    try {
      fetch(`http://localhost:3000/books/update-name/${idBook}`, {
        method: "PATCH",
        body: JSON.stringify({name: newName}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      alert('Name update successfully')
    }
    catch(e) {
      console.error(e)
      alert('Could not update name')
    }
  }
  
  onMount(async () => {
    const { data } = await supabase.auth.getSession()
    token = data.session?.access_token

    if (!token) {
      window.location.href = "/"
      return
    }

    try {
      const rolResponse = await fetch('http://localhost:3000/login', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { rol } = await rolResponse.json()

      if (rol != "admin") {
        window.location.href = "/user"
        return
      }
    }

    catch(e) {
      console.error(e)
      alert("Error getting credentials")
    }

    isAdmin = true

    try {
      const response = await fetch(`http://localhost:3000/search/books/${idBook}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const book = await response.json()
      nameBook = book[0]
    }

    catch(e) {
      console.error(e)
      alert("Error getting book information")
    }

    load = false

  })
</script>

<section>
  {#if load}
    <p>Loading...</p>
  {:else if isAdmin}
  <h1>Update book name</h1>

  <article>
    <h3>Current Name: {nameBook.name}</h3>

    <form on:submit={HandleUpdateName}>
      <label for="updated-name">New name:</label>
      <input id="updated-name" type="text" bind:value={newName}/>
      <button type="submit">Update</button>
    </form>
  </article>
  {:else}
    <p>Unauthorized</p>
  {/if}
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