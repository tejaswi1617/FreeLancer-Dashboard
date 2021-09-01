import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import registerServices from '../services/registerServices';

const EditProfile = () => {
    let history = useHistory();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        mobile:'',
        linkedin:'',
        website:'',
        password: '',
        id: localStorage.getItem('user_id')           
    });

    useEffect(() => {
        registerServices.fetchUserById(localStorage.getItem('user_id')).then((response) => {
            if(response){
                setUserInfo({                
                    name : response.Name,
                    email : response.Email,
                    mobile : response.ContactNo,
                    linkedin : response.LinkedInProfile,
                    website : response.Website,
                    password : ""
                })
            }
        }).catch((error) => {
            alert("Some error occurred");
            console.log("Eroor:",error)
        })
    },[]);

    const checkEmail = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const checkMobile = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    const [registrationInfo, setRegistrationInfo] = useState({
        name: '',
        email: '',
        mobile:'',
        linkedin:'',
        website:'',
        password: '',
        id: localStorage.getItem('user_id')
    });

    const [registrationErrors, setRegistrationErrors] = useState({
        nameError: '',
        emailError: '',
        mobileError:'',
        linkedinError:'',
        websiteError:'',
        passwordError: '',
    });

    const handleChange = (e) => {
        let newRegistration = {...registrationInfo, [e.target.name]: e.target.value};
        setRegistrationInfo(newRegistration);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        let newRegError = {...registrationErrors};

        if(registrationInfo.name === ""){
            registrationInfo.name = userInfo.name
        }
        else{
            newRegError.nameError = "";
            setRegistrationErrors(newRegError);
        }

        if(registrationInfo.email === ""){
            registrationInfo.email = userInfo.email
        }
        else{
            if(!checkEmail.test(registrationInfo.email)){
                newRegError.emailError = "Email Invalid!!";
                setRegistrationErrors(newRegError);
                valid = false;
            }
            else{
                newRegError.emailError = "";
                setRegistrationErrors(newRegError);
            }
        }

        if(registrationInfo.mobile === ""){
            registrationInfo.mobile = userInfo.mobile
        }
        else{
            if(!checkMobile.test(registrationInfo.mobile)){
                newRegError.mobileError = "Contact number Invalid!!";
                setRegistrationErrors(newRegError);
                valid = false;
            }
            else{
                newRegError.mobileError = "";
                setRegistrationErrors(newRegError);
            }
        }

        if(registrationInfo.linkedin === ""){
            registrationInfo.linkedin = userInfo.linkedin
        }
        else{
            newRegError.linkedinError = "";
            setRegistrationErrors(newRegError);
        }

        if(registrationInfo.website === ""){
            registrationInfo.website = userInfo.website
        }
        else{
            newRegError.websiteError = "";
            setRegistrationErrors(newRegError);
        }


        if(registrationInfo.password === ""){
            registrationInfo.password = userInfo.password
        }
        else{
            if(!checkPassword.test(registrationInfo.password)){
                newRegError.passwordError = "Password Invalid!!";
                setRegistrationErrors(newRegError);
                valid = false;
            }
            else{
                newRegError.passwordError = "";
                setRegistrationErrors(newRegError);
            }
        }

        if(valid === true){
            registerServices.editUser(registrationInfo).then((response) => {
                if(response){
                    alert("Profile Updated!!");
                    history.push("/profile");
                }
            }).catch((error) => {
                console.log("Error:",error)
            })
        }
    };

    return (
        <div>
            <div className="row" > <br /> </div>
            <div className="row" > 
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <br />
                        <br />
                        <h3>Edit Profile</h3>
                        <br />
                        <br />

                        <div className="form-group">
                            <Form.Label className="required">Name</Form.Label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={userInfo.name}
                                id = "name"
                                name = "name"
                                onChange={(e) => handleChange(e)} 
                            />
                            <p className="text-danger">{registrationErrors.nameError}</p>
                        </div>

                        <div className="form-group">
                        <Form.Label className="required">Email</Form.Label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={userInfo.email}
                                id = "email"
                                name = "email"
                                onChange={(e) => handleChange(e)}
                            />
                            <p className="text-danger">{registrationErrors.emailError}</p>
                        </div>

                        <div className="form-group">
                        <Form.Label className="required">Contact Number</Form.Label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={userInfo.mobile}
                                id = "mobile"
                                name = "mobile"
                                onChange={(e) => handleChange(e)}
                            />
                            <p className="text-danger">{registrationErrors.mobileError}</p>
                        </div>

                        <div className="form-group">
                        <Form.Label className="required"> LinkedIn Profile</Form.Label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={userInfo.linkedin}
                                id = "linkedin"
                                name = "linkedin"
                                onChange={(e) => handleChange(e)}
                            />
                            <p className="text-danger">{registrationErrors.linkedinError}</p>
                        </div>


                        <div className="form-group">
                        <Form.Label> Website</Form.Label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={userInfo.website}
                                id = "website"
                                name = "website"
                                onChange={(e) => handleChange(e)}
                            />
                            <p className="text-danger">{registrationErrors.websiteError}</p>
                        </div>

                        <div className="form-group">
                        <Form.Label className="required">Password</Form.Label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder={userInfo.password}
                                id = "password"
                                name = "password"
                                onChange={(e) => handleChange(e)}
                            />
                            <p className="text-danger">{registrationErrors.passwordError}</p>
                        </div>
                        <br />

                        <Button variant="primary" type="submit" className= "btn-block" > Edit Profile </Button>
                    </form>
                </div>    
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default EditProfile
