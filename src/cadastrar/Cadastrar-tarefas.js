import React, {useState} from "react";
import {Button, Form, Jumbotron, Modal, ModalBody} from 'react-bootstrap';
import {navigate, A} from 'hookrouter';
import './Cadastrar-tarefas.css';
import Tarefa from '../models/tarefa.model';

function CadastrarTarefa(){

const [tarefa,setTarefa] = useState('');
const [formValidado,setFormValidado] = useState(false);
const [exibirModal,setExibirModal] = useState(false);

function cadastrar(event){
    event.preventDefault(); //cancelar atualizacao da pagina
    setFormValidado(true); //valida form
    if(event.currentTarget.checkValidity() === true){//se os campos estiverem validados
        //obtem as tarefas
        const tarefasDb = localStorage['tarefas'];// criando a Key no localStorage //localStorage permite somente texto
        const tarefas = tarefasDb ? JSON.parse(tarefasDb) : []; //se tarefasDb existe, transforma em array, senão retorna array vazio
        //persiste a tarefa
        tarefas.push(new Tarefa(new Date().getTime(), tarefa, false)); //adicionando tarefa
        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(true);
    }
};

function handleTxtTarefa(event){
    setTarefa(event.target.value);//pegando o valor do evento
};

function handleFecharModal(){
    navigate('/'); //utilizando o objeto navigate para redirecionar para a pagina
};

    return (
        <div>
            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                    <Modal.Body>Tarefa adicionada com sucesso</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleFecharModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>
            </Modal>
            <h3 className="text-center">Cadastrar</h3>
            <div className="jumbotron">
                <Form
                validated={formValidado}
                noValidate//cancelando validacao do html
                onSubmit={cadastrar}
                >
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Digite a tarefa"
                        minLength="5"
                        maxLength="100"
                        required 
                        value={tarefa} //value adicionado a tarefa em tempo real
                        onChange={handleTxtTarefa}/* lidar com texto da tarefa */
                        data-testid="txt-tarefa" /*para testes, com fireevent*/
                        />
                        {/** */}
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center pt-4">
                        <Button
                        variant="success"
                        type="submit"
                        data-testid="txt-cadastrar" /*para testes, com fireevent*/>
                            Cadastrar
                        </Button>
                        &nbsp;
                        {/*usando A hookrouter */}
                        <A href="/" className="btn btn-light">Voltar</A>
                    </Form.Group>
                </Form>    

            </div>
        </div>
    );
}

export default CadastrarTarefa;
