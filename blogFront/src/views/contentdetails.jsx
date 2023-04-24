import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axiosClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from "../context/contextProvider";

export default function contentdetails(){

    const {id} = useParams();
    const [comments, setComments] = useState();
    const {user,token,setUser,setToken} = useStateContext()
    const comm = useRef();
    const navigate = useNavigate();
    const [content, setContent] = useState({

        title   : '',
        content : '',
        author  : null,
        like    : null,
        comment : null,
        file    : '',
        publis_date : ''
    });

    if (id) {

        useEffect(()=>{

            getContent();
        },[])

    }
    const getContent = ()=>{
        axiosClient.get(`/contents/${id}`).then(({data})=>{
            console.log(data.data);
            setContent(data.data);

            setComments(data.data.comments);

        }).catch(err =>{
            console.log(err);
        })
    }

    const removeComment = (e,cid) => {

        let data = {
            commentID : cid,
            contentID: id
        }
        axiosClient.post('/contents/remove', data).then((res)=>{
            document.getElementById("comment_"+cid).remove();
        })
    }

    const addComment = (e)=> {
        e.preventDefault();

        let data = {
            contentID : id,
            comment : comm.current.value
        }

        axiosClient.post('/contents/addComment', data).then((res)=> {
            console.log(res);
        }).catch(err=> {

        })

    }

    const updateFun = () => {
        navigate('/formContent/'+id)
    }
    const deleteFun = () => {
        console.log("delete")
    }
    return (
        <div className="container">
            <div className="row m-4">
            <div className="col-12 col-md-10  col-sm-6">
                    <div className="card "  >
                        <div className="card-header d-flex justify-content-between">
                        <h3>{content.title}</h3>
                        <div>
                            <button className="btn btn-outline-danger me-2" onClick={deleteFun} title="Sil"><FontAwesomeIcon icon={faTrash} /></button>
                            <button className="btn btn-outline-success" onClick={updateFun} title="Düzenle"><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </div>
                        </div>
                                <div className="card-body">



                                                    <img src={import.meta.env.VITE_API_BASE_URL + '/storage/' +content.file} alt="" style={{width:"200px", height:"200px", float:"left", marginRight:"10px"}} />

                                                    <span className="h-100"> {content.content}</span>



                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4 className="my-4">Yorum Yap</h4>
                                            <form  onSubmit={addComment}>
                                                <textarea ref={comm} name="" id="" className="" onChange={()=> {}}></textarea>
                                                <div  className="d-flex justify-content-end w-100">
                                                <button className="btn btn-add" type="submit">Yorum yap</button>
                                                </div>

                                            </form>
                                        </div>
                                        <div className="col-12" style={{borderTop:".4 solid #333"}}>
                                            <h6 className="my-2">Yorumlar</h6>
                                            {
                                            comments &&  comments.map(com => (

                                                    <div key={"comment_"+com.id} id={"comment_"+com.id} className="row mt-4 border" style={{height:"100px", backgroundColor:'#FFF', fontSize:"12px"}}>
                                                    <div className="col-2 d-flex justify-content-center align-items-center" style={{borderRight:".4px solid #333"}}>
                                                        <img src="#" alt="" />
                                                        <span className="">{com.author.name}</span>
                                                    </div>
                                                    <div className="col-8 d-flex justify-content-start align-items-center">
                                                        {com.comment}
                                                    </div>
                                                    <div className="col-2 d-flex justify-content-center align-items-center">
                                                    <button key={"removeCommentButton"+com.id} className="btn btn-danger" style={{fontSize:"12px"}} onClick={(e)=> {removeComment(e,com.id)}}><FontAwesomeIcon icon={faTrash} /></button>
                                                    </div>
                                                </div>

                                                ))

                                            }

                                            {
                                                !comments && <div className="row d-flex justify-content-center align-items-center">
                                                    <h3>Henüz Yorum bulunmuyor!</h3>
                                                </div>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
            </div>

        </div>
        </div>



    )
}
