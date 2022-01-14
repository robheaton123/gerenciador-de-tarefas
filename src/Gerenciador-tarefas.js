import logo from './logo.svg';
import './Gerenciador-tarefas.css';
import { useRoutes } from 'hookrouter';//trabalhar com rotas
import ListarTarefas from './listar/Listar-tarefas';
import CadastrarTarefa from './cadastrar/Cadastrar-tarefas';
import AtualizarTarefa from './atualizar/Atualizar-tarefa';

/*caso haja erro "BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default." ao utilizar as rotas:
webpack.config.js --- incluir ---> 

resolve: 
  fallback: {
    "url": false 
  },

*/

//atualizar + prop (propTypes), prop id é obrigatorio na pagina atualizar
const routes = {
  '/': () => <ListarTarefas />,
  '/cadastrar': () => <CadastrarTarefa/>,
  '/atualizar/:id': ({id}) => <AtualizarTarefa id={id}/>
};

function GerenciadorTarefas() {
  return useRoutes(routes); //utilizando as rotas
}

export default GerenciadorTarefas;
