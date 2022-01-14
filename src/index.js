import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GerenciadorTarefas from './Gerenciador-tarefas';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  //<React.StrictMode>  removido para os links entre paginas funcionarem
  // </React.StrictMode>,
    <GerenciadorTarefas />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
