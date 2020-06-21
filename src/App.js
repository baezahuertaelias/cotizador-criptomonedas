import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display:grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;


function App() {

  /* State */
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    /* Previene primera ejecucion */
    if (moneda === '') return;

    const cotizarCriptomoneda = async () => {
      /* Consultar API */
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      /* Mostrar spinner */
      guardarCargando(true);

      /* Guardar cotizacion */
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      
      /* Cambia el estado del cargando (ocultar spinner) */
      guardarCargando(false);
    };

    cotizarCriptomoneda();
  }, [moneda, criptomoneda]); //Va a estar escuchando el cambio en esas dos variables

  /* Mostrar spinner o resultado */
  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>


      <div>
        <Heading>Cotiza criptomoneda al instante</Heading>
        <Formulario
          guardarCriptomoneda={guardarCriptomoneda}
          guardarMoneda={guardarMoneda}
        />

        {componente}
        
      </div>
    </Contenedor>
  );
}

export default App;
