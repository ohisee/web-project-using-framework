// USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries:

const axios = require('axios');

const getExchangeRate = (from, to) => {
  console.log(`http://api.fixer.io/latest?base=${from}`);
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    return response.data.rates[to];
  }).catch((error) => {
    return error;
  });
};

const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then((response) => {
      return response.data.map((country) => {
        return country.name;
      });
  }).catch((error) => {
    return error;
  });
};

/* jshint ignore:start */
const getExchangeRateAlt = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];
    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (error) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
};

const getCountriesAlt = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => {
      return country.name;
    });
  } catch (error) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};
/* jshint ignore:end */

const convertCurrency = (from, to, amount) => {
  return getCountries(to).then((countries) => {
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}`;
  });
};

/* jshint ignore:start */
const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountriesAlt(to);
  const rate = await getExchangeRateAlt(from, to);
  const exchangedAmount = amount * rate;
  const c = (countries.length > 1) ? 'countries' : 'country';
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following ${c}: ${countries.join(', ')}`;
};
/* jshint ignore:end */

// getExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// });
//
// getCountries('USD').then((countries) => {
//   console.log(countries);
// });

convertCurrency('CAD', 'USD', 1000).then((status) => {
  console.log(status);
});

convertCurrencyAlt('USD', 'USD', 1000).then((status) => {
  console.log(status);
}).catch((error) => {
  console.log(error.message);
});
