
import { useContext } from "react";
import { API } from "../Middleware/api";
import { UserContext } from "../Context";

const useRefreshToken = () => {
    const { setUser } = useContext(UserContext);

    const refresh = async () => {
        API(`/user/refresh`, "POST")
        .then(res => res.json())
        .then(values => {
            setUser(prev => {
                return { 
                    ...prev,
                    user: values.data.foundUser,
                    accessToken: values.data.accessToken
                }
            });
            return values.data.accessToken;
        })
        
    }
    return refresh;

}  
    
  

export default useRefreshToken;