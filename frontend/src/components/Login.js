import React from 'react';
import { Formik, Form, useField} from 'formik';
import * as Yup from 'yup';

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
              setTimeout(() => {
                  fetch('http://localhost:8080/api/user', {
                      method: 'POST',
                      headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values, null)
                  })
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
              <TextInput label="password"
                         name="password"
                         type="password"
                         placeholder="Password"
              />
              <button type="submit">Submit</button>
          </Form>
      </Formik>
      </>
    );
}

export default LoginForm;