import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

function RemoverTarefa(props) {

    const [exibirModal,setExibirModal] = useState(false);

    function handleAbrirModal(event) {
        event.preventDefault();// para não recarregar a pagina
        setExibirModal(true);
    }

    function handleFecharModal() {
        setExibirModal(false);
    }

    function handleRemoverTarefa(event){
        event.preventDefault();
        const tarefasDb = localStorage['tarefas'];
        let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
        //todas as tarefas, menos a que deve ser removida (props.tarefa.id atual)
        tarefas = tarefas.filter(tarefa => tarefa.id !== props.tarefa.id);
        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(false);
        props.recarregarTarefas(true); //recarregar pagina
    }

    return(
        <span>
            <Button variant="danger" 
            className="btn" 
            onClick={handleAbrirModal}
            data-testid="btn-abrir-modal">
            <FontAwesomeIcon icon={faTrashAlt}/>
            </Button>
            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Remover tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover a seguinte tarefa?
                    <br/>
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleRemoverTarefa}
                    data-testid="btn-remover">
                        Sim
                    </Button>
                    &nbsp;
                    <Button variant="light" onClick={handleFecharModal}>
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
    
}

RemoverTarefa.propTypes = {
    tarefa: PropTypes.object.isRequired,//tarefa deve ser do tipo objeto
    recarregarTarefas: PropTypes.func.isRequired //recarregarTarefas deve ser uma funcao
}

export default RemoverTarefa;