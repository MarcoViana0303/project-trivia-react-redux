import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import {mockQuestion, failMock} from './helpers/mockData'

describe('Verifica os elementos redenrizados na /feedback', () => {
    test('Verifica se componente é redenrizado carregado com a api', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockQuestion }));

        const {history} = renderWithRouterAndRedux(<App />)

        userEvent.type(screen.getByTestId('input-gravatar-email'),'ls6182315@gmail.com')
        userEvent.type(screen.getByTestId('input-player-name'),'Leo Capanato')

        const botao2 = screen.getByRole('button', {
            name: /play/i,
          });

          userEvent.click(botao2)

          const {location:{pathname}} = history
          expect(pathname).toBe('/game');

          await waitFor(() => expect(screen.getByTestId('question-category')).toBeInTheDocument());

    })
    it('Verifica o redirecionamento caso haja um erro na api', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => failMock }));

        const {history} = renderWithRouterAndRedux(<App />)
        const {location:{pathname}} = history

        userEvent.type(screen.getByTestId('input-gravatar-email'),'ls6182315@gmail.com')
        userEvent.type(screen.getByTestId('input-player-name'),'Leo Capanato')

        await waitFor(() => userEvent.click(screen.getByTestId('btn-play')));
        await waitFor(() => expect(pathname).toBe("/"));

    })
    })