import React from "react";
import ReactDOM from "react-dom";
import RemoverTarefa from './Remover-tarefa';
import Tarefa from '../models/tarefa.model';
import { render,fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de remoção de tarefas',() =>{ 
    const nomeTarefa = 'Tarefa de teste';
    const tarefa = new Tarefa(1,nomeTarefa,false);

    it('Deve renderizar o componente sem erros',() => {
        const div = document.createElement('div');
        ReactDOM.render(
            <RemoverTarefa
            tarefa={tarefa}
            recarregarTarefas={() => false}/>, div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a modal', () => {
        render(
            <RemoverTarefa
            tarefa={tarefa}
            recarregarTarefas={() => false}/>
        );
        fireEvent.click(screen.getByTestId('btn-abrir-modal'));
        expect(screen.getByTestId('modal')).toHaveTextContent(nomeTarefa);


    });

    it('Deve remover uma tarefa', () => {
        //armazenando tarefa no localStorage
        localStorage['tarefas'] = JSON.stringify([tarefa]);
        //renderizando componente
        render(
            <RemoverTarefa
            tarefa={tarefa}
            recarregarTarefas={() => false}/>
        );
        //abrindo modal
        fireEvent.click(screen.getByTestId('btn-abrir-modal'));
        //clicando no botao remover
        fireEvent.click(screen.getByTestId('btn-remover'));
        //criando objeto para ser usado no expect
        const tarefasDb = JSON.parse(localStorage['tarefas']);
        //length deve ser 0
        expect(tarefasDb.length).toBe(0);
    });



});