<script lang="ts">
	import Topbar from '$lib/components/layout/TopBar/topbar.svelte';
	import { goto } from '$app/navigation';
	import logoImg from '$lib/assets/img/logo.png';

	const links = [
		{ label: 'Inicio', href: '/' },
		{ label: 'Productos', href: '/products' },
		{ label: 'Nosotros', href: '/nosotros' },
		{ label: 'Contacto', href: '/contacto', active: true }
	];

	function handleNav(e: { href: string; label: string }) {
		console.log('Navegando a:', e.href);
		goto(e.href);
	}
</script>

<Topbar {links} sticky onnavigate={handleNav}>
	{#snippet logo()}
		<img src={logoImg} alt="SmartLogix" class="topbar-img" /> SmartLogix
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
			<h1>¿Tuviste problemas y no pudiste solucionarlo?</h1>
			<p>
				No dudes en contactarnos en SmartLogix nuestra mayor prioridad es que tu pyme funcione, nuestro negocio es que tu negocio progrese.
			</p>
			<div class="scroll-indicator">⬇</div>
		</div>
	</section>

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
</style>
