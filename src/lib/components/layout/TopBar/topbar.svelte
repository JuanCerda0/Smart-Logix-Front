<script lang="ts">
  import type { Snippet } from 'svelte';
  import defaultLogo from '$lib/assets/img/logo.png'; 

  interface Props {
    sticky?: boolean;
    links?: Array<{ label: string; href: string; active?: boolean }>; 
    onnavigate?: (link: { href: string; label: string }) => void;
    logo?: Snippet; 
    actions?: Snippet;
  }

  let { sticky = false, links = [], onnavigate, logo, actions }: Props = $props();

  // Estado reactivo para controlar el menú móvil desplegable
  let isMobileMenuOpen = $state(false);

  function handleNav(link: { href: string, label: string }) {
    isMobileMenuOpen = false; //Creazlo o no en svelte si hay runas que existen desde antes de configurarlas
    if (onnavigate) {
      onnavigate({ href: link.href, label: link.label });
    }
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<nav class:sticky>
  <a class="logo-container" href="/">
    {#if logo}
      {@render logo()}
    {:else}
      <img src={defaultLogo} alt="Logo" class="topbar-logo" />
    {/if}
  </a>

  <div class="nav-links desktop-only">
    {#each links as link (link.href)}
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
      <div class="actions-container">
        {@render actions()}
      </div>
    {/if}

    {#if links.length > 0}
      <button 
        class="mobile-menu-toggle" 
        onclick={toggleMobileMenu} 
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span class="bar" class:open={isMobileMenuOpen}></span>
        <span class="bar" class:open={isMobileMenuOpen}></span>
        <span class="bar" class:open={isMobileMenuOpen}></span>
      </button>
    {/if}
  </div>
</nav>

{#if isMobileMenuOpen && links.length > 0}
  <div class="mobile-menu">
    {#each links as link (link.href)}
      <a 
        href={link.href}
        class="mobile-nav-link"
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
{/if}

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem; /* Padding responsivo inicial */
    height: 48px;     /* Altura más compacta para móviles */
    background: white;
    border-bottom: 1px solid #e5e7eb;
    transition: height 0.2s ease, padding 0.2s ease;
  }

  nav.sticky {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    font-weight: 600;
    color: #111;
  }

  .topbar-logo {
    height: 24px; /* Logo más pequeño en móvil */
    width: auto;
    object-fit: contain;
    transition: height 0.2s ease;
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

  /* --- SISTEMA PARA MÓVILES (BOTÓN BURGIR) --- */
  .mobile-menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 101;
  }

  .mobile-menu-toggle .bar {
    width: 24px;
    height: 2px;
    background-color: #374151;
    border-radius: 10px;
    transition: all 0.2s linear;
    transform-origin: 1px;
  }

  
  .mobile-menu-toggle .bar.open:nth-child(1) { transform: rotate(45deg); }
  .mobile-menu-toggle .bar.open:nth-child(2) { opacity: 0; translate: 20px 0; }
  .mobile-menu-toggle .bar.open:nth-child(3) { transform: rotate(-45deg); }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    background: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 0.5rem 1rem 1rem 1rem;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    z-index: 99;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  }

  .mobile-nav-link {
    padding: 10px 14px;
    text-decoration: none;
    color: #4b5563;
    font-size: 15px;
    border-radius: 6px;
  }

  .mobile-nav-link.active {
    background: #eff6ff;
    color: #1d5fa5;
    font-weight: 500;
  }

  /* --- RESPONSIVIDAD: PANTALLAS MEDIANAS Y GRANDES (Tablets / PC) --- */
  @media (min-width: 768px) {
    nav {
      height: 64px;       /* Crece la barra en pantallas grandes */
      padding: 0 2rem;    /* Más espacio a los lados */
    }

    .topbar-logo {
      height: 36px;       /* El logo se vuelve más imponente */
    }

    .mobile-menu-toggle {
      display: none;      /* Ocultamos el botón hamburguesa */
    }

    .mobile-menu {
      display: none;      /* Nos aseguramos de que el menú móvil no se renderice */
    }
  }

  /* Control de visibilidad de links según pantalla */
  @media (max-width: 767px) {
    .desktop-only {
      display: none !important; /* Oculta los links planos en móvil */
    }
  }
</style>