import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
import { useEffect } from "react";
import axiosClient from "../axiosClient";


export default function DefaultLayout(){

    const {user,token,setUser,setToken} = useStateContext()

    if (!token) {
       return <Navigate to="/login" />
       }

    if (user.status == 0) {
        setUser({});
        setToken(null)
        return <Navigate to="/bloked" />
    }


       useEffect(()=>{
        axiosClient.get('/user').then((res)=>{

            setUser(res.data)

        })
       }, [])
       const logout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout').then(()=>{
           setUser({});
           setToken(null)
        })
       }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Anasayfa</Link>
                {

                    user.role != 1 &&
                    <>
                        <Link to="/users">Kullanıcılar</Link>
                      
                    </>

                }
                <Link to="/contents">İçerikler</Link>


            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>{user.name} <Link onClick={logout}>Çıkış Yap</Link></div>

                </header>
                <div className="container">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
