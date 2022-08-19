import { useState, useEffect } from 'react';
import '../styles/App.scss';
import phrasesData from '../data/phrases.json';

function App() {
  const [phrases, setPhrases] = useState(phrasesData);

  const renderPhrases = phrases.map((eachPhrase, index) => {
    return (
      <li className="phrases-list__li" key={index}>
        <p>
          {eachPhrase.quote} --
          <span className="phraseCharacter"> {eachPhrase.character}</span>
        </p>
      </li>
    );
  });

  return (
    <div>
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>
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
            value=""
            onChange=""
          ></input>
          <label className="form-newPhrase__label" htmlFor="character">
            Personaje
          </label>
          <input
            className="form-newPhrase__input"
            type="text"
            name="character"
            id="character"
            value=""
            onChange=""
          ></input>
          <button className="form-newPhrase__btn" onClick="">
            Añadir una nueva frase
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
