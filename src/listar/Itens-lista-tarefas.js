import React from "react";
import PropTypes from 'prop-types';// proptypes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {A} from 'hookrouter'; 
import ConcluirTarefa from "./Concluir-tarefa";
import RemoverTarefa from './Remover-tarefa';

//props parametros recebidos pelo componente(via Listar-tarefas.js)
function ItensListaTarefas(props){

    function marcarConcluida(tarefa){
        return tarefa.concluida ? 'line-through' : 'none';
    }
    
    return (
    //iterar sobre o array com map //React deve utilizar key
    //retornando cada valor individual do map
    props.tarefas.map(tarefa => 
        <tr key={tarefa.id} data-testid="tarefa">
            <td width="75%" data-testid="nome-tarefa" style={{textDecoration: marcarConcluida(tarefa)}}>{/*se tarefa concluida - o line-through é aplicado */}
                {tarefa.nome}
            </td>
            <td className="text-right">
                {/*passando props para Concluir-tarefa */}
                {/*se tarefa concluida, hidden é passado e botões somem*/}
                <ConcluirTarefa
                tarefa={tarefa}
                recarregarTarefas={props.recarregarTarefas}
                className={tarefa.concluida ? 'hidden': null} />
                &nbsp;
                <A href={"/atualizar/"+tarefa.id} 
                className={tarefa.concluida ? 'hidden' : 'btn btn-warning'}>{/*se tarefa concluida, o botão some*/}
                    <FontAwesomeIcon icon={faEdit}/>
                </A>
                &nbsp;
                <RemoverTarefa
                tarefa={tarefa}
                recarregarTarefas={props.recarregarTarefas}/>
            </td>
        </tr>
        )
    );
}

//validando as propriedades com propTypes
ItensListaTarefas.propTypes = {
    tarefas: PropTypes.array.isRequired,//recebe tarefas que deve ser um array
    recarregarTarefas: PropTypes.func.isRequired //recebe recarregarTarefas que deve ser uma funcao

};

export default ItensListaTarefas;