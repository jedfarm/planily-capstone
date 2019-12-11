import React from 'react';
import { Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import {setSessionCookie} from "../helpers/cookies";
import {Route, Redirect, Link} from "react-router-dom";
import Cookie from 'js-cookie';


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


const SelectInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const RegisterForm = () => {
    return (
        <div>
            <h1>Register Account</h1>
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    password: '',
                    role: '',
                    familyCode: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    username: Yup.string()
                        .min(4, 'Must be at least 6 characters')
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    password: Yup.string()
                        .min(6, 'Must be at least 6 characters')
                        .required('Required'),
                    role: Yup.string()
                        .oneOf(
                            ['parent', 'child']
                        )
                        .required('Required'),
                    familyCode: Yup.string()
                        .min(6, 'Must be at least 6 characters')
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        fetch('http://localhost:8080/api/user', {
                            method: 'POST',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: "token",
                            },
                            body: JSON.stringify(values, null)
                        })
                            .then(res => {
                                const user = values.username;
                                const token = {user}
                                Cookie.set('token', token);
                                console.log(token);
                            });
                    setSubmitting(false);
                    }, 400);

                }}
            >
                <Form>
                    <TextInput label="email"
                               name="email"
                               type="email"
                               placeholder="Email"
                    />
                    <TextInput label="username"
                               name="username"
                               type="text"
                               placeholder="Username"
                    />
                    <TextInput label="password"
                               name="password"
                               type="password"
                               placeholder="Password"
                    />
                    <SelectInput label="role"
                                 name="role">
                        <option value="">Select One</option>
                        <option value="parent">Parent</option>
                        <option value="child">Child</option>
                    </SelectInput>
                    <TextInput label="familyCode"
                               name="familyCode"
                               type="text"
                               placeholder="Family Code"
                    />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            </div>
    );
};

// const RegisterForm = ({
//     values,
//     handleSubmit,
//     errors,
//     touched,
//     isSubmitting,
// }) => (
//     <Form>
//         <div>
//             {touched.email && errors.email && <p>{errors.email}</p>}
//             <Field type="email" name="email" placeholder="Email" />
//         </div>
//         <div>
//             {touched.username && errors.username && <p>{errors.username}</p>}
//             <Field type="text" name="username" placeholder="Name" />
//         </div>
//         <div>
//             {touched.password && errors.password && <p>{errors.password}</p>}
//             <Field type="password" name="password" placeholder="Password" />
//         </div>
//         <Field as="select" name="role">
//             <option value="parent">Parent</option>
//             <option value="child">Child</option>
//         </Field>
//         <div>
//             {touched.familyCode && errors.familyCode && <p>{errors.familyCode}</p>}
//             <Field type="text" name="familyCode" placeholder="Enter or create your Family Code" />
//         </div>
//         <button type="submit" disabled={isSubmitting}>Submit</button>
//     </Form>
// )
// const Register = withFormik({
//     mapPropsToValues({ email, username, password, role, familyCode}) {
//         return {
//             email : email || '',
//             username : username || '',
//             password: password || '',
//             role: role || '',
//             familyCode: familyCode || '',
//         };
//     },
//     validationSchema: Yup.object().shape({
//         email: Yup.string().email().required(),
//         username: Yup.string().min(3).required(),
//         password: Yup.string().min(6).required(),
//         familyCode: Yup.string().min(6).required(),
//     }),
//     handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
//         setTimeout(() => {
//
//             // TODO: figure out how to check against database
//             if(values.email === "kjswenso@gmail.com") {
//                 setErrors({email: 'Email already exists'})
//             } else {
//                 resetForm()
//             }
//             setSubmitting(false)
//         }, 2000)
//         console.log(values)
//     }
// })(RegisterForm)

export default RegisterForm;

