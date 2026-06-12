<script lang="ts">
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte';
    import { goto } from '$app/navigation'; 
    import logoImg from '$lib/assets/img/logo.png';

    const links = [
        { label: 'Inicio',    href: '/' },
        { label: 'Productos', href: '/products' },
        { label: 'Nosotros',  href: '/nosotros', active: true },
        { label: 'Contacto',  href: '/contacto'  },
    ]

    function handleNav(e: { href: string; label: string }) {
        console.log('Navegando a:', e.href);
        goto(e.href);
    }
</script>

<Topbar {links} sticky onnavigate={handleNav}>
    {#snippet logo()}
        <img src={logoImg} alt="SmartLogix" class="topbar-img"> SmartLogix
    {/snippet}

    {#snippet actions()}
        <a href="/login" class="btn-comprar" style="text-decoration: none; text-align: center;">
            Ingresar
        </a>
        
         <a href="/register" class="btn-comprar" style="text-decoration: none; text-align: center;">
            Registrarse
        </a>
    {/snippet}
</Topbar>   