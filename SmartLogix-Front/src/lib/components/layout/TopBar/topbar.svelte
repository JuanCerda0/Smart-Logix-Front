<script>
  /* export let logo = 'MiApp'
   export let links = [] */
  export let sticky = false

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  
  function handleNav(link) {
    dispatch('navigate', { href: link.href, label: link.label })
    }
    
</script>

<nav class:sticky>

  <!-- Zona izquierda: logo -->
  <a class="logo" href="/">
  <!--
    <slot name="logo">
      <div class="logo-icon">
        <svg .../>
      </div>
      <span class="logo-name">{logo}</span>
    </slot>
    1-->
    <h1>Logo</h1>
  </a>

  <!-- Centro: enlaces -->
  <div class="nav-links">
  <!--
    {#each links as link}
      
        href={link.href}
        class="nav-link"
        class:active={link.active}
        on:click|preventDefault={() => handleNav(link)}
      <a>
        {link.label}
      </a>
    {/each}
    -->
    <h1>Enlaces</h1>
  </div>

  <!-- Zona derecha: acciones -->
  <div class="nav-actions">
    <slot name="actions" />
  </div>

</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    height: 56px;
    background: white;
    border-bottom: 1px solid #e5e7eb;
  }

  nav.sticky {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    font-weight: 600;
    color: #111;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    font-size: 14px;
    color: #6b7280;
    padding: 6px 12px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }

  .nav-link:hover {
    background: #f3f4f6;
    color: #111;
  }

  .nav-link.active {
    color: #1d5fa5;
    font-weight: 500;
    background: #eff6ff;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>