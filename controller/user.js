 const User = require('../model/user');
 const { getParams }  = require('../utils/utils');
 const bcrypt = require('bcrypt');
//  const async = require('async');

 const signUp = function(req, res){
     const { username, password } = req.body;
     User.findOne({username})
         .then( (user) => {
            if(user){
                res.json(getParams({
                    success: false
                }))
            } else {
                bcrypt.hash(password,10)
                      .then((password) => {
                          const willSaveUser = new User({
                              username,
                              password
                          })
                          willSaveUser.save().then(() => {
                              res.json(getParams({ success: true }))
                          })
                      })
            } 
         })
 }

 const signIn = function(req, res) {
    const { username, password} = req.body;
    User.findOne({ username })
        .then( (user) => {
            if(!user){
                res.json(getParams({
                    login: false
                }))
            }else{
                res.json(getParams({
                    login: true,
                    username: username
                }))
            }
        })
 }

 const isLogin = function(req,res){
    res.json(getParam({
        login: req.session.username ? true : false,
        username: req.session.username
    }))
}
const logout = function(req,res){
    req.session = null;
    res.json(getParam({
        logout : true
    }))
}

 module.exports = { signUp, signIn, isLogin, logout }