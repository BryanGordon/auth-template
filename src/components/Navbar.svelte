<script lang="ts">
  export let currentPage: string = ''
</script>

<nav>
  <ul>
    <li>
      <a class={currentPage === "/admin/books" ? "active" : "" } href="/admin/books">Libros</a>
    </li>
    <li>
      <a class={currentPage === "/admin/users" ? "active" : "" } href="/admin/users">Usuarios</a>
    </li>
  </ul>
</nav>

<style>
  nav {
    width: 100%;
    margin-block: 45px;
  }

  ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 45px;
  }

  li {
    list-style: none;
    font-size: 19px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: peru;
  }

  .active {
    color: whitesmoke;
    font-size: 20px;
    transition: color ease 0.3s ;
  }
</style>