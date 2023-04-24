import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function formContent(){
    const {id} = useParams(null);
    const [loading, setLoading] = useState(false)
    const [errors,setErrors] = useState(null);
    const [publish, setPublish] = useState(true);
    const [content, setContent] = useState({
        id: null,
        title:'',
        content:'',
        file:'null',
        published:'',
        publish_date:'null'

    });



    if (id) {
        useEffect(()=>{


            axiosClient.get(`/contents/${id}`).then(({data})=>{
                console.log(data);
                setContent(data.data);

            }).catch(err=>{
                console.log(err)
                setLoading(false)
            })
        },[])
    }

    const newForm = (e)=>{
        e.preventDefault();

    if (id) {


            axiosClient.put(`/contents/${id}`).then(({data})=>{
                console.log(data);
                setContent(data.data);

            }).catch(err=>{
                console.log(err)
                setLoading(false)
            })
    }else
    {



             axiosClient.post(`/contents`, content, {headers: { "Content-Type": "multipart/form-data" }}).then((res)=>{
                console.log(res);
                // setContent(res);

             }).catch(err=>{
                 console.log(err)
                 setLoading(false)
             })

    }

    }

    const showHide = ()=>{

    }
    return (
        <div>
            {content.id && <h1>İçerik Düzenleme</h1>}
            { !content.id && <h1>Yeni İçerik</h1>}
            <div className="card" style={{display:'flex'}}>
                {loading && <div className="text-center">
                    Yükleniyor..
                    </div>}
                    {

                        errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                        }
                        {!loading &&
                            <form onSubmit={newForm} encType="multipart/form-data" style={{marginRight:"15px"}}>
                                <input value={content.title} onChange={(ev) => { setContent({...content,title:ev.target.value}) }} placeholder="Başlık" type="text" />
                                <textarea value={content.content} onChange={(ev) => { setContent({...content,content:ev.target.value}) }} placeholder="İçerik" ></textarea>
                                <input type="file" accept="png,jpeg,jpg" onChange={(ev) => {(document.getElementById("images").style.display = "inherit" ); (document.getElementById("imgs").src = URL.createObjectURL(ev.target.files[0])); setContent({...content,file:ev.target.files[0]}) }} />
                                <div style={{display:"flex"}}>
                                <label htmlFor="chk" style={{width:"100%"}}>İleri bir tarihte paylaş</label>


                                <input type="checkbox"  name="publish" id="chk"  checked={content.published ? "checked" : 'unChecked'}   onChange={(ev) => { (!ev.target.checked ? document.getElementById("date").style.display ='none' : document.getElementById("date").style.display = 'inherit'  );  setContent({...content,published:(ev.target.checked == true ? 1 : 0) }) }}  />
                                </div>
                                {publish &&

                                <input  value={content.publish_date} type="date" style={{display:'none'}} id="date" onChange={(ev) => { setContent({...content,publish_date:ev.target.value}) }} />
                                }

                                <input type="submit" className="btn-add" />
                            </form>

                        }

                       <div id="images" style={{display:'none', width:"150px", height:"150px"}}>

                        <img id="imgs" src=""/>
                        </div>

            </div>
        </div>
    )

}
