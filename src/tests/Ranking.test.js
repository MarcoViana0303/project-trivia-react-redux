import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import {mockQuestion, failMock} from './helpers/mockData'

const initial = {
    name: '',
    assertions: 4,
    score: 135,
    gravatarEmail: '',
  };

describe('Verifica os elementos redenrizados na /ranking', () => {
    test('Simula uma rodada pra verificar os resultados no ranking', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockQuestion }));
        let i = 0
        const { history } = renderWithRouterAndRedux(<App />)
        const { location: { pathname } } = history

        userEvent.type(screen.getByTestId('input-gravatar-email'), 'ls6182315@gmail.com')
        userEvent.type(screen.getByTestId('input-player-name'), 'Leo Capanato')

        const botao2 = screen.getByRole('button', {
            name: /play/i,
        });

        userEvent.click(botao2)

        await waitFor(() => expect(screen.getByTestId('question-category')).toBeInTheDocument());
        // laço para clicar 5 vezes
          do {
            i+=1
              await waitFor(() => userEvent.click(screen.getByTestId("correct-answer")))
              await waitFor(() => userEvent.click(screen.getByTestId("btn-next")))

          } while(i < 5)
          await waitFor(() => userEvent.click(screen.getByTestId("btn-ranking")))
        //   expect(pathname).toBe('/ranking');
          expect(screen.getByTestId("ranking-title"))
          await waitFor(() => userEvent.click(screen.getByTestId("btn-go-home")))
          expect(pathname).toBe('/');


    })

})