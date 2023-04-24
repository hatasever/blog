import { Link, useNavigate } from "react-router-dom";

export default  function notPermition (){
    const navigate = useNavigate();
    return (

        <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="card" style={{width:'600px'}}>
            <h1>Uyarı!</h1>
                 Bu alana erişim izniniz bulunmuyor.
            <button className="btn" style={{marginLeft:'5px'}} onClick={() => navigate(-1)}>Geri Dön</button>
        </div>
        </div>
    )
}
