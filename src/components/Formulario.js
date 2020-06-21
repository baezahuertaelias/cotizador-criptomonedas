import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import PropTypes from 'prop-types';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

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

const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {

    /* State del listado de criptomonedas */
    const [listacripto, guardarCriptomonedas] = useState([]);
    
    /* Flag para manejar errores */
    const [error, guardarError] = useState(false);

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

    /* utilizar useCriptomoneda */
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elije tu criptomoneda', '', listacripto);

    /* ejecutar llamado a la API */
    useEffect(()=> {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        };

        consultarAPI();
    }, []);

    /* Cuando el user da submit */
    const cotizarMoneda =e => {
        e.preventDefault();

        /* Validar campos con datos */
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        /* Pasar datos al componente principal */
        guardarError(false);

        guardarCriptomoneda(criptomoneda);
        guardarMoneda(moneda);

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMoneda/>
            <SelectCripto/>
            <Boton
                type="submit"
                value="Calcular"
            />

        </form>
     );
};

Formulario.propTypes = {
    guardarCriptomoneda : PropTypes.string.isRequired,
    guardarMoneda : PropTypes.string.isRequired
}
 
export default Formulario;