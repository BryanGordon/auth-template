<script lang="ts">
    import { onMount } from 'svelte';
  import Navbar from './Navbar.svelte'
    import { supabase } from '../lib/supabaseClient';

  interface Book {
    id: string
    name: string
    author: string
    pages: string
    year: string
  }

  export let navPage: string = ''

  let loading = true
  let isAdmin = false
  let books: Book [] = []

  onMount(async () => {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token

    if (!token) {
      window.location.href = "/"
      return
    }

    try {
      const roleData = await fetch('http://localhost:3000/login', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { rol } = await roleData.json()
      console.log(rol)

      if (rol != "admin") {
        window.location.href = '/user'
        return
      }
    }

    catch(e) {
      alert("Error getting login info")
      console.error(e)
    }

    isAdmin = true

    try {
      const response = await fetch('http://localhost:3000/books', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      books = await response.json()
    }

    catch(e) {
      alert("Error getting books info")
      console.error(e)
    }

    loading = false
  })

</script>

<section>
  {#if loading}
    <p>Loading...</p>
  {:else if isAdmin}
    <div class="logout-button">
      <a href="/logout">Cerrar Sesion</a>
    </div>
    <article class="button-container">
      <a href="/admin/users/create">Agregar usuario</a>
      <a href="/admin/books/create">Agregar libro</a>
    </article>

    <Navbar currentPage={navPage}/>

    <article class="data-container">
      {#each books as book}
        <a href={`/admin/books/book/${book.id}`} class="data-info">
          <div>
            <span>Nombre:</span>
            <p>{book.name}</p>
          </div>
          <div>
            <span>Paginas:</span>
            <p>{book.pages}</p>
          </div>
          <div>
            <span>Autor:</span>
            <p>{book.author}</p>
          </div>
          <div>
            <span>Año:</span>
            <p>{book.year}</p>
          </div>
          </a>
      {/each}    

      <a href="#" class="data-info">
        <div>
          <span>Nombre:</span>
          <p>Libro con 200 paginas</p>
        </div>
        <div>
          <span>Paginas:</span>
          <p>200</p>
        </div>
        <div>
          <span>Autor:</span>
          <p>Jose Maria Fernandez</p>
        </div>
        <div>
          <span>Año:</span>
          <p>2023</p>
        </div>
      </a>

      <a href="#" class="data-info">
        <div>
          <span>Nombre:</span>
          <p>Libro con 200 paginas</p>
        </div>
        <div>
          <span>Paginas:</span>
          <p>200</p>
        </div>
        <div>
          <span>Autor:</span>
          <p>Jose Maria Fernandez</p>
        </div>
        <div>
          <span>Año:</span>
          <p>2023</p>
        </div>
      </a>

      <a href="#" class="data-info">
        <div>
          <span>Nombre:</span>
          <p>Libro con 200 paginas</p>
        </div>
        <div>
          <span>Paginas:</span>
          <p>200</p>
        </div>
        <div>
          <span>Autor:</span>
          <p>Jose Maria Fernandez</p>
        </div>
        <div>
          <span>Año:</span>
          <p>2023</p>
        </div>
      </a>

    </article>
  {:else}
    <p>Unathorized</p>
  {/if}
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

  .logout-button {
    width: 85dvw;
    display: flex;
    justify-content: flex-end;
    margin-top: 45px;

    & a:hover {
      color: #cd863fbe;
    }

    & a {
      text-decoration: none;
      color: peru;
      transition: all ease 0.3s;
    }
  }
</style>