import React,{useState} from "react";
import './Form.css';
// import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { useNavigate } from "react-router-dom";

const FormPage = () => {

    const [uname,setUname] = useState('');
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [Cpass,setCpass] = useState('');

    const navigate = useNavigate();

    const UnameChangeHandler = (e) =>  {
        e.preventDefault();
        setUname(e.target.value);
    }
    const EmailChangeHandler = (e) =>  {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const passChangeHandler = (e) =>  {
        e.preventDefault();
        setPass(e.target.value);
    }
    const CpassChangeHandler = (e) =>  {
        e.preventDefault();
        setCpass(e.target.value);
    }
    const formHandler = (e) => {
        e.preventDefault();
        if(uname=='' || uname==null)
        {
            alert('Please enter username')
            return false;
        }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
        {
            alert("You have entered an invalid email address!");
            return (false);
        }
        if(pass.length<7)
        {
            alert('Password must have more than 7 characters');
            return false;
        }
        if(pass.length>=7)
        {
            if(pass===Cpass)
            {
                return true;
            }
            else{
                alert('Password and confirm password does not match');
                return false;
            }
        }
        return true;
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const status = formHandler(e);
        if(status)
        {
            fetch('http://localhost:8000/signup',{
     
                // Adding method type
                method: "POST",
                 
                // Adding body or contents to send
                body: JSON.stringify({
                    email:email,
                    password:pass,
                    name:uname,
                    avatar:'...'
                }),
                 
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(resp=>resp.json())
            .then((resp)=>{
                console.log(resp);
                navigate('/login');
            })
            .catch((error)=>{
                console.log(error);
            })
        }

    }

  return (
    <div style={{'backgroundColor':'#fff'}}>
        <div className="cardHolder">
            <div className="signup-form" style={{'verticalAlign':'middle'}}>
                <form onSubmit={onSubmitHandler} method="post">
                    <h2>Sign Up</h2>
                    <p>Please fill in this form to create an account!</p>
                    
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <span className="fa fa-user"></span>
                                </span>                    
                            </div>
                            <input type="text" className="form-control" name="username" onChange={UnameChangeHandler} placeholder="Username" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-paper-plane"></i>
                                </span>                    
                            </div>
                            <input type="email" className="form-control" name="email" onChange={EmailChangeHandler} placeholder="Email Address" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>                    
                            </div>
                            <input type="text" className="form-control" name="password" onChange={passChangeHandler} placeholder="Password" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                    <i className="fa fa-check"></i>
                                </span>                    
                            </div>
                            <input type="text" className="form-control" name="confirm_password" onChange={CpassChangeHandler} placeholder="Confirm Password" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label"><input type="checkbox" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                    </div>
                </form>
                <div className="text-center">Already have an account? <a href="/login">Login here</a></div>
            </div>
        </div>
    </div>
  );
};

export default FormPage;