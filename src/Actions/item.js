const add = () => ({type: 'ITEM-ADD'});
const remove = (index) => ({type: 'ITEM-REMOVE', index: index});
const update = (index, key, value) => ({type: 'ITEM-UPDATE', index: index, key: key, value: value});

const Item = {
    add,
    remove,
    update,
}

export default Item;