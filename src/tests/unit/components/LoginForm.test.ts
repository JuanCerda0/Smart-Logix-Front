import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../../lib/components/auth/LoginForm.svelte';

describe('Componente LoginForm — Svelte 5', () => {
	it('Debería renderizar todos los campos requeridos y el título', () => {
		render(LoginForm, { props: { onLogin: vi.fn(), errorMessage: '' } });

		expect(screen.getByRole('heading', { name: /bienvenido/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/empresa \/ tenant/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
	});

	it('Debería mostrar un mensaje de error si la prop errorMessage está presente', () => {
		render(LoginForm, { props: { onLogin: vi.fn(), errorMessage: 'Error de conexión' } });

		const badge = screen.getByText('Error de conexión');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('error-badge');
	});

	it('Debería emitir los datos correctos (tenant, usuario, pass) al enviar el formulario', async () => {
		const mockOnLogin = vi.fn();
		const user = userEvent.setup();

		render(LoginForm, { props: { onLogin: mockOnLogin, errorMessage: '' } });

		// Llenamos el formulario interactivo
		await user.type(screen.getByLabelText(/empresa \/ tenant/i), 'logix-corp');
		await user.type(screen.getByLabelText(/usuario/i), 'jsmith');
		await user.type(screen.getByLabelText(/contraseña/i), 'secret123');

		// Click en enviar
		await user.click(screen.getByRole('button', { name: /entrar a smartlogix/i }));

		// Validamos que el padre reciba exactamente los 3 parámetros de la arquitectura
		expect(mockOnLogin).toHaveBeenCalledTimes(1);
		expect(mockOnLogin).toHaveBeenCalledWith('logix-corp', 'jsmith', 'secret123');
	});
});
