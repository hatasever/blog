import svg from "../../assets/question.svg"
export default  function notFound (){

    return (
        <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="card" style={{width:'600px'}}>
            <img src={svg}  />
            <h1>404 Not Found!</h1>

            <p style={{fontSize:'14px'}}>Aradığınız sayfa bulunamadı.</p>
        </div>
    </div>
    )
}
