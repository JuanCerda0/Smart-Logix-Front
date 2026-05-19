<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    sticky?: boolean;
    links?: Array<{ label: string; href: string; active?: boolean }>; 
    onnavigate?: (link: { href: string; label: string }) => void;
    
    logo?: Snippet;
    actions?: Snippet;
  }

  let { sticky = false, links = [], onnavigate, logo, actions }: Props = $props();

  function handleNav(link: { href: string, label: string }) {
    if (onnavigate) {
      onnavigate({ href: link.href, label: link.label });
    }
  }
</script>

<nav class:sticky>

  <a class="logo" href="/">
    {#if logo}
      {@render logo()}
    {:else}
      <h1>Logo</h1>
    {/if}
  </a>

  <div class="nav-links">
    {#each links as link}
      <a 
        href={link.href}
        class="nav-link"
        class:active={link.active}
        onclick={(e) => {
          e.preventDefault();
          handleNav(link);
        }}
      >
        {link.label}
      </a>
    {/each}
  </div>

  <div class="nav-actions">
    {#if actions}
      {@render actions()}
    {/if}
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