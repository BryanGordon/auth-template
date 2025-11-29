<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../../lib/supabaseClient';

  let id: string = ''
  let name: string = ''
  let auth: string = ''
  let pages: number = 0
  let year: number = 0

  let token: string | undefined = undefined
  let load = true
  let isAdmin = false

  function HandleCreateBook(event: Event) {
    event.preventDefault()

    const newBook = {
      id: id,
      name: name,
      author: auth,
      pages: pages,
      year: year
    }

    try {
      fetch('http://localhost:3000/books', {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      alert("User created succesfully")
    }
    catch(e) {
      console.error(e)
      alert("Could not create a new book")
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
      const roleResponse = await fetch('http://localhost:3000/login', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { rol } = await roleResponse.json()

      if (rol != "admin") {
        window.location.href = "/user"
        return
      }
    }
    catch(e) {
      console.error(e)
      alert("Error getting session data")
    }

    isAdmin = true
    load = false

  })
</script>

<section>
  {#if load}
    <p>Loading...</p>
  {:else if isAdmin}
  <header>
    <h1>Create new book</h1>
  </header>

  <article>
    <h3>Info book</h3>

    <form on:submit={HandleCreateBook}>
      <div>
        <label for="id">ID:</label>
        <input name="id" type="text" placeholder="Id book" bind:value={id}/>
      </div>
      <div>
        <label for="nombre">Nombre:</label>
        <input name="nombre" type="text" placeholder="Book name" bind:value={name}/>
      </div>
      <div>
        <label for="autor">Author:</label>
        <input name="autor" type="text" placeholder="Author name" bind:value={auth}/>
      </div>
      <div>
        <label for="paginas">Pages:</label>
        <input name="paginas" type="number" placeholder="430" bind:value={pages}/>
      </div>
      <div>
        <label for="year">Year:</label>
        <input name="year" type="number" placeholder="2020" bind:value={year} />
      </div>
      <button type="submit">Create</button>
    </form>
  </article>
  {:else}
    <p>Unauthorized</p>
  {/if}
</section>

<style>
  h1 {
    color: peru;
    text-align: center;
    margin-block: 50px;
  }

  h3 {
    color: #886038;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 45px;
    align-items: center;
    border: #6c26a9 solid 1px;
    border-radius: 8px;
    width: 35%;
    margin: 0 auto;
    padding: 35px;
  }

  label {
    color: peru;
    margin-right: 20px;
  }

  input {
    border-radius: 6px;
    background-color: whitesmoke;
    padding: 5px;
    border: solid #6c26a9 3px;
    border-style: inset;
  }

  button:hover{
    color: white;
    background-color: #5b337e;
  }

  button {
    padding: 6px;
    border-radius: 5px;
    width: 5dvw;
    cursor: pointer;
    border: none;
    background-color: #854bb8;
    color: whitesmoke;
    transition: all ease 0.2s;
  }

</style>