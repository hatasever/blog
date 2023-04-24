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
        <div className="container-fluid" id="defaultLayout" style={{position:"fixed"}}>

            <aside>
            <div style={{height:'80px', minHeight:'80px', marginBottom:"20px"}}>

            </div>

                <Link to="/dashboard">Anasayfa</Link>
                {

                    user.role != 1 &&
                    <>
                        <Link to="/users">Kullanıcılar</Link>
                    </>

                }
                <Link to="/contents">İçeriklerim</Link>


            </aside>
            <div className="content">
                <header>
                    <div style={{minWidth:'50px'}}>

                    </div>
                    <div style={{marginRight:'1px'}}>{user.name} <Link onClick={logout}>Çıkış Yap</Link></div>

                </header>
                <div className="container" style={{overflowX:'scroll', maxHeight:'85vh'}}>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
