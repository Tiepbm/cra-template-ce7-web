import {
    Navigate,
} from 'react-router-dom';
import {localStorageRead} from "../../utils/LocalStorageUtils";
import {PROFILE_KEY, TOKEN_KEY} from "../../core/config";

const ProtectedRoute = ({ children }: any) => {
    const profile = localStorageRead(TOKEN_KEY);
    if (!profile) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default ProtectedRoute;
