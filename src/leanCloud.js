import AV from 'leancloud-storage'

var APP_ID = 'rhvkjdBnzmW83KQ8WrocTx1R-gzGzoHsz'
var APP_KEY = '5FiK6qxiGE98uNQifD0MygKm'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

    // 所有跟 Todo 相关的 LeanCloud 操作都放到这里
    export const TodoModel = {
        getByUser(user, successFn, errorFn){
            // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
            let query = new AV.Query('Todo')
            query.equalTo('deleted', false);
            query.find().then((response) => {
              let array = response.map((t) => {
                return {id: t.id, ...t.attributes}
              })
              successFn.call(null, array)
            }, (error) => {
              errorFn && errorFn.call(null, error)
            })
          },
        create({status, title, deleted}, successFn, errorFn){
            let Todo = AV.Object.extend('Todo')
            let todo = new Todo()
            todo.set('title', title)
            todo.set('status', status)
            todo.set('deleted', deleted)

            // 根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
            // 这样做就可以让这个 Todo 只被当前用户看到
            let acl = new AV.ACL()
            acl.setPublicReadAccess(false) // 注意这里是 false
            acl.setWriteAccess(AV.User.current(), true)
            acl.setReadAccess(AV.User.current(), true)

            todo.setACL(acl);
            todo.save().then(function (response) {  
            successFn.call(null, response.id)
            }, function (error) {
            errorFn && errorFn.call(null, error)
            });

        },

        update({id, title, status, deleted}, successFn, errorFn){
            // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
            let todo = AV.Object.createWithoutData('Todo', id)
            title !== undefined && todo.set('title', title)
            status !== undefined && todo.set('status', status)
            deleted !== undefined && todo.set('deleted', deleted)
            todo.save().then((response) => {
            successFn && successFn.call(null)
            }, (error) => errorFn && errorFn.call(null, error))
        },
         destroy(todoId, successFn, errorFn){
             // 我们不应该删除数据，而是将数据标记为 deleted
             TodoModel.update({id: todoId, deleted: true}, successFn, errorFn)
        }
    }

    export function signUp (email, username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
   var user = new AV.User()
   // 设置用户名
   user.setUsername(username)
   // 设置密码
   user.setPassword(password)
   // 设置邮箱
   user.setEmail(email)

   user.signUp().then(function (loginedUser) {
     let user = getUserFromAVUser(loginedUser)
     successFn.call(null, user)
   }, function (error) {
     errorFn.call(null, error)
   })

  return undefined

  }
  
  export function signIn (username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function (loginedUser) {
      let user = getUserFromAVUser(loginedUser)
      successFn.call(null, user)
    }, function (error) {
      errorFn.call(null, error)
    })
  }

  export function getCurrentUser () {
    let user = AV.User.current()
    if (user) {
      return getUserFromAVUser(user)
    } else {
      return null
    }
  }
  export function signOut () {
    AV.User.logOut()
    return undefined
  }
  
  export function sendPasswordResetEmail (email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call()
    }, function (error) {
     errorFn.call(null, error)
    })
  }

  function getUserFromAVUser (AVUser) {
   return {
     id: AVUser.id,
     ...AVUser.attributes
    }
}