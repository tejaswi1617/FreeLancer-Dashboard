import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import registerServices from '../../services/registerServices';
import emailjs from 'emailjs-com';


export default function Login(){

    let history = useHistory();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [loginErrors, setLoginErrors] = useState({
        emailError: "",
        passwordError: ""
    });

    const handleChange = (e) => {
        let newLogin = {...loginData, [e.target.name]: e.target.value};
        setLoginData(newLogin);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

        setLoginErrors({
            emailError: "",
            passwordError: ""
        });

        let newLoginError = {...loginErrors};

        if(loginData.email === ""){
            newLoginError.emailError = "Please enter email!!";
            setLoginErrors(newLoginError);
            valid = false;
        }
        else{
            newLoginError.emailError = "";
            setLoginErrors(newLoginError);
        }

        if(loginData.password === ""){
            newLoginError.passwordError = "Please enter Password!!";
            setLoginErrors(newLoginError);
            valid = false;
        }
        else{
            newLoginError.passwordError = "";
            setLoginErrors(newLoginError);
        }

        if(valid === true){
            registerServices.validateUser(loginData)
                .then((response) => {
                    if(response.success) {
                        localStorage.setItem('user_id', response.data._id);
                        alert(response.message);
                        history.push("/dashboard");
                    }else{
                        alert(response.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Some error occurred");
                })
        }
    };

    const handleMail = async (e) =>{
        loginData.email = prompt("Enter Your Email:");

        registerServices.resetPassword(loginData).then((response) => {
            if(response.success) {
                let mailParams = response.data;

                // calling emailJS functionality with emailJS Credentials
                emailjs.send(
                    'testimonial_request',
                    'template_fmwc5oo',
                    mailParams,
                    'user_INB1ILGAt4GVje2eeyj2V')
                    .then(function (response) {
                        alert("Email Sent");
                        console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        alert("Error: " + error);
                        console.log('FAILED...', error);
                    });
            }else{
                alert("User not found!");
            }
        }).catch((error) => {
            alert("Some error occurred!!");
            console.log("Error:",error)
        });
    };

    return (
        <div>
            <div className="row" > <br /> </div>

            <div className="row" >
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <br />
                        <br />
                        <h3>Log in</h3>

                        <div className="form-group">
                            <Form.Label className="required">Email</Form.Label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Please enter email "
                                id = "email"
                                name = "email"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <p className="text-danger">{loginErrors.emailError}</p>

                        <div className="form-group">
                            <Form.Label className="required">Password</Form.Label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Please enter password"
                                id = "password"
                                name = "password"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <p className="text-danger">{loginErrors.passwordError}</p>

                        <div className="form-group">
                            <div>
                            </div>
                        </div>

                        <Button type="submit" className="btn-block">Sign in</Button>
                        <p className="forgot-password text-right">
                            <div><a href="#"> <p onClick={handleMail}>Forgot password?</p></a></div>
                        </p>
                    </form>
                </div>
                <div className="col-md-3"/>
            </div>
        </div>
    )
}
