import { useContext, useEffect, useState } from 'react'
import LoginForm from '../../features/loginForm/ui'
import OutsiderLogin from '../../features/outsiderLogin/ui'

import styles from './style.module.css'
import { IUserTokenContext, UserTokenContext } from '../../App'

interface IUser {
  picture: string
  email: string
}

const LoginPage = () => {
  const { token } = useContext<IUserTokenContext>(UserTokenContext)
  const [user, setUser] = useState<IUser | null>(null)

  async function getUser() {
    const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      method: "GET",
      headers: {
        "AUTHORIZATION": `Bearer ${token}`
      }
    })

    const result = await res.json()

    setUser(result)
  }

  console.log(user);

  useEffect(() => {
    if(token) {
      getUser()
    }
  }, [token])

  return (
    <div className={styles.login}>
      <div className={styles.loginLeft}>
        <img src={user ? user.picture : "https://static.vecteezy.com/system/resources/previews/030/985/874/non_2x/anonymous-icon-vector.jpg"} alt="Login Image" />
        <h1 className={styles.userName}>{user ? user.email : "You are not authorization!" }</h1>
      </div>
      <div className={styles.loginRight}>
        <OutsiderLogin buttonText={"Login with Google"} imageUrl={"./google-logo.png"} />
        <h5 className={styles.loginRightTitle}>Page for  <span className={styles.loginRightTitleMark}>Login </span></h5>
        <span className={styles.separator}>OR</span>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage