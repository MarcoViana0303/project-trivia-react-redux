import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { mockQuestion, failMock } from './helpers/mockData'

describe('Verifica os elementos redenrizados na /game', () => {
    test('Verifica se componente é redenrizado carregado com a api', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockQuestion }));

        const { history } = renderWithRouterAndRedux(<App />)

        userEvent.type(screen.getByTestId('input-gravatar-email'), 'ls6182315@gmail.com')
        userEvent.type(screen.getByTestId('input-player-name'), 'Leo Capanato')

        const botao2 = screen.getByRole('button', {
            name: /play/i,
        });

        userEvent.click(botao2)

        const { location: { pathname } } = history
        expect(pathname).toBe('/game');

        await waitFor(() => expect(screen.getByTestId('question-category')).toBeInTheDocument());

    })
    it('Verifica o redirecionamento caso haja um erro na api', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => failMock }));

        const { history } = renderWithRouterAndRedux(<App />)
        const { location: { pathname } } = history

        userEvent.type(screen.getByTestId('input-gravatar-email'), 'ls6182315@gmail.com')
        userEvent.type(screen.getByTestId('input-player-name'), 'Leo Capanato')

        await waitFor(() => userEvent.click(screen.getByTestId('btn-play')));
        await waitFor(() => expect(pathname).toBe("/"));

    })
    // seta o limite pro teste 35 segudos pra conseguir a condição do timer de 30sec
    jest.setTimeout(35000);
    // seta o limite pro teste 35 segudos pra conseguir a condição do timer de 30sec

    test('Clica no botão errado', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockQuestion }));
        const { history } = renderWithRouterAndRedux(<App />)

        userEvent.type(screen.getByTestId('input-gravatar-email'), 'ls6182315@gmail.com')
        userEvent.type(screen.getByTestId('input-player-name'), 'Leo Capanato')

        const botao2 = screen.getByRole('button', {
            name: /play/i,
        });

        userEvent.click(botao2)

        await waitFor(() => expect(screen.getByTestId('question-category')).toBeInTheDocument());

        jest.spyOn(global, 'clearTimeout');
        await waitFor(() => userEvent.click(screen.getByTestId(/wrong-answer../i)))
        await waitFor(() => userEvent.click(screen.getByTestId("btn-next")))
        const nextBtn = await screen.findByRole('button', { name: /next/i }, { timeout: 35000 });
        expect(nextBtn).toBeInTheDocument();

        const stopWatch = screen.getByRole('heading', { name: /0/i });
        expect(stopWatch).toBeInTheDocument();

    })
})