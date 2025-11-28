<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../lib/supabaseClient';


interface Book {
  id: string
  name: string
  author: string
  pages: string
  year: string
  rol: string
}

export let userId: string = ''
let book:Book []= []

onMount(async () => {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  if (!token) {
    window.location.href = "/"
    return
  }

  try {
    const roleResponse = fetch('http://localhost:3000/login', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
})

</script>

<section>
    <h1>{book.name}</h1>
    <a class="go-back" href="/admin/books">Volver atras</a>

    <article>
      <div>
        <span>Autor:</span>
        <p>{book.author}</p>
      </div>
      <div>
        <span>Paginas:</span>
        <p>{book.pages}</p>
      </div>
      <div>
        <span>Año:</span>
        <p>{book.year}</p>
      </div>

      <div>
        <a class="update-button" href={`/admin/books/update/${book.id}`}>Update Name</a>
      </div>

    </article>
    <!--Colocar el componente de borrado-->
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