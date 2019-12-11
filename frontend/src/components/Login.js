import React from 'react';
import { Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import {setSessionCookie} from "../helpers/cookies";
import { useFetch } from "../helpers/hooks";
import {Link} from "react-router-dom";
import Cookie from 'js-cookie';



//TODO Validate user login to database values upon submit

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {... props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};



const LoginForm = () => {
    const [data, loading] = useFetch('http://localhost:8080/api/user')


    return (
        <>
            <h1>Login to Account</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .min(6, 'Must be at least 6 characters')
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {

                    //   fetch('http://localhost:8080/api/user')
                    //       .then( res => res.json())
                    //       .then( data =>
                    //           // const user = res.filter(user => user.email === values.email);
                    //           // const password = res.filter(user => user.password === values.password;
                    //
                    //           // if(user != null && password != null) {
                    //           //     setSessionCookie({user});
                    //           // }
                    // ),
                    // .then(res => {
                    //     return res.json()
                    // })
                    // .then( data => {
                    //     const user = data.filter(user => user.email === values.email);
                    //     const pass = data.filter(user => user.password === values.password);
                    //
                    //     if(user && pass ) {
                    //         setSessionCookie({user});
                    //     }}),

                    // fetch('http://localhost:8080/api/user', {
                    //     method: 'POST',
                    //     headers: {
                    //         Accept: "application/json",
                    //         "Content-Type": "application/json",
                    //         Authorize: "token",
                    //     },
                    //     body: JSON.stringify(values, null)
                    // })
                    setTimeout(() => {
                        const user = data.filter(user => user.email === values.email && user.password === values.password);
                        console.log(user)

                        if(user.length === 1) {
                            const token = user.username;
                            Cookie.set('token', token);
                            console.log('session');
                        }

                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
                    <TextInput label="email"
                               name="email"
                               type="email"
                               placeholder="email"
                    />
                    <TextInput label="password"
                               name="password"
                               type="password"
                               placeholder="Password"
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </>
    );
}

export default LoginForm;