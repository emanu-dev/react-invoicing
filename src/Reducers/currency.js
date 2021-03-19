const defaultCurrency = {
  symbol: '$',
  toConvertCurrency: '',
  currencyConversionMultiplier: '1',
  availableCurrency: [
    {
      name: 'US Dollar ($)',
      symbol: '$',
      code: 'USD'
    },
    {
      name: 'British Pound (£)',
      symbol: '£',
      code: 'GBP'
    },
    {
      name: 'Canadian Dollar ($)',
      symbol: 'CAD $ ',
      code: 'CAD'
    },
    {
      name: 'Euro (€)',
      symbol: '€',
      code: 'EUR'
    },
    {
      name: 'Indian Rupee (₹)',
      symbol: '₹',
      code: 'INR'
    },
    {
      name: 'Norwegian krone (kr)',
      symbol: 'kr ',
      code: 'NOK'
    }
  ]
};

const currencyReducer = (state = defaultCurrency, action) => {
  switch (action.type){
    case 'CURRENCY-UPDATE':
      return {
        ...state,
        symbol: action.symbol
      }
    case 'CONVERT-CURRENCY-UPDATE':
      return {
        ...state,
        toConvertCurrency: action.toConvertCurrency
      }
    case 'CONVERT-CURRENCY-SET':
      return {
        ...state,
        currencyConversionMultiplier: action.currencyConversionMultiplier
      }            
    default: 
      return state;
  }
}

export default currencyReducer;
