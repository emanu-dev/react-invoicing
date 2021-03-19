const update = (symbol) => ({type: 'SYMBOL-UPDATE', symbol: symbol});
const updateConvert = (convertSymbol) => ({type: 'CONVERT-UPDATE', convertSymbol: convertSymbol});
const setConvert = (convertValue) => ({type: 'CONVERT-SET-VALUE', convertValue: convertValue});

const Currency = {
  update,
  updateConvert,
  setConvert,
}

export default Currency;
