import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const initial = {
    name: '',
    assertions: 4,
    score: 135,
    gravatarEmail: '',
  };

describe('Verifica os elementos redenrizados na /feedback', () => {
    test('Verifica se componente recebe as informação da pontuação do jogo', async () => {
        renderWithRouterAndRedux(<App />, {}, '/feedback');

        const feedback = screen.getByTestId("feedback-text")
        const btnRanking = screen.getByTestId("btn-ranking")
        const btnAgain = screen.getByTestId("btn-play-again")

        expect(feedback).toBeInTheDocument()
        expect(btnRanking).toBeInTheDocument()
        expect(btnAgain).toBeInTheDocument()
    }) 
    it('Verfica a mensagem condicional "Well done"', () => {
        renderWithRouterAndRedux(<App />, {player:initial}, '/feedback');

        const feedback2 = screen.getByTestId("feedback-text")

        expect(feedback2).toHaveTextContent(/well done!/i)


    } )     
    it('Varificando as funcionalidades dos botão "Play Again"', () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
        
        const btnAgain2 = screen.getByTestId("btn-play-again")
        userEvent.click(btnAgain2)

        const { location: { pathname}} = history
        expect(pathname).toBe('/')

    })
    it('Varificando as funcionalidades dos botão "Ranking"', () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
        
        const btnRanking2 = screen.getByTestId("btn-ranking")
        userEvent.click(btnRanking2)

        const { location: { pathname}} = history
        expect(pathname).toBe('/ranking')

    })
})
