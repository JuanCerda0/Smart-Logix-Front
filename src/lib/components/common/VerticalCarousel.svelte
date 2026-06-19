<script lang="ts">
	import { fly } from 'svelte/transition';

	// 1. Tipado estricto para evitar errores en las props
	interface CarouselItem {
		tag?: string;
		title: string;
		description: string;
	}

	interface Props {
		items?: CarouselItem[];
	}

	// 2. Desestructuración de Props con Runes(Despues te explico como funciona y porque siento que debo comprar un sombrero de mago XD) en Svelte 5
	let { items = [] }: Props = $props();

	// 3. Estados reactivos (Runes)
	let scrollY = $state(0);
	let currentIndex = $state(0);
	let isHovered = $state(false);

	// 4. Estado derivado: a partir de los 200px se """despliega""" el carrusel, pero solo si hay items para mostrar
	let isVisible = $derived(scrollY > 200 && items.length > 0);

	// 5. Efecto secundario: El temporizador
	$effect(() => {
		// Si no está visible, si el mouse está encima, o si hay 1 solo item, no hace nada
		if (!isVisible || isHovered || items.length <= 1) return;

		const interval = setInterval(() => {
			// Ciclo infinito: 0, 1, 2... y vuelve a 0
			currentIndex = (currentIndex + 1) % items.length;
		}, 4000);

		// Limpieza del intervalo al desmontar o re-ejecutar
		return () => clearInterval(interval);
	});
</script>

<svelte:window bind:scrollY />

{#if isVisible}
	<div 
		class="floating-carousel-card"
		transition:fly={{ y: 50, duration: 500 }}
		onmouseenter={() => isHovered = true}
		onmouseleave={() => isHovered = false}
		role="region"
		aria-label="Noticias y actualizaciones"
	>
<div class="carousel-viewport">
			<div 
				class="carousel-track" 
				style="transform: translateY(-{currentIndex * 100}%);"
			>
				{#each items as item, index (index)}
					<div class="carousel-item" aria-hidden={currentIndex !== index}>
						{#if item.tag}
							<span class="badge">{item.tag}</span>
						{/if}
						<h3 class="title">{item.title}</h3>
						<p class="description">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>

		{#if items.length > 1}
			<div class="carousel-dots">
				{#each items as item, index (index)}
					<button 
						class="dot" 
						class:active={currentIndex === index}
						onclick={() => currentIndex = index}
						aria-label="Ir a: {item.title}" 
					></button>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.floating-carousel-card {
		position: fixed;
		bottom: 24px;
		right: 24px;
		width: 320px;
		height: 160px;
		z-index: 9999;
		padding: 20px;
		box-sizing: border-box;
		border-radius: var(--radio-borde, 8px);
		font-family: var(--fuente-principal, sans-serif);
		
		/* Glassmorphism */
		background: rgba(240, 244, 248, 0.65);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(98, 125, 152, 0.25);
		box-shadow: 0 10px 25px -5px rgba(36, 59, 83, 0.15);
		
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		transition: box-shadow 0.3s ease;
	}

	.floating-carousel-card:hover {
		box-shadow: 0 15px 30px -5px rgba(36, 59, 83, 0.25);
	}

	.carousel-viewport {
		position: relative;
		width: 100%;
		height: 100px;
		overflow: hidden;
	}

	.carousel-track {
		display: flex;
		flex-direction: column;
		height: 100%;
		transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.carousel-item {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-shrink: 0;
	}

	.badge {
		align-self: flex-start;
		font-size: 0.7rem;
		text-transform: uppercase;
		font-weight: 700;
		color: #fff;
		background-color: var(--color-accion);
		padding: 3px 8px;
		border-radius: 4px;
		margin-bottom: 8px;
	}

	.title {
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--color-texto-principal);
		margin: 0 0 4px 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.description {
		font-size: 0.85rem;
		line-height: 1.4;
		color: var(--color-texto-secundario);
		margin: 0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.carousel-dots {
		display: flex;
		justify-content: center;
		gap: 6px;
		margin-top: 8px;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: none;
		background-color: var(--color-fondo-secundario);
		cursor: pointer;
		padding: 0;
		transition: all 0.3s ease;
	}

	.dot.active {
		background-color: var(--color-accion);
		transform: scale(1.3);
	}

	.dot:hover:not(.active) {
		background-color: var(--color-accion-hover);
	}
</style>