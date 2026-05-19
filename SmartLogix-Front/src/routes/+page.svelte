<script lang="ts">
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte'

    const links = [
        { label: 'Inicio',    href: '/',         active: true },
        { label: 'Productos', href: '/productos' },
        { label: 'Blog',      href: '/blog'      },
        { label: 'Contacto',  href: '/contacto'  },
    ]

    function handleNav(e: { href: string; label: string }) {
        console.log('Navegando a:', e.href)
    }
</script>

<main>
    <Topbar {links} sticky onnavigate={handleNav}>
        {#snippet logo()}
            <img src="/logo.svg" alt="MiApp" height="28" />
        {/snippet}

        {#snippet actions()}
            <button class="btn-comprar">Ingresar</button>
            <button class="btn-comprar">Registrarse</button>
        {/snippet}
    </Topbar>   
    
    <h1>Bienvenido a Smart-Logix</h1>
</main>
