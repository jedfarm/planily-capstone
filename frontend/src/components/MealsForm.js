import React from "react";

import "react-datepicker/dist/react-datepicker.css";

import {Formik, useField} from 'formik'
import { Form, Datepicker, SubmitBtn } from 'react-formik-ui';

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



const MealsForm = () => {
    return (
        <>
            <h1>Add a Meal</h1>
            <Formik
            initialValues={{
                name: '',
                mealDate: ''
            }}
            // onSubmit={data => (alert(JSON.stringify(data)))}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    fetch('http://localhost:8080/api/meals', {
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
                <Form mode='themed'>

                    <TextInput label="Meal Name"
                               name="name"
                               type="text"
                               placeholder="Meal name"
                    />

                    <Datepicker
                        name='mealDate'
                        label='Select a date'
                        placeholder='DD.MM.YYYYY'
                        dateFormat='yyyy.MM.dd'
                    />

                    <SubmitBtn/>
                </Form>
            </Formik>
    </>
    )
}

export default MealsForm;