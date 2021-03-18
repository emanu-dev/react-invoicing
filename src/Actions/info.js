const set = (infoObject) => ({type: 'INFO-SET', infoObject: infoObject});
const update = (info, key, value) => ({type: 'INFO-UPDATE', info: info, key: key, value: value});
const reset = () => ({type: 'INFO-RESET'});

const Info = {
    set,
    update,
    reset,
}

export default Info;
