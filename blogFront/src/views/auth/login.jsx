import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../context/contextProvider";

export default function login(){

    const UserNameRef = useRef();
    const Passwordref = useRef();
    const [errors,setErrors] = useState(null);
    const {setToken,setUser} = useStateContext();
    const formSubmit = (e)=>{
        e.preventDefault();

        let creadentals = {
            username: UserNameRef.current.value,
            password: Passwordref.current.value
        }

        axiosClient.post('/login', creadentals).then((res) =>{
            console.log(res.data.user);
            setToken(res.data.token)
            setUser(res.data.user)
        }).catch(err=>{

            let response = err.response;
            if (response && response.status === 422) {

                if (response.data.errors) {
                    setErrors(response.data.errors);
                }
                else
                {
                    setErrors({
                        auth : [response.data.message]
                    })
                }


            }

        })

    }

    return (
        <div id="content">

            <div className="login-signup-form animated fadeInUp">

            <form className="form" method="POST" onSubmit={formSubmit}>
            <h1 className="title ">Giriş Yap</h1>
            {

                errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
                <input ref={UserNameRef} className="input" type="text" placeholder="Kullanıcı Adınızı Giriniz" />
                <input ref={Passwordref} className="input" type="password" name="password" placeholder="Parolanızı Giriniz" />
                <input type="submit" className="btn " value="Giriş Yap" />
                <p className="message">
                   Henüz bir hesabın yok mu ? <Link to="/register">Kayıt Ol!</Link>
                </p>
            </form>
            </div>
        </div>
    )
}
