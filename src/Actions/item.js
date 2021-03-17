const set = (itemList) => ({type: 'SET', itemList: itemList});
const add = () => ({type: 'ADD'});
const remove = (index) => ({type: 'REMOVE', index: index});
const update = (index, key, value) => ({type: 'UPDATE', index: index, key: key, value: value});

const Item = {
    set,
    add,
    remove,
    update,
}

export default Item;