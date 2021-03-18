const defaultCurrency = {
  symbol: '$',
  toConvertCurrency: '$',
  availableCurrency: [
    {
      name: 'US Dollar ($)',
      symbol: '$'
    },
    {
      name: 'British Pound (£)',
      symbol: '£'
    },
    {
      name: 'Canadian Dollar ($)',
      symbol: 'CAD $ '
    },
    {
      name: 'Euro (€)',
      symbol: '€'
    },
    {
      name: 'Indian Rupee (₹)',
      symbol: '₹'
    },
    {
      name: 'Norwegian krone (kr)',
      symbol: 'kr '
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
    default: 
      return state;
  }
}

export default currencyReducer;
