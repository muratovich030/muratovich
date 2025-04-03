import { useGoogleLogin } from '@react-oauth/google'
import styles from './styles.module.css'
import { useContext } from 'react'
import { IUserTokenContext, UserTokenContext } from '../../App'

interface IOutsiderLogin {
        imageUrl: string
        buttonText: string
}

const OutsiderLogin = (props: IOutsiderLogin) => {
        const { setToken } = useContext<IUserTokenContext>(UserTokenContext)

        const login = useGoogleLogin({
                onSuccess: (result) => { setToken(result.access_token) },
                onError: () => alert("You are not authorization!")
        })

        return (
                <button onClick={() => login()} className={styles.outsiderLoginButton}>
                        <img src={props.imageUrl} alt="" />
                        {props.buttonText}
                </button>
        )
}

export default OutsiderLogin