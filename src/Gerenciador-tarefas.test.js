import React from "react";
import ReactDom from "react-dom";
import GerenciadorTarefas from "./Gerenciador-tarefas"; //arquivo de teste

describe('Teste do componente de Gerenciamento de tarefas',() => {

    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div'); //criando div
        ReactDom.render(<GerenciadorTarefas/>, div); //renderizando o componente na div
        ReactDom.unmountComponentAtNode(div); //desmontando o componente
    });

});