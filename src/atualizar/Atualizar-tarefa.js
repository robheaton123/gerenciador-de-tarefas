import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {Button, Form, Modal} from 'react-bootstrap';
import {navigate, A} from 'hookrouter';

function AtualizarTarefa(props){

const [exibirModal, setExibirModal] = useState(false);
const [formValidado, setFormValidado] = useState(false);
const [tarefa, setTarefa] = useState('');
const [carregarTarefa, setCarregarTarefa] = useState(true);


useEffect(() => {
    //se carregarTarefa for true, a atualizacao é feita na pagina
    if(carregarTarefa){
    const tarefasDb = localStorage['tarefas'];
    const tarefas = tarefasDb ? JSON.parse(tarefasDb): [];
    //comaparacao entre tar.id do localStorage e props.id ('/atualizar/:id': ({id}) => <AtualizarTarefa id={id}/> do arquivo Gerenciador-tarefas.js)
    //[0] para retornar {} (sem array)
    const tarefa = tarefas.filter(
        tar => tar.id === parseInt(props.id)
    )[0];

    setTarefa(tarefa.nome);
    setCarregarTarefa(false);//desabilitando atualizacao
    }

    
}, [carregarTarefa, props.id])


//evitando acao padrão e voltando para pagina incial
function voltar(event){
    event.preventDefault();
    navigate("/");
}
//ir para pagina inicial
function handleFecharModal(event){
    navigate("/");
}

function atualizar(event){
    event.preventDefault();//evitando o submit default
    setFormValidado(true);//validando formulario
    //se o formulario for valido
    if(event.currentTarget.checkValidity() === true){
        //obtem as tarefas
        const tarefasDb = localStorage['tarefas'];
        let tarefas = tarefasDb ? JSON.parse(tarefasDb): [];
        //persistir tarefa atualizada
        //se o id (localStorage) for igual a props.id
        tarefas = tarefas.map(tar => {
            if(tar.id === parseInt(props.id)){
                tar.nome = tarefa;
            }
            return tar;
        });
        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(true);
    }
}
//pegando o objeto e passando o value= para tarefa
function handleTxtTarefa(event){
    setTarefa(event.target.value);
}

    return (
        <div className="jumbotron">
            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tarefa atualizada com sucesso!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleFecharModal}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
            <h3 className="text-center">Atualizar</h3>
            <div>
                {/*retirando validacao do html */}
                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Digite a tarefa"
                        minLength="5"
                        maxLength="100"
                        required
                        data-testid="txt-tarefa"
                        value={tarefa}
                        onChange={handleTxtTarefa}/>
                        {/*mensagem de erro se o form.control for invalido*/}
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center pt-4">
                        <Button variant="success" type="submit" data-testid="btn-atualizar">
                            Atualizar
                        </Button>
                        <span className="px-2"></span>
                        <A href="/" className="btn btn-light" onClick={voltar}>
                            Voltar
                        </A>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

//recebendo id via url
AtualizarTarefa.propTypes = {
    id: PropTypes.number.isRequired
}

export default AtualizarTarefa;