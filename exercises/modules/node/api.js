let { posts, users } = require('./data')

getUserById = (id, cb) => {
    // simulate API call
    setTimeout(() => {
        const _user = users.find(user => user.id === id)
        cb(_user)
    }, 150)
}

getPostsForUser = (userId, cb) => {
    // simulate API call
    setTimeout(() => {
        const _posts = posts.filter(post => post.createdBy === userId)
        cb(_posts)
    }, 150)
}

module.exports = {
    getUserById,
    getPostsForUser
}