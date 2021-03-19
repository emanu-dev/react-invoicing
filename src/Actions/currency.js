const update = (symbol) => ({type: 'CURRENCY-UPDATE', symbol: symbol});
const updateConvert = (toConvertCurrency) => ({type: 'CONVERT-CURRENCY-UPDATE', toConvertCurrency: toConvertCurrency});
const setConvert = (currencyConversionMultiplier) => ({type: 'CONVERT-CURRENCY-SET', currencyConversionMultiplier: currencyConversionMultiplier});

const Currency = {
  update,
  updateConvert,
  setConvert,
}

export default Currency;
