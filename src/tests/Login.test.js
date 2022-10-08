import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';
import mockData from './helpers/mockData'

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


    })

    it('Verifica as informações passadas estão validas', () => {
      const { history } = renderWithRouterAndRedux(<App />);
    
      const inputEmail2 = screen.getByTestId('input-gravatar-email')
      const inputName2 = screen.getByTestId('input-player-name');
      const botao2 = screen.getByRole('button', {
        name: /play/i,
      });
    
      expect(botao2).toBeDisabled();

      userEvent.type(inputEmail2,'alguem123@gmail.com')
      userEvent.type(inputName2,'Lara Costa')

      expect(botao2).toBeEnabled()

      userEvent.click(botao2);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/game');

    })
    it('Verifica o retorno da api gerana no componentDidMount', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
      renderWithRouterAndRedux(<App />);
      
      expect(global.fetch).toHaveBeenCalled();
    })
})