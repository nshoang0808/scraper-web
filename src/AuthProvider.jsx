import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginAuth = async (data) => {
        setIsAuthenticated(true);
        navigate("/view");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
};