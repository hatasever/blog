import { Navigate } from "react-router-dom"
import { useStateContext } from "../context/contextProvider"

export default function contentmanagement(){
    const {user,token,setUser,setToken} = useStateContext()
    if (user.role == 1) {
        return <Navigate to="/permitiondenied" />
    }

    return (
        <div>
            İçerikler
        </div>
    )

}
