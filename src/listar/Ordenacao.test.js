import React from 'react';
import ReactDOM from 'react-dom';
import Ordenacao from './Ordenacao';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('deve renderizar o componente sem erros', () =>{


    it('deve renderizar o componente sem erros',() => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Ordenacao
            ordenarAsc={false}
            ordenarDesc={false}/>
        ,div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a ordenação padrão',() =>{
         render(
             <Ordenacao ordenarAsc={false} ordenarDesc={false} />
         );
        //o icone faSort não pode ser hidden
        expect(screen.getByTestId('faSort')).not.toHaveClass('hidden');
        expect(screen.getByTestId('faSortUp')).toHaveClass('hidden');
        expect(screen.getByTestId('faSortDown')).toHaveClass('hidden');
        });
    
    it('Deve exibir a ordenação ascendente',() =>{
        render(
            <Ordenacao ordenarAsc={true} ordenarDesc={false} />
        );
        //o icone faSortUp não pode ser hidden
        expect(screen.getByTestId('faSort')).toHaveClass('hidden');
        expect(screen.getByTestId('faSortUp')).not.toHaveClass('hidden');
        expect(screen.getByTestId('faSortDown')).toHaveClass('hidden');
        });

    it('Deve exibir a ordenação descendente',() =>{
        render(
            <Ordenacao ordenarAsc={false} ordenarDesc={true} />
        );
        //o icone faSortDown não pode ser hidden
        expect(screen.getByTestId('faSort')).toHaveClass('hidden');
        expect(screen.getByTestId('faSortUp')).toHaveClass('hidden');
        expect(screen.getByTestId('faSortDown')).not.toHaveClass('hidden');
        });   

});