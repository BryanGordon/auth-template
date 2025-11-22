<script lang="ts">
    import { onMount } from 'svelte';
  import { supabase } from '../../lib/supabaseClient'
  
  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  onMount(() => {
    logout()
  })

</script>

<h3>
  Logging out...
</h3>