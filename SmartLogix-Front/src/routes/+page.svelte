<script>
	let string = `MUNDO!!!`;

    import Topbar from '$lib/components/layout/TopBar/topbar.svelte'

    const links = [
        { label: 'Inicio',    href: '/',         active: true },
        { label: 'Productos', href: '/productos' },
        { label: 'Blog',      href: '/blog'      },
        { label: 'Contacto',  href: '/contacto'  },
    ]

    function handleNav(e) {
        console.log('Navegando a:', e.detail.href)
    }

</script>

<style>
    main {
        background-color: darkslategray; 
        }
</style>

<main>

    <Topbar> <!--{links} sticky on:navigate={handleNav}>-->

        <!--<img slot="logo" src="/logo.svg" alt="MiApp" height="28" />-->

        <div slot="actions">
            <button>Ingresar</button>
            <button>Registrarse</button>
        </div>

    </Topbar>   

    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
    <p>Hola {string}</p>

</main>