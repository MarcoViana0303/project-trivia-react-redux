import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';

describe('Testa o componente Login', () => {
    test('Verifica o campo email e nome são existentes', () => {
        renderWithRouterAndRedux(<App />);

      const inputEmail = screen.getByTestId('input-gravatar-email')
      const inputName = screen.getByTestId('input-player-name');
      const botao = screen.getByRole('button', {
        name: /play/i,
      });
      expect(inputEmail).toBeInTheDocument();
      expect(inputName).toBeInTheDocument();
      expect(botao).toBeInTheDocument();

      expect(botao).toBeDisabled();


      userEvent.type(inputEmail,'alguem123@gmail.com')
      userEvent.type(inputName,'Lara Costa')

      expect(botao).toBeEnabled()

      userEvent.click(botao);

    })
})