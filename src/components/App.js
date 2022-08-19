import { useState, useEffect } from 'react';
import '../styles/App.scss';
import phrasesData from '../data/phrases.json';

function App() {
  const [phrases, setPhrases] = useState(phrasesData);

  const renderPhrases = phrases.map((eachPhrase, index) => {
    return (
      <li
        className="phrases-list__li"
        key={index}
      >{`${eachPhrase.quote} -- ${eachPhrase.character}`}</li>
    );
  });

  return (
    <div>
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>
      </header>
      <main>
        <ul className="phrases-list">{renderPhrases}</ul>
      </main>
    </div>
  );
}

export default App;
