const set = (itemList) => ({type: 'SET', itemList: itemList});
const add = () => ({type: 'ADD'});
const remove = (index) => ({type: 'REMOVE', index: index});
const update = (index, key, value) => ({type: 'UPDATE', index: index, key: key, value: value});
const reset = () => ({type: 'RESET'})

const Item = {
    set,
    add,
    remove,
    update,
    reset,
}

export default Item;