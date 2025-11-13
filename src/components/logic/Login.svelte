<script lang="ts">
  import { supabase } from '../../lib/supabaseClient'
  import { onMount } from 'svelte'

  let email: string = ''
  let password: string = ''
  let errMsg: string = ''

  async function login (email: string, password: string) {
    errMsg = ''
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      errMsg = error.message
      alert(errMsg)
      return
    }

    const user = data.user
    const token = data.session?.access_token

    try {
      const response = await fetch(`http://localhost:3000/admin/users/search/${user.id}`)
      const data = await response.json()
      const dataUser = data[0]
      const userRol = dataUser.rol
    }
    catch(e) {
      console.error(e)
    }
  }
</script>

<section>
  <header>
    <h1>Login</h1>
  </header>

  <form action="">
    <div>
      <label for="email">Email:</label>
      <input id="email" type="text" placeholder="algo@correo.com" />
    </div>
  
    <div>
      <label for="pass">Password:</label>
      <input type="password" placeholder="Password">
    </div>

    <button type="submit">Ingresar</button>
  </form>

</section>

<style>
  h1 {
    text-align: center;
    margin-block: 65px;
    color: peru;
  }

  form {
    width: 75%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  div {
    margin: 0 auto;
  }

  label {
    font-size: 19px;
    font-weight: 500;
    color: peru;
    margin-right: 15px;
    line-height: 15px;
  }

  input {
    border: none;
    padding: 6px;
    border-radius: 4px;
  }

  input:focus-visible {
    background-color: lightsteelblue;
    outline: none;
  }

  button:hover {
    background-color: #956fc3e5;
  }

  button {
    width: 200px;
    height: 40px;
    margin: 0 auto;
    padding: 10px;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    background-color: #79529edc;
    transition: all ease 0.3s;
  }
</style>