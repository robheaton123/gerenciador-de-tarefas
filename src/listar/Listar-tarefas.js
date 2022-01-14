import React, {useState, useEffect} from "react";
import {A} from 'hookrouter';
import {Form, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ItensListaTarefas from "./Itens-lista-tarefas";
import Paginacao from "./Paginacao";
import Ordenacao from "./Ordenacao";

function ListarTarefas(){

    const ITENS_POR_PAG = 3; //itens por pagina
    const [tarefas, setTarefas] = useState([]);
    const [carregarTarefas, setCarregarTarefas] = useState(true); //usado para controlar a atualizacao da pagina via useEffect
    const [totalItems, setTotalItems] = useState(0); //totalItems DB
    const [paginaAtual, setPaginaAtual] = useState(1); //pagina atual, inicia em 1
    const [ordenarAsc, setOrdenarAsc] = useState(false);
    const [ordenarDesc, setOrdenarDesc] = useState(false);
    const [filtroTarefa, setFiltroTarefa] = useState('');

    //useEffect = diz ao React que o componente precisa fazer algo após a renderização (A acao é repetida. O segundo parametro é utilizado para controle)
    useEffect(() => {
        function obterTarefas(){
            const tarefasDb = localStorage['tarefas']; //pegando dados do localStorage
            let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : []; //transformando em objeto
            //filtrar pelo comeco do texto
            //se tarefa.nome existe em filtroTarefa comecando da primeira letra(indexOf === 0)
            listaTarefas = listaTarefas.filter(
                tarefa => tarefa.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
            );
            
            //ordenar itens
            if(ordenarAsc){
                listaTarefas.sort((tarefa1,tarefa2) => (tarefa1.nome.toLowerCase() > tarefa2.nome.toLowerCase() ? 1 : -1));
            }else if(ordenarDesc){
                listaTarefas.sort((tarefa1,tarefa2) => (tarefa1.nome.toLowerCase() < tarefa2.nome.toLowerCase() ? 1 : -1));
            }
            //paginacao
            setTotalItems(listaTarefas.length); //quantidade total de elementos para paginacao
            setTarefas(listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG)); //mostrando somente os itens da pagina atual  ---paginacao---
        }

        //se verdadeiro, obtem a lista de tarefas
        if(carregarTarefas){
            obterTarefas();
            setCarregarTarefas(false);
        }

    }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa]);

    /* 1   //useEffect(() => {
    //Executa após toda a renderização (infinito)
    })

    2. An empty array:
    useEffect(() => {
    //Executa somente uma vez
    }, []);

    3. Props or state values:
    useEffect(() => {
    //Executa na primeira vez
    //e toda vez que o valor da dependencia é atualizado 
    }, [prop, state]); */
    
    function handleMudarPagina(pagina) {
        setPaginaAtual(pagina); //define pagina atual
        setCarregarTarefas(true); //para chamar o obterTarefas novamente
    }

    function handleOrdenar(event){
        event.preventDefault(); //previnir default
        //ordenar Asc
        if(!ordenarAsc && !ordenarDesc){
            setOrdenarAsc(true);
            setOrdenarDesc(false);
        }else if(ordenarAsc){ //ordenar Desc
            setOrdenarAsc(false);
            setOrdenarDesc(true);
        }else{//desabilita ordenacao
            setOrdenarAsc(false);
            setOrdenarDesc(false)
        }
        setCarregarTarefas(true);//recarregar pagina
    }

    function handleFiltrar(event) {
        setFiltroTarefa(event.target.value);
        setCarregarTarefas(true);//recarregar pagina
    }

    return (
        
        <div className="text-center">
            <h3>Tarefas a fazer</h3>
            <Table striped bordered hover responsive data-testid="tabela">
                <thead>
                    <tr>
                        <th>
                        <a href="/" onClick={handleOrdenar}>
                        Tarefa
                        </a>
                        &nbsp;
                        <Ordenacao
                        ordenarAsc={ordenarAsc}
                        ordenarDesc={ordenarDesc}/>
                        </th>
                        <th><A href="/cadastrar" className="btn btn-success btn-sm" data-testid="btn-nova-tarefa">
                            <FontAwesomeIcon icon={faPlus}/>
                            &nbsp;
                            Nova tarefa
                            </A>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Pesquisar
                            <Form.Control 
                            type="text"
                            value={filtroTarefa}
                            onChange={handleFiltrar}
                            data-testid="txt-tarefa"
                            className="filtro-tarefa mt-2"/>                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <ItensListaTarefas tarefas={tarefas} recarregarTarefas={setCarregarTarefas} />{/*enviando propriedades para componente ItensListaTarefas*/}
                </tbody>
            </Table>
            <Paginacao
            totalItems={totalItems}
            itemsPorPagina={ITENS_POR_PAG}
            paginaAtual={paginaAtual}
            mudarPagina={handleMudarPagina}/>
        </div>

    );
}

export default ListarTarefas;

