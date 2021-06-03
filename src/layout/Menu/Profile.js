import React, { useContext, useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import firebase from 'gatsby-plugin-firebase'

import Login from '@components/Modal/Login'
import SignUp from '@components/Modal/SignUp'
import { UserContext } from '@hoc/user'

export default function Profile({open, anchorEl, onClose}) {
  const [loginModal, setLoginModal] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)
  const userContextData = useContext(UserContext);
  const isLoginUser = userContextData.uid;

  const onToogleLogin = (isLogin=false) => {
    if(isLogin) onClose();
    setLoginModal(!loginModal)
  }

  const onLogout = () => {
    firebase.auth().signOut();
    onClose();
  }

  const onToogleSignUp = (closeMenuProfile = false) => {
    if(closeMenuProfile) onClose();
    setSignUpModal(!signUpModal)
  }

  const handleMenuClose = () => {
    onClose()
  }

  const menuId = 'primary-search-account-menu'

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleMenuClose}
      >
        {!isLoginUser && <MenuItem onClick={onToogleLogin}>Авторизация</MenuItem>}
        {!isLoginUser && <MenuItem onClick={onToogleSignUp}>Регистрация</MenuItem>}
        {isLoginUser &&  <MenuItem onClick={onLogout}>Logout</MenuItem>}
      </Menu>
      <Login open={loginModal} onClose={onToogleLogin} />
      {!isLoginUser && <SignUp open={signUpModal} onClose={onToogleSignUp}  />}
    </>
  )
}
