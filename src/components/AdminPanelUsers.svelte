<script lang="ts">
  import { supabase } from '../lib/supabaseClient'
  import { onMount } from 'svelte'

  interface User {
    id: string
    name: string
    email: string
    createdUser: string 
    nickname: string
  }

  let token = ''
  let sessionLoaded = false
  let users: User[] = []

  onMount(async () => {
    /*
    supabase.auth.onAuthStateChange(async (event, session) => {
      token = session?.access_token ?? ""
      
      sessionLoaded = true
      
      if (!token) {
        console.error("token", token)
        window.location.href = "/"
        return
      }
      
      const response = await fetch('http://localhost:3000/admin/users', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      users = await response.json()
      
    })
    
    /*
    if (response.status === 401)
    throw new Error('Unauthorized')
    const users: User[] = await response.json()
    
    console.log(users)
    */

    const { data } = await supabase.auth.getSession()

    const token = data.session?.access_token
    console.log(data)

    if (!token) {
      console.log("No existe un token")
      window.location.href = "/"
      return
    }

    try {
      const response = await fetch('http://localhost:3000/admin/users', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      users = await response.json()

    }
    catch(e) {
      console.log(e)
    }

   console.log("token ",token)
   console.log("users ", users)
  })

  
</script>

<section>
  <article class="button-container">
    <a href="/admin/users/create">Agregar usuario</a>
    <a href="/admin/books/create">Agregar libro</a>
  </article>

  <article class="data-container">
    {#each users as user}
      <a href={`/admin/users/user/${user.id}`} class="data-info">
          <div>
            <span>Nombre:</span>
            <p>{user.name}</p>
          </div>
          <div>
            <span>Email:</span>
            <p>{user.email}</p>
          </div>
          <div>
            <span>Created date:</span>
            <p>{user.createdUser}</p>
          </div>
          <div>
            <span>Nickname:</span>
            <p>{user.nickname}</p>
          </div>
        </a>
    {/each}
   
  </article>
</section>

<style>
  .button-container {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    gap: 25px;

    & a:hover {
      color: whitesmoke;
      background-color: indigo;
    }

    & a {
      text-decoration: none;
      height: 15px;
      line-height: 20px;
      color: peru;
      padding: 15px;
      border-radius: 4px;
      background-color: #60517ae7;
      transition: all 0.3s ease-in-out;
    }
  }

  span {
    color: peru;
    font-weight: 500;
  }

  .data-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    align-content: center;
    gap: 45px;
  }

  .data-info {
    text-decoration: none;
    color: currentColor;
    width: 80%;
    margin: 0 auto;
    padding-block: 15px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(43%, 1fr));
    background-color: thistle;
    border-radius: 8px;   
    text-align: center;

    & p {
      display: inline-block;
      margin-left: 6px;
    }
  }
</style>