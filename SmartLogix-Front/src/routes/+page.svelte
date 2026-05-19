<script lang="ts">
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte'

    const links = [
        { label: 'Inicio',    href: '/',         active: true },
        { label: 'Productos', href: '/productos' },
        { label: 'Blog',      href: '/blog'      },
        { label: 'Contacto',  href: '/contacto'  },
    ]

    // 1. Le decimos a TypeScript qué forma tiene "e"
    // 2. Usamos e.href directamente en lugar de e.detail.href
    function handleNav(e: { href: string; label: string }) {
        console.log('Navegando a:', e.href)
    }
</script>

<Topbar onnavigate={handleNav} />

<style>
    main {
        background-color: darkslategray; 
        }
</style>

<main>
    <Topbar {links} sticky onnavigate={handleNav}>

        {#snippet logo()}
            <img src="/logo.svg" alt="MiApp" height="28" />
        {/snippet}

        {#snippet actions()}
            <button>Ingresar</button>
            <button>Registrarse</button>
        {/snippet}

    </Topbar>   
</main>