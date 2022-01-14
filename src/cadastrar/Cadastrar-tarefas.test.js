import React from "react";
import ReactDom from "react-dom";
import CadastrarTarefa from "./Cadastrar-tarefas";
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; //importando toHaveTextContent

describe('Teste do componente de cadastro de tarefas',() => {

    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<CadastrarTarefa/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('deve renderizar o cadastro de tarefas sem erros', () => {
        render(<CadastrarTarefa/>);//renderizando
        const inputTxt = screen.getByTestId('txt-tarefa'); //pegando txt-tarefa
        fireEvent.change(inputTxt, {target: {value: 'Testar componente'}}); //simulando evento change com o valor 'Testar componente'
        const botaoCad = screen.getByRole('button');//pegando o botao
        fireEvent.click(botaoCad);///simulando evento de click no botao btn-cadastrar
        expect(screen.getByTestId('modal')).toHaveTextContent('Sucesso'); //texto esperado do modal
        expect(screen.getByTestId('modal')).toHaveTextContent('Tarefa adicionada com sucesso'); //texto esperado do modal
    });

});
