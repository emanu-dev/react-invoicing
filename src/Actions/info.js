const set = (infoObject) => ({type: 'INFO-SET', infoObject: infoObject});
const update = (info, key, value) => ({type: 'INFO-UPDATE', info: info, key: key, value: value});

const Info = {
    set,
    update,
}

export default Info;