import { Link, useNavigate } from "react-router-dom"
import { useStateContext } from "../context/contextProvider"
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import paginate from "../pagination"


export default function contents(){
    const {user,token,setUser,setToken} = useStateContext()
    const navigate = useNavigate();
    const [contents, setContents] = useState();
    const [paganiton, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [lastPage, setLastPage] = useState();
    const [loading, setLoading] = useState(false);
    const nvt = ()=>{
        navigate('/formContent/new')
    }

    useEffect(()=> {
        getContents(1)
    },[])

    const getContents = (page)=>{
        axiosClient.get('/contents?page='+page).then(({data})=>{
            console.log(data);
            setContents(data.data)

            setPagination(paginate(data)[1])
            setCurrentPage(data.meta.current_page);

            setLastPage(paginate(data)[0])
        }).catch(err => {
            console.log(err);
        })
    }




    return (
        <div>
            <div className="card" style={{display:"flex", justifyContent:'space-between', alignItems:'center',flexDirection:"row"}}>
                <h3>İçerikler</h3>
                <button className="btn btn-add" id="sdfsd" onClick={nvt}>İçerik Ekle</button>
            </div>
            <div className="row d-flex justify-content-center">
            {
                contents && contents.map(element=> (

                    <div key={element.id} className="card col-5 me-2" style={{width:"300px",padding:"0"}}>
                            <div className="card-header" style={{padding:"0"}}>
                                <img src={import.meta.env.VITE_API_BASE_URL +'/storage/'+ element.file} alt="" className="w-100 h-100" style={{borderTopRightRadius:"8px","borderTopLeftRadius":"8px"}} />
                            </div>
                            <div className="card-body">
                                <h4>{element.title}</h4>

                                    {element.content.length > 30 && <div> {element.content.substr(30)}...<a onClick={(e) => {e.preventDefault; navigate('/contentdetails/'+element.id)}} style={{cursor:"pointer", color:"blue"}}>Devamını Oku</a></div>}
                                    {element.content.length < 30 && <div> {element.content}<a onClick={(e) => {e.preventDefault; navigate('/contentdetails/'+element.id)}} style={{cursor:"pointer", color:"blue"}}>Devamını Oku</a></div>
                                     }

                            </div>
                            <div className="card-footer">
                                <div className="row  ">
                                     <span className="col-6"><FontAwesomeIcon icon={faThumbsUp} color="purple" style={{marginRight:"10px"}} />0 <FontAwesomeIcon icon={faComment} color="purple" style={{marginLeft:"10px",marginRight:"10px"}}/>0</span>
                                     <span className="col-6">{element.author.name}</span>
                                </div>
                            </div>
                    </div>
                ))
            }
            </div>

            <div>

                <button className='btn btn-add' disabled={currentPage == 1 ? true : false} style={{marginRight:'5px'}} key={'pagination_first'} onClick={event => getContents(1)}> <FontAwesomeIcon icon={faArrowLeft} /> </button>

                {
                    paganiton.map(pgs => (
                        pgs != null &&
                        <button className={currentPage == pgs ? 'btn btnCurrent' : 'btn btn-add'} style={{marginRight:'5px'}} key={'pagination_'+pgs} onClick={event => getContents(pgs)}> {pgs} </button>
                    ))
                }
                <button className='btn btn-add' disabled={currentPage ==  lastPage ? true : false} style={{marginRight:'5px'}} key={'pagination_last'} onClick={event => getContents(lastPage)}> <FontAwesomeIcon icon={faArrowRight} /> </button>
                </div>
        </div>
    )

}
