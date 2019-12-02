import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

const RegisterForm = ({
    values,
    handleSubmit,
    errors,
    touched,
}) => (
    <Form>
        <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
            {touched.username && errors.username && <p>{errors.username}</p>}
            <Field type="text" name="username" placeholder="Name" />
        </div>
        <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type="password" name="password" placeholder="Password" />
        </div>
        {/*<Field as="select" name="role">*/}
        {/*    <option value="parent">Parent</option>*/}
        {/*    <option value="child">Child</option>*/}
        {/*</Field>*/}
        <div>
            {touched.familyCode && errors.familyCode && <p>{errors.familyCode}</p>}
            <Field type="text" name="familyCode" placeholder="Enter or create your Family Code" />
        </div>
        <button type="submit">Submit</button>
    </Form>
)
const Register = withFormik({
    mapPropsToValues({ email, username, password, familyCode}) {
        return {
            email : email || '',
            username : username || '',
            password: password || '',
            // role: role || '',
            familyCode: familyCode || '',
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        username: Yup.string().min(3).required(),
        password: Yup.string().min(6).required(),
        familyCode: Yup.string().min(6).required(),
    }),
    handleSubmit(values) {
        console.log(values)
    }
})(RegisterForm)

export default Register;

