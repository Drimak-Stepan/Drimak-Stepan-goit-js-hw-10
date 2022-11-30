import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 3000;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const onSearch = e => {
  const { value } = e.target;

  fetch(
    `https://restcountries.com/v3.1/name/${value}?fields=name.official,capital,population,flags.svg,languages`
  )
    .then(resp => resp.json())
    .then(date => {
      console.log(date);
    });
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
