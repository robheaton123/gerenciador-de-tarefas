import React from "react";
import ReactDom from "react-dom";
import AtualizarTarefa from "./Atualizar-tarefa";
import Tarefa from '../models/tarefa.model';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de atualizacao de tarefa',() => {
    //tarefa para atualizacao
    const tarefaId =1;
    const tarefa = new Tarefa(tarefaId, 'Nova tarefa', false);

    //antes do teste
    beforeEach(() => {
        localStorage['tarefas'] = JSON.stringify([tarefa]);
    });

    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<AtualizarTarefa id={tarefaId}/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('deve exibir a modal de sucesso ao atualizar uma tarefa', () => {
        render(
            <AtualizarTarefa id={tarefaId} />
        );
        fireEvent.click(screen.getByTestId('btn-atualizar'));
        expect(screen.getByTestId('modal')).toHaveTextContent('Sucesso');
    });

    it('deve atualizar uma tarefa', () => {
        const nomeTarefaAtualizada = 'Tarefa atualizada';
        render(<AtualizarTarefa id={tarefaId}/>);
        //alterando o texto do txt-tarefa(onChange)
        fireEvent.change(screen.getByTestId('txt-tarefa'), {target: {value: nomeTarefaAtualizada}});
        fireEvent.click(screen.getByTestId('btn-atualizar'));
        const tarefasDb = JSON.parse(localStorage['tarefas']);
        console.log(tarefasDb[0].nome);
        //deve ser o nomeTarefaAtualizada
        expect(tarefasDb[0].nome).toBe(nomeTarefaAtualizada);
    });

});
