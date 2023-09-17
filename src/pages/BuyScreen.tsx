import React from 'react';
import { useLocation } from 'react-router-dom';
import MontoInput from '../components/molecule/BuyCard';

interface BuyScreenProps { }

const BuyScreen: React.FC<BuyScreenProps> = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const coin = params.get('coin');
  console.log(coin)
  console.log(params)
  console.log(location)




  return (
    <div>
      <h1>Mi Componente</h1>
      <p>El valor del parámetro 'coin' es: {coin}</p>
      <MontoInput />
    </div>
  );
}

export default BuyScreen;