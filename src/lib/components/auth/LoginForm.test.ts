import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm.svelte'; // Asegúrate de ajustar la ruta si es necesario

describe('LoginForm.svelte (Svelte 5)', () => {
	it('debe renderizar todos los elementos del formulario correctamente', () => {
		// En Svelte 5, pasamos las props directamente en el segundo argumento de render
		render(LoginForm, { onLogin: vi.fn(), errorMessage: '' });

		expect(screen.getByRole('heading', { name: /bienvenido/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /entrar a smartlogix/i })).toBeInTheDocument();

		// El badge de error no debería estar en el DOM inicialmente
		expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
	});

	it('debe mostrar el mensaje de error cuando se le pasa la prop errorMessage', () => {
		const mensajeError = 'Credenciales incorrectas';

		render(LoginForm, { onLogin: vi.fn(), errorMessage: mensajeError });

		const errorBadge = screen.getByText(mensajeError);
		expect(errorBadge).toBeInTheDocument();
		expect(errorBadge).toHaveClass('error-badge');
	});

	it('debe permitir escribir en los campos de usuario y contraseña', async () => {
		const user = userEvent.setup();
		render(LoginForm, { onLogin: vi.fn(), errorMessage: '' });

		const inputUsuario = screen.getByLabelText(/usuario/i);
		const inputPassword = screen.getByLabelText(/contraseña/i);

		// Simulamos la escritura del usuario
		await user.type(inputUsuario, 'testuser');
		await user.type(inputPassword, 'password123');

		expect(inputUsuario).toHaveValue('testuser');
		expect(inputPassword).toHaveValue('password123');
	});

	it('debe llamar a onLogin con los datos correctos al enviar el formulario', async () => {
		const user = userEvent.setup();
		const onLoginMock = vi.fn(); // Creamos una función espía (mock)

		render(LoginForm, { onLogin: onLoginMock, errorMessage: '' });

		const inputUsuario = screen.getByLabelText(/usuario/i);
		const inputPassword = screen.getByLabelText(/contraseña/i);
		const botonEnviar = screen.getByRole('button', { name: /entrar a smartlogix/i });

		// Llenamos el formulario (el input de tenant también debe llenarse)
		const inputTenant = screen.getByLabelText(/empresa \/ tenant/i);
		await user.type(inputTenant, 'logix-corp');
		await user.type(inputUsuario, 'admin');
		await user.type(inputPassword, 'admin123');

		// Hacemos click en el botón de submit
		await user.click(botonEnviar);

		// Verificamos que la función fue llamada exactamente 1 vez
		expect(onLoginMock).toHaveBeenCalledTimes(1);

		// Verificamos que fue llamada con los 3 argumentos: tenant, usuario, contraseña
		expect(onLoginMock).toHaveBeenCalledWith('logix-corp', 'admin', 'admin123');
	});
});
