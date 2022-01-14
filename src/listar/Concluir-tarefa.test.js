import React from 'react';
import ReactDOM from 'react-dom';
import ConcluirTarefa from './Concluir-tarefa';
import Tarefa from '../models/tarefa.model';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Teste do componente de conclusao de tarefas', () => {

    const nomeTarefa = 'Tarefa de teste';
    const tarefa = new Tarefa(1, nomeTarefa, false);
    //console.log(tarefa);
    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ///renderizar ConcluirTarefa dentro da div
        ReactDOM.render(
            <ConcluirTarefa
            tarefa={tarefa}
            recarregarTarefas={() => false} />, div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('deve exibir o modal',() => {
        const { getByTestId } = render(
            <ConcluirTarefa 
            tarefa={tarefa}
            recarregarTarefas={() => false}/>
        );
        fireEvent.click(screen.getByTestId('btn-abrir-modal'));
        expect(screen.getByTestId('modal')).toHaveTextContent(nomeTarefa);
    });

    it('deve concluir uma tarefa',() => {
        //armazenando tarefa no local storage como string
        localStorage['tarefas'] = JSON.stringify([tarefa]);
        //renderizando componente
        const {getByTestId} = render(
            <ConcluirTarefa
            tarefa={tarefa}
            recarregarTarefas={() => false} />
        )
        //clicando em abrir modal
        fireEvent.click(screen.getByTestId('btn-abrir-modal'));
        //clicando no botao concluir
        fireEvent.click(screen.getByTestId('btn-concluir'));
        //parse para criar o objeto tarefasDb
        const tarefasDb = JSON.parse(localStorage['tarefas']);
        //resultado esperado
        expect(tarefasDb[0].concluida).toBeTruthy();
        
        tarefasDb.push({id: 2,nome: 'teste',concluida: false});
        //console.log(tarefasDb[1].nome);
    });

    

});
