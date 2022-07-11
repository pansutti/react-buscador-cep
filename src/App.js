import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch(){
    
    if(input === ''){
      alert('Preencha algum CEP!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('');


    }catch{
      alert('Erro ao buscar o CEP desejado')
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP"
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="white" />
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
      )}
      
      <footer className="footer">
          <p>Feito por <a className="footerlink" target="_blank" rel='noreferrer' href="https://www.linkedin.com/in/luiz1gustavo2pansutti3torres/">Luiz Gustavo Pansutti Torres</a></p>
      </footer>
    </div>
  );
}


export default App;
