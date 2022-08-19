import { useState, useEffect } from 'react';
import '../styles/App.scss';
import phrasesData from '../data/phrases.json';

function App() {
  // VARIABLES DE ESTADO
  const [phrases, setPhrases] = useState(phrasesData);
  const [newPhrase, setNewPhrase] = useState({
    quote: '',
    character: '',
  });
  const [filterPhrase, setFilterPhrase] = useState('');

  // PINTAR FRASES MÁS FILTROS
  const renderPhrases = phrases
    .filter((eachPhrase) => {
      return eachPhrase.quote
        .toLowerCase()
        .includes(filterPhrase.toLowerCase());
    })
    .map((eachPhrase, index) => {
      return (
        <li className="phrases-list__li" key={index}>
          <p>
            {eachPhrase.quote} --
            <span className="phraseCharacter"> {eachPhrase.character}</span>
          </p>
        </li>
      );
    });

  //AÑADIR NUEVA FRASE
  const handleInputNewPhrase = (ev) => {
    setNewPhrase({
      ...newPhrase,
      [ev.currentTarget.id]: ev.currentTarget.value,
    });
    console.log(ev.currentTarget.id);
  };

  const handleAddNewPhrase = (ev) => {
    ev.preventDefault();
    setPhrases([...phrases, newPhrase]);
    setNewPhrase({
      quote: '',
      character: '',
    });
  };

  // FILTRAR POR FRASE
  const handleFilterPhrase = (ev) => {
    setFilterPhrase(ev.currentTarget.value);
    console.log(ev.currentTarget.value);
    console.log(filterPhrase);
  };

  // FILTRAR POR PERSONAJE

  return (
    <div>
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>
        <form className="form-filter">
          <label className="form-filter__label" htmlFor="quote">
            Filtrar por frase
          </label>
          <input
            className="form-filter__input"
            type="text"
            name="quote"
            id="quote"
            value={filterPhrase}
            onChange={handleFilterPhrase}
          ></input>
        </form>
      </header>
      <main>
        <ul className="phrases-list">{renderPhrases}</ul>
        <h2 className="newPhrase__title">Añadir una frase nueva</h2>
        <form className="form-newPhrase">
          <label className="form-newPhrase__label" htmlFor="quote">
            Frase
          </label>
          <input
            className="form-newPhrase__input"
            type="text"
            name="quote"
            id="quote"
            value={newPhrase.quote}
            onChange={handleInputNewPhrase}
          ></input>
          <label className="form-newPhrase__label" htmlFor="character">
            Personaje
          </label>
          <input
            className="form-newPhrase__input"
            type="text"
            name="character"
            id="character"
            value={newPhrase.character}
            onChange={handleInputNewPhrase}
          ></input>
          <button className="form-newPhrase__btn" onClick={handleAddNewPhrase}>
            Añadir una nueva frase
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
