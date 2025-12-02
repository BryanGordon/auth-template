<script lang="ts">
    import { onMount } from 'svelte';
    import DeleteUser from './logic/DeleteUser.svelte';
    import { supabase } from '../lib/supabaseClient';

interface User {
  id: string
  name: string
  email: string
  nickname: string
  createdDay: string
}

export let userId: string = ''

let load = true
let isAdmin = false
let user: User = {
  id: '',
  name: '',
  email: '',
  nickname: '',
  createdDay: ''
}

onMount(async () => {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

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
    console.log(e)
    alert("Error getting credentials")
    window.location.replace("/")
    return
  }

  isAdmin = true

  try {
    const response = await fetch(`http://localhost:3000/admin/users/search/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const userData = await response.json()
    user = userData[0]
  }
  catch(e) {
    console.error(e)
    alert("Error fetching user data")
    window.location.href = "/admin/users"
    return
  }

  load = false
})

</script>

<section>
  {#if load}
    <p>Loading...</p>
  {:else if isAdmin}
    <h1>{user.nickname}</h1>
    <a class="go-back" href="/admin/users">Volver atras</a>

    <article>
      <div>
        <span>Nombre:</span>
        <p>{user.name}</p>
      </div>
      <div>
        <span>Nickname:</span>
        <p>{user.nickname}</p>
      </div>
      <div>
        <span>Email:</span>
        <p>{user.email}</p>
      </div>
      <div>
        <span>Created day:</span>
        <p>{user.createdDay}</p>
      </div>

      <div>
        <a class="update-button" href={`/admin/users/update/${user.id}`}>Update Name</a>
      </div>

    </article>
    <DeleteUser idUser={userId}/>
  {:else}
    <p>Loading...</p>
  {/if}
  </section>

  <style>
  h1 {
    margin-top: 50px;
    margin-bottom: 50px;
    color: peru;
    font-weight: 700;
    text-align: center;
  }

  article {
    width: 35%;
    margin: 0 auto;
    padding: 25px;
    border: 1px solid #7e6e9f;
    border-radius: 6px;
  }

  div {
    margin-left: 10dvw;
  }

  p {
    display: inline-block;
    color: whitesmoke;
  }

  span {
    margin-right: 8px;
    color: #8a78ae;
  }

  .update-button:hover {
    background: #add8e691;
    color: cornsilk;
  }

  .update-button {
    display: inline-block;
    padding: 15px 13px;
    height: 10px;
    line-height: 15px;
    text-decoration: none;
    border-radius: 8px;
    background-color: lightblue;
    color: black;
    cursor: pointer;
    transition: all ease 0.3s;
  }


  .go-back:hover {
    color: whitesmoke;
  }

  .go-back {
    text-decoration: none;
    color: #8a78ae;
    margin-top: 445px;
    margin-left: 35px;
    transition: color ease 0.3s;
  }
</style>