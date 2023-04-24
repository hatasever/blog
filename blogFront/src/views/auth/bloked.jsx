import svg from "../../assets/question.svg"
export default function bloked(){

    return (
        <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div className="card" style={{width:'600px'}}>
                <img src={svg}  />
                <h1>Uyarı!</h1>

                <p style={{fontSize:'14px'}}>Bu hesaptan erişiminiz yönetici tarafından engellenmiştir.</p>
            </div>
        </div>
    )

}
