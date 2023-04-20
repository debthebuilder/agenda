import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AppContext } from "./context/Context";
import "./Login.css";
import { Alert, Form, Button, Loader, Logo } from "./components";

const API_URL = "http://localhost:3030";

function Register() {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value)
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if(email && password){
            const user = {email, password};
            try{
                fetch(`${API_URL}/login`, 
                {
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  credentials: "same-origin",
                  headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(user),
              })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                if(data.status !== "unauthorized"){
                    context.setAuth(true);
                    localStorage.setItem(data.data.user);
                    setSuccess("Login Successful!");
                    context.setUser(data.data);
                    navigate("/dashboard");
                } else {
                    setError("Incorrect email or password.");
                setTimeout(() => {
                    setError("");
                }, "3000");
                }
                
                
              }).catch(error => {
                console.log(error);
              }) 
            } catch (error) {
                setError("Incorrect email or password.");
                setTimeout(() => {
                    setError("");
                }, "3000");
            }
        } else {
            setError("All fields are required!");
            setTimeout(() => {
                setError("");
            }, "3000");
           
        }
    }
    return(
        <div className="wrapper">
            {/* <Loader /> */}
            <div>
                <Logo />
                
            </div>
            
            {error ?
                <Alert status={"error"} message={error} />
            : null }
            {success ?
                <Alert status={"success"} message={success} />
            : null }
            <div className="max-w-sm">
                <Form.Container>
                <h1 className="title">Sign Up</h1>
                    <Form.Input type={'email'} label={'Email'} name={'email'} required={true} handleChange={handleEmail} />
                    <Form.Input type={'password'} label={'Password'} name={'password'} required={true} handleChange={handlePassword} />
                    <Form.Input type={'password'} label={'Confirm Password'} name={'confirmPassword'} required={true} handleChange={handlePassword} />
                    <div className="my">
                        <Button.Lg type={"submit"} label={"Create Account"} handleClick={handleLogin} />
                        <Link to={'/'} className="link mt">Sign In</Link>
                    </div>
                   
                </Form.Container>
                
            </div>
            
        </div>
    )
}

export default Register;