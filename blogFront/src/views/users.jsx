import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from "../context/contextProvider";
import { Navigate } from "react-router-dom";
import paginate from "../pagination"

export default function Users(){
    const [users,setUsers] = useState([]);
    const [paganiton, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [lastPage, setLastPage] = useState();
    const [loading, setLoading] = useState(false);
    const {user,token,setUser,setToken} = useStateContext()

    useEffect( () =>{
        getUsers(1);

    },[])

    if (user.role == 1) {
        return <Navigate to="/permitiondenied" />
    }

    const getUsers = (page) =>{

        setLoading(true);

        axiosClient.get('/users?page='+page).then(({data})=>{
            setLoading(false)
            console.log(data);
            setUsers(data.data)

            setPagination(paginate(data)[1])
            setCurrentPage(data.meta.current_page);

            setLastPage(paginate(data)[0])
        }).catch((e)=>{
            console.log(e);

            setLoading(false);
        });


    }


   function changeStatus  (e,u) {


    if (u.status == 1) {
        e.target.className = 'btn btn-add';
        e.target.textContent = 'Erişim İzni Ver';


    }else
    {
        e.target.className = 'btn btn-delete';
        e.target.textContent = 'Yasakla';
    }

        u.status = (u.status == 1 ? 0 : 1)

    console.log(u);
    axiosClient.put(`/users/${u.id}`, u).then((res)=>{
        console.log(res)
    }).catch(err => {
        console.log(err)
    })

    }



    return (
        <div className="p-2">

            <div style={{'display':'flex',  'justifyContent':'spaceBetween', 'alignItems': 'center'}}>
                <h3>Kullanıcılar</h3>


            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Kullanıcı Adı</th>
                            <th>Ad Soyad</th>
                            <th>Email</th>
                            <th>Oluşturulma Tarihi</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    {
                        loading && <tbody>
                            <tr>
                                <td colSpan={6} className="text-center">Yükleniyor</td>
                            </tr>
                        </tbody>
                    }
                    { !loading &&
                    <tbody id="tableUsers">
                    {
                            users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.username}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                            <button className={u.status == 1 ? 'btn btn-delete' : 'btn btn-add'} onClick={event => changeStatus(event,u)}>{u.status == 1 ? 'Yasakla' : 'Erişim İzni Ver'}</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    }
                </table>
                <div className="my-2 w-100 d-flex justify-content-center">

                    <button className='btn btn-add' disabled={currentPage == 1 ? true : false} style={{marginRight:'5px'}} key={'pagination_first'} onClick={event => getUsers(1)}> <FontAwesomeIcon icon={faArrowLeft} /> </button>

                    {
                        paganiton.map(pgs => (
                            pgs != null &&
                             <button className={currentPage == pgs ? 'btn btnCurrent' : 'btn btn-add'} style={{marginRight:'5px'}} key={'pagination_'+pgs} onClick={event => getUsers(pgs)}> {pgs} </button>
                        ))
                    }
                     <button className='btn btn-add' disabled={currentPage ==  lastPage ? true : false} style={{marginRight:'5px'}} key={'pagination_last'} onClick={event => getUsers(lastPage)}> <FontAwesomeIcon icon={faArrowRight} /> </button>
                </div>
            </div>

        </div>
    )

}
