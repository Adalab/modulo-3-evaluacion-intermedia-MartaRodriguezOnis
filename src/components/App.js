import { useState, useEffect } from 'react';
import '../styles/App.scss';
// import phrasesData from '../data/phrases.json';
import callToApi from '../services/api';
import logo from '../images/logofriends.jpg';

function App() {
  // VARIABLES DE ESTADO
  const [phrases, setPhrases] = useState([]);
  const [newPhrase, setNewPhrase] = useState({
    quote: '',
    character: '',
  });
  const [filterPhrase, setFilterPhrase] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('Todos');

  // useEffect
  useEffect(() => {
    callToApi().then((data) => {
      setPhrases(data);
    });
  }, []);

  // PINTAR FRASES MÁS FILTROS
  const renderPhrases = phrases
    .filter((eachPhrase) => {
      return eachPhrase.quote
        .toLowerCase()
        .includes(filterPhrase.toLowerCase());
    })
    .filter((eachPhrase) => {
      if (filterCharacter === 'Todos') {
        return true;
      } else if (filterCharacter === eachPhrase.character) {
        return true;
      }
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
  };

  const handleAddNewPhrase = (ev) => {
    ev.preventDefault();
    if (newPhrase.quote === '' || newPhrase.character === '') {
      alert('Tienes que rellenar los campos FRASE y PERSONAJE');
      return false;
    } else {
      setPhrases([...phrases, newPhrase]);
      setNewPhrase({
        quote: '',
        character: '',
      });
      setFilterPhrase('');
      setFilterCharacter('Todos');
    }
  };

  // FILTRAR POR FRASE
  const handleFilterPhrase = (ev) => {
    setFilterPhrase(ev.currentTarget.value);
  };

  // FILTRAR POR PERSONAJE
  const handleFilterCharacter = (ev) => {
    setFilterCharacter(ev.currentTarget.value);
    console.log(ev.currentTarget.value);
  };

  return (
    <div>
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>
        <img src={logo} alt="logo serie FRiends" className="logo" />

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
          <label className="form-filter__label" htmlFor="character">
            Filtrar por personaje
          </label>
          <select
            className="form-filter__select"
            name="character"
            id="character"
            value={filterCharacter}
            onChange={handleFilterCharacter}
            required
          >
            <option value="Todos">Todos</option>
            <option value="Chandler">Chandler</option>
            <option value="Joey">Joey</option>
            <option value="Monica">Monica</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Rachel">Rachel</option>
            <option value="Ross">Ross</option>
          </select>
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
