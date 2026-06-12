<script lang="ts">
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte';
    import { goto } from '$app/navigation'; 
    import logoImg from '$lib/assets/img/logo.png';
    import VerticalCarousel from '$lib/components/common/VerticalCarousel.svelte';

    const links = [
        { label: 'Inicio',    href: '/', active: true },
        { label: 'Productos', href: '/products' },
        { label: 'Nosotros',  href: '/nosotros' },
        { label: 'Contacto',  href: '/contacto'  },
    ]

    const carouselInfo = [
        {
            tag: 'Novedad',
            title: 'Ya poseemos un carrusel',
            description: 'Ya está disponible el nuevo carrusel al deslizar la pantalla, ya deberias estar viendolo.'
        },
        {
            tag: 'Soporte',
            title: 'Mantenimiento',
            description: 'El sistema actualmente no se encuentra disponible para los usuarios'
        },
        {
            tag: 'Tip',
            title: 'Accede a beneficios exclusivos',
            description: 'Recuerda crear tu usuario para poder acceder a todos nuestros beneficios.'
        },
        {
            tag: 'Recuerdo',
            title: 'Modificaciones',
            description: 'Si no cambie este mensaje significa que no avance una fegada srry'
        }
    ];

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

<main>
    <section class="hero-section">
        <div class="hero-card">
            <h1>Bienvenido a SmartLogix</h1>
            <p>Haz scroll para descubrir más información</p>
            <div class="scroll-indicator">⬇</div>
        </div>
    </section>

    <section class="content-section">
        <h2>Contenido Principal</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit... no se que mas sigue solo estoy rellenando</p>
    </section>

    <section class="content-section darker">
        <h2>Más funcionalidades</h2>
        <p> ¿la tarjeta se activó de forma reactiva?.</p>
    </section>

    <VerticalCarousel items={carouselInfo} />
</main>

<style>
    main {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem; 
    }

    :global(.topbar-img) {
        height: 28px;
        width: auto;
        object-fit: contain;
        display: block;
    }

/* === CONTENEDOR DEL HERO (Invisible) === */
    .hero-section {
        /* Mantiene la altura completa de la pantalla para forzar el scroll */
        min-height: calc(100vh - 4rem - 64px); 
        width: 100%;
        
        /* Centra la tarjeta pequeña en medio de la pantalla */
        display: flex;
        align-items: center; 
        justify-content: center;
    }

    /* === TARJETA DE CRISTAL (Glassmorphism Pequeño) === */
    .hero-card {
        max-width: 700px; /* Un poco más estrecho para mayor elegancia */
        width: 100%;
        padding: 3rem 2rem;
        
        /* Centrado del texto interno */
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        
        /* Aquí va toda la magia visual */
        background: color-mix(in srgb, var(--color-fondo-principal) 75%, transparent);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: var(--radio-borde);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: var(--sombra-tarjeta);
    }

    .hero-card h1 {
        font-size: 2.5rem;
        font-weight: 800;
        text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5);
        margin-bottom: 0.5rem;
        margin-top: 0;
    }

    .hero-card p {
        font-size: 1.2rem;
        color: var(--color-texto-secundario);
        margin: 0;
    }

    /* Mejora de títulos para el impacto inicial */
    .hero-section h1 {
        font-size: 2.5rem;
        font-weight: 800;
        text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5);
        margin-bottom: 0.5rem;
    }

    .hero-section p {
        font-size: 1.2rem;
        color: var(--color-texto-secundario);
    }

    .scroll-indicator {
        margin-top: 2.5rem;
        font-size: 2rem;
        animation: float 2s ease-in-out infinite;
    }

    /* === CONTENT SECTION CON GLASSMORPHISM === */
    .content-section {
        padding: 4rem 2rem;
        min-height: 50vh;
        
        /* Efecto Transparencia (un poco más opaco para lectura larga) */
        background: color-mix(in srgb, var(--color-fondo-principal) 85%, transparent);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: var(--radio-borde);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: var(--sombra-tarjeta);
    }

    /* Variante oscura usando tu color secundario */
    .content-section.darker {
        background: color-mix(in srgb, var(--color-fondo-secundario) 80%, transparent);
        border: 1px solid rgba(98, 125, 152, 0.15); 
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(10px); }
    }
</style>