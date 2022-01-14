import React from "react";
import ReactDOM from "react-dom";
import ItensListaTarefas from "./Itens-lista-tarefas";
import Tarefa from '../models/tarefa.model';
import {render, fireEvent, screen, within, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Teste do componente que exibe um item da listagem de tarefas', () =>{

    const nomeTarefa = 'Tarefa';
    //objeto tarefa {}
    const tarefa = new Tarefa(1, nomeTarefa,false);
    const tarefaConcluida = new Tarefa(2, nomeTarefa,true);


    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ItensListaTarefas
            tarefas={[]}
            recarregarTarefas={() => false}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    //renderizando o componente ItensListaTarefas
    it('deve exibir a tarefa', () => {
      render(
            <table>
                <tbody>
                    <ItensListaTarefas
                    tarefas={[tarefa]}
                    recarregarTarefas={() => false}/>
                </tbody>
            </table>
        );
   //deve conter o texto: Tarefa
    expect(screen.getByTestId('tarefa')).toHaveTextContent(nomeTarefa);

    });

    //renderizando o componente ItensListaTarefas
    it('deve exibir a tarefa concluida', () => {
        render(
                <table>
                    <tbody>
                        <ItensListaTarefas
                        tarefas={[tarefaConcluida]}
                        recarregarTarefas={() => false}/>
                    </tbody>
                </table>
            );
        //deve conter o CSS text-decoration: line-through, após a renderização (renderização no navegador)
        expect(screen.getByTestId('nome-tarefa')).toHaveStyle('text-decoration: line-through');
    
        });


}


);