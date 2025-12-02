<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../../lib/supabaseClient';

  let id: string = ''
  let name: string = ''
  let email: string = ''
  let nickname: string = ''
  let createdDay: string = ''
  let password: string = ''

  let token: string | undefined = undefined
  let load = true
  let isAdmin = false

  function HandleCreateUser (event: Event) {
    event.preventDefault()

    const newBook = {
      id: id,
      name: name,
      email: email,
      nickname: nickname,
      createdUser: createdDay,
      password: password
    }

    try {
      fetch(`http://localhost:3000/admin/users`, {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      alert("User created succesfully")
    }
    catch (e) {
      console.error(e)
      alert("Could not create a new user")
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
      alert("Error getting credentiasl")
      window.location.replace("/admin/books")
      return
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
    <h1>Create new user</h1>
  </header>

  <article>
    <h3>Info book</h3>

    <form on:submit={HandleCreateUser}>
      <div>
        <label for="id">ID:</label>
        <input id="id" type="text" placeholder="User ID" bind:value={id}/>
      </div>
      <div>
        <label for="nombre">Nombre:</label>
        <input id="nombre" type="text" placeholder="User name" bind:value={name}/>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" type="text" placeholder="correo@corre.com" bind:value={email}/>
      </div>
      <div>
        <label for="nickname">Nickname:</label>
        <input id="nickname" type="text" placeholder="User nickname" bind:value={nickname}/>
      </div>
      <div>
        <label for="created-day">Created day:</label>
        <input id="created-day" type="text" placeholder="2015/10/12" bind:value={createdDay}/>
      </div>
      <div>
        <label for="password">Pasword:</label>
        <input id="password" type="password" bind:value={password} />
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