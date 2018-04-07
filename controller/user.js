 const User = require('../model/user');
 const { getParams }  = require('../utils/utils');
 const bcrypt = require('bcrypt');
 const async = require('async');

 const signUp = function(req, res){
     const { username, password } = req.body;
     User.find({username})
         .then( (user) => {
            if(user.length == 0){
                bcrypt.hash(password,10)
                      .then((pwd) => {
                          console.log(pwd)
                          const willSaveUser = new User({
                              username,
                              password: pwd
                          })
                          willSaveUser.save().then(() => {
                              res.json(getParams({ success: true }))
                          })
                      })
            } else {
                res.json(getParams({
                    success: false
                }))
            } 
         })
 }

 const signIn = function(req, res) {
    const { username, password} = req.body;
    User.findOne({ username })
        .then( (user) => {
            if(!user){
                res.json(getParams({
                    login: 1    // 无用户名
                }))
            }else{
                bcrypt.compare( password, user.password)  //直接把用户输入的密码和库里拿出来hash过的比较
                      .then( (result) => {
                          if(result) {
                              res.json(getParams({
                                  login: 0  //成功
                              }))
                          }else{
                              res.json(getParams({
                                  login: 2   //密码错误
                              }))
                          }
                      })
                
            }
        })
 }

 const isLogin = function(req,res){
    res.json(getParams({
        login: req.session.username ? true : false,
        username: req.session.username
    }))
}
const logout = function(req,res){
    req.session = null;
    res.json(getParams({
        logout : true
    }))
}

 module.exports = { signUp, signIn, isLogin, logout }