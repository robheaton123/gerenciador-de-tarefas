import React from "react";
import reactDom from "react-dom";
import Paginacao from './Paginacao';
import {render, screen, fireEvent, getByAltText, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Deve renderizar o componente sem erros', () =>{



    it('deve renderizar o componente sem erros',() => {
        const div = document.createElement('div');
        reactDom.render(
            <Paginacao
            totalItems={10}
            itemsPorPagina={10}
            paginaAtual={1}
            mudarPagina={() => false}/>, div);
            reactDom.unmountComponentAtNode(div);
    });


    it('Deve exibir a paginacao contendo 3 paginas',() => {
        render(
            <Paginacao
            totalItems={15}
            itemsPorPagina={3}
            paginaAtual={1}
            mudarPagina={() => false} />

        );
          const paginacao = screen.getByTestId('paginacao'); //pegando pelo id
          //deve haver 3 paginas
          expect(paginacao).toHaveTextContent('1');
          expect(paginacao).toHaveTextContent('2');
          expect(paginacao).toHaveTextContent('3');
    });







});