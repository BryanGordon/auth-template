<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from '../lib/supabaseClient'

  interface Book {
    id: string,
    name: string,
    author: string,
    pages: number,
    year: number
  }

  let loading = true
  let isAthu = false
  let books: Book[] = []

  onMount(async () => {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token

    if (!token) {
      window.location.href = "/"
      return
    }

    isAthu = true

    try {
      const response = await fetch('http://localhost:3000/books', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      books = await response.json()
      console.log(books)
    }
    catch(e) {
      alert("Error getting data")
      console.error(e)
    }

    loading = false

  })

</script>

<section>
  {#if loading}
    <p>Loading...</p>
  {:else if isAthu}
  <div class="logout-button">
    <a href="/logout">Cerrar Sesion</a>
  </div>
  <article class="data-container">
    {#each books as book}
      <div class="data-info">
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
        </div>
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
    <p>Unauthorized</p>
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
    margin-top: 100px;
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
    justify-content: end;
    margin-top: 75px;

    & a:hover {
      color: #cd863fbc;
    }

    & a{
      text-decoration: none;
      color: peru;
      transition: all ease 0.3s;
    }
  }
</style>