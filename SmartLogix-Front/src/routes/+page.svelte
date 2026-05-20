<script lang="ts">
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte';
    import { goto } from '$app/navigation'; 

    const links = [
        { label: 'Inicio',    href: '/',         active: true },
        { label: 'Productos', href: '/products' },
        { label: 'Blog',      href: '/blog'      },
        { label: 'Contacto',  href: '/contacto'  },
    ]

    function handleNav(e: { href: string; label: string }) {
        console.log('Navegando a:', e.href);
        goto(e.href);
    }
</script>

<main>
    <Topbar {links} sticky onnavigate={handleNav}>
        {#snippet logo()}
            <img src="/logo.svg" alt="MiApp" height="28" />
        {/snippet}

        {#snippet actions()}
            <a href="/login" class="btn-comprar" style="text-decoration: none; text-align: center;">
                Ingresar
            </a >
            
             <a href="/register" class="btn-comprar" style="text-decoration: none; text-align: center;">
                Registrarse
            </a>
        {/snippet}
    </Topbar>   
    
    <h1>Bienvenido a Smart-Logix</h1>
</main>
