<script lang="ts">
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte';
    import { goto } from '$app/navigation'; 
    import logoImg from '$lib/assets/img/logo.png';
    import VerticalCarousel from '$lib/components/common/VerticalCarousel.svelte';

    const links = [
        { label: 'Inicio',     href: '/', active: true },
        { label: 'Productos', href: '/products' },
        { label: 'Nosotros',  href: '/nosotros' },
        { label: 'Contacto',  href: '/contacto'  },
    ]

    const carouselInfo = [
		{
			tag: 'Novedad',
			title: 'Módulo de Analíticas',
			description: 'Ya está disponible el nuevo dashboard interactivo en tu panel.'
		},
		{
			tag: 'Soporte',
			title: 'Mantenimiento',
			description: 'El sistema actualmente no se encuentra disponible para los usuarios'
		},
		{
			tag: 'Tip',
			title: 'Mejora tu seguridad',
			description: 'Recuerda activar la autenticación de dos factores en tu perfil.'
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
		<h1>Bienvenido a SmartLogix</h1>
		<p>Haz scroll para descubrir más información</p>
		<div class="scroll-indicator">⬇</div>
	</section>

	<section class="content-section">
		<h2>Contenido Principal</h2>
		<p>Esto es una especie de marca para saber que se paaron los 200px...</p>
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
    }

    :global(.topbar-img) {
        height: 28px;
        width: auto;
        object-fit: contain;
        display: block;
    }

    .hero-section {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.scroll-indicator {
		margin-top: 2rem;
		font-size: 2rem;
		animation: float 2s ease-in-out infinite;
	}

	.content-section {
		padding: 4rem 2rem;
		min-height: 50vh;
	}

	.content-section.darker {
		background-color: var(--color-fondo-secundario, #BCCCDC);
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(10px); }
	}
</style>