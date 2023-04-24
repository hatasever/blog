import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../context/contextProvider";

export default function register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors,setErrors] = useState(null);
    const {setUser,setToken} = useStateContext();
    const formSubmit = (e)=>{
        e.preventDefault();
        const payload = {
            name:nameRef.current.value,
            email:emailRef.current.value,
            username:usernameRef.current.value,
            password:passwordRef.current.value,
            password_confirmation:passwordConfirmationRef.current.value,
        }

        axiosClient.post('/register', payload).then((res)=>{

            console.log(res);

            setToken(res.token)
            setUser(res.user)

        }).catch(error => {
            const err = error.response;

            if (err && err.status === 422) {
                setErrors(err.data.errors)
            }
        })
    }
    return (
        <div id="content">

        <div className="login-signup-form animated fadeInDown">

        <form className="form" method="POST" onSubmit={formSubmit}>
        <h1 className="title ">Kayıt Ol</h1>
        {

            errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            <input ref={nameRef} className="input" type="text"  placeholder=" Adınız ve Soyadınız" />
            <input ref={emailRef} className="input" type="text" placeholder=" E-posta adresiniz" />
            <input ref={usernameRef} className="input" type="text" placeholder="Kullanıcı adınız" />
            <input ref={passwordRef} className="input" type="password"  placeholder=" Parolanız" />
            <input ref={passwordConfirmationRef} className="input" type="password" placeholder="Parolanızı tekrar giriniz" />
            <input type="submit" className="btn " value="Kayıt Ol" />
            <p className="message">
               Bir hazabınız varsa <Link to="/login"> Giriş Yapın</Link>
            </p>
        </form>
        </div>
    </div>
    )
}
