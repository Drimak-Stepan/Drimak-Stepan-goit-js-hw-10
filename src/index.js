import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 3000;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const onSearch = e => {
  const { value } = e.target;
  if (!value) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    return;
  }
  fetchCountries(value.trim()).then(render).catch(onFetchError);
};

const render = countries => {
  let markup = '';

  if (countries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      { clickToClose: true }
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    markup = countries
      .map(({ name, flags }) => {
        return `<li class="country-list__item">
        <img src="${flags.svg}" alt="${name.official}" width="50"/>
        ${name.official}</li>`;
      })
      .join('');

    refs.info.innerHTML = '';
  } else {
    markup = countries
      .map(({ name, flags, capital, population, languages }) => {
        return `<img src="${flags.svg}" alt="${name.official}" width="200"/>
          <h2>${name.official}</h2>
        <ul>
          <li class="country-info__item">Capital:   ${capital}</li>
          <li class="country-info__item">Population:   ${population}</li>
          <li class="country-info__item">Languages:   ${Object.values(
            languages
          )}</</li>
        </ul>`;
      })
      .join('');
    refs.list.innerHTML = '';
    return (refs.info.innerHTML = markup);
  }
  refs.list.innerHTML = markup;
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    clickToClose: true,
  });
}
