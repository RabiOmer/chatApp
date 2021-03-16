const usersObject = {

}

const getUser = (id) => {

}

const setUser = (name) => {
    if(!name) return false;
    let id = uid();
    usersObject[id] = {
        name,
        chats: []
    }
    return {id,name}
}

const uid = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 15);
}


module.exports = {
    setUser,
    getUser,
}