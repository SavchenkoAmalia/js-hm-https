import '../css/style.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { alert, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputEl = document.getElementById('search-box');
const listEl = document.getElementById('country-list');
const infoEl = document.getElementById('country-info');

inputEl.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const query = e.target.value.trim();

  if (!query) {
    clearResults();
    return;
  }

  fetchCountries(query)
    .then(countries => {
      clearResults();
      if (countries.length > 10) {
        notice({
          text: 'Too many matches found. Please enter a more specific name.',
        });
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
      } else if (countries.length === 1) {
        renderCountryInfo(countries[0]);
      }
    })
    .catch(() => {
      clearResults();
      alert({ text: 'No country found with that name.' });
    });
}

function renderCountryList(countries) {
  const markup = countries
    .map(
      country =>
        `<li><img src="${country.flags.svg}" alt="Flag" width="30" /> ${country.name}</li>`
    )
    .join('');
  listEl.innerHTML = `<ul>${markup}</ul>`;
}

function renderCountryInfo(country) {
  const languages = country.languages.map(lang => lang.name).join(', ');
  infoEl.innerHTML = `
    <h2>${country.name}</h2>
    <img src="${country.flags.svg}" alt="Flag" />
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population}</p>
    <p><strong>Languages:</strong> ${languages}</p>
  `;
}

function clearResults() {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
}
