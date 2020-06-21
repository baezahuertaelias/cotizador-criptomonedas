import React from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = () => {

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar estadounidense'},
        {codigo: 'CLP', nombre: 'Peso chileno'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra esterlina'} 
    ];

    /* utilizar useMoneda */
    /* No importa el nombre de la variable, pero si importa el orden en que se crean las variables */
    /* Le estoy pasando los siguientes datos, el titulo, la moneda elegida y un arreglo con datos de monedas y su nombre */
    const [moneda, SelectMoneda] = useMoneda('Elije tu moneda', '', MONEDAS);

    return ( 
        <form>

            <SelectMoneda/>
            <Boton
                type="submit"
                value="Calcular"
            />

        </form>
     );
}
 
export default Formulario;