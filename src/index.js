getItemTemplate = ({ altSpellings, flags }) => `
  <li class="country-list__item">
    <svg class="" width="" height="">
      <use href=${flags.svg}></use>
    </svg>
    <h2>${altSpellings[0]}</h2>
  </li>`;

import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 3000;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

let items = [];

const render = () => {
  const list = items.map(item => getItemTemplate(item));
  console.log(getItemTemplate());
};
const onSearch = e => {
  const { value } = e.target;

  fetch(
    `https://restcountries.com/v3.1/name/${value}?fields=name.official,capital,population,flags,languages`
  )
    .then(resp => resp.json())
    .then(date => {
      items = date;
      render();
    });
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
