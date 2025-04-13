import{useEffect} from "react";
import {useUserStore} from "../store/useStore"
import { useNavigate } from "react-router-dom";

function Protected({children}){
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user){
            navigate("/login")
        }
    },[user]);

    return <div>{children}</div>;
}

export default Protected;