<script lang="ts">
  import { supabase } from '../../lib/supabaseClient'

  let email: string = ''
  let password: string = ''
  let errMsg: string = ''

  async function login (e: Event) {
    e.preventDefault()
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

    const user = data.user // No hace falta
    console.log("DATOS DEL USUARIO", user)
    const token = data.session?.access_token

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log("ROL DEL USUARIO  ", data.rol)

      if (data.rol === "admin") {
        window.location.href = '/admin'
      } else {
        window.location.href = '/user'
      }
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

  <form on:submit={login}>
    <div>
      <label for="email">Email:</label>
      <input id="email" type="text" placeholder="algo@correo.com" bind:value={email} />
    </div>
  
    <div>
      <label for="pass">Password:</label>
      <input type="password" placeholder="Password" bind:value={password}>
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