import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;

    span{
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;

    span{
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado);
    return ( 
        <ResultadoDiv>
            <Precio>Precio actual: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio mas alto: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio mas bajo: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion 24h: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
};

Cotizacion.propTypes = {
    resultado : PropTypes.object.isRequired
}
 
export default Cotizacion;