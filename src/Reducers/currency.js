const defaultCurrency = {
  symbol: '$',
  convertSymbol: '',
  convertValue: '1',
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
    case 'SYMBOL-UPDATE':
      return {
        ...state,
        symbol: action.symbol
      }
    case 'CONVERT-UPDATE':
      return {
        ...state,
        convertSymbol: action.convertSymbol
      }
    case 'CONVERT-SET-VALUE':
      return {
        ...state,
        convertValue: action.convertValue
      }            
    default: 
      return state;
  }
}

export default currencyReducer;
