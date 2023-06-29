import { Link } from "react-router-dom";
export default function UnautorizedPage(){
    return (<>
        <h1>
            You don't have permission to do this.
        </h1>
            <h3>Would you like to <Link to={"/auth"}>log in or sign up</Link>?</h3>    
    </>);
}