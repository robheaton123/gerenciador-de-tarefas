import React from "react";
import ReactDom from "react-dom";
import ListarTarefas from "./Listar-tarefas";
import Tarefa from '../models/tarefa.model';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de listagem de tarefas',() => {

    const nomePrimeiraTarefa = 'Primeira tarefa';
    const nomeSegundaTarefa = 'Segunda tarefa';
    const nomeTerceiraTarefa = 'Terceira tarefa';

    //antes do teste, cria-se os dados no local storage
    beforeEach(() => {
        localStorage['tarefas'] = JSON.stringify([
            new Tarefa(1,nomePrimeiraTarefa, false),
            new Tarefa(2,nomeSegundaTarefa, false),
            new Tarefa(3,nomeTerceiraTarefa, false)
        ]);
    });

    //apos o teste, o local storage é deletado
    afterEach(() =>{
        delete localStorage['tarefas'];
    });

    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<ListarTarefas/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('deve exibir uma tarefa contendo três tarefas', () => {
        render(<ListarTarefas/>);
        const tabela = screen.getByTestId('tabela');
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).toHaveTextContent(nomeTerceiraTarefa);
    });

    it('deve filtrar os dados da tabela de tarefas', () => {
        render(<ListarTarefas/>);
        //alterando evento onChange para nomePrimeiraTarefa
        fireEvent.change(screen.getByTestId('txt-tarefa'), {target: {value: nomePrimeiraTarefa}});
        const tabela = screen.getByTestId('tabela');
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).not.toHaveTextContent(nomeTerceiraTarefa);
    });


});

export default ListarTarefas;