import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboardCheck} from '@fortawesome/free-solid-svg-icons';

function ConcluirTarefa(props) {

    const [exibirModal,setExibirModal] = useState(false);

    function handleAbrirModal(event){
        event.preventDefault();//previne o default
        setExibirModal(true);
    }

    function handleFecharModal() {
        setExibirModal(false);
    }

    function handleConcluirTarefa(event) {
        event.preventDefault();
        const tarefasDb = localStorage['tarefas'];//carregado dados do banco //formato string
        let tarefas = tarefasDb ? JSON.parse(tarefasDb) : []; //se existe transforma em objeto, senão array vazio
        tarefas = tarefas.map(tarefa => {
            //se a tarefa do banco for igual a tarefa individual(props do Itens-lista-tarefas) que está sendo editada, recebe true
            if(tarefa.id === props.tarefa.id){
                tarefa.concluida = true;
            }
            return tarefa;
        });
        //salvando novamente no local storage como string
        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(false);//fechar modal
        props.recarregarTarefas(true);//recarregar pagina
    }

    return (
        //span para nao quebrar linha //className para exibir ou não os botões
        <span className={props.className}>
            <Button onClick={handleAbrirModal}
            data-testid="btn-abrir-modal">
                <FontAwesomeIcon icon={faClipboardCheck}/>
            </Button>
            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Concluir tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente concluir a seguinte tarefa?
                    <br/>
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConcluirTarefa}
                    data-testid="btn-concluir">
                        Sim
                    </Button>
                    <Button variant="light" onClick={handleFecharModal}
                    data-testid="btn-fechar-modal">
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
}

//verificando propriedades
ConcluirTarefa.propTypes = {
    tarefa: PropTypes.object.isRequired,//recebendo tarefa individual
    recarregarTarefas: PropTypes.func.isRequired,
    className: PropTypes.string

}

export default ConcluirTarefa;