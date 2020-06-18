import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { SIGNUP_VENDOR } from '../../library/mutation';


export default function VendorSignupForm(){
    const client = useApolloClient();
    const [ mutation, { loading, error } ] = useMutation(
        SIGNUP_VENDOR,
        {
            onCompleted({createVendor}){
                localStorage.setItem('token', createVendor.token);
                localStorage.setItem('currentUser', createVendor.vendor.email);
                localStorage.setItem('role', 'VENDOR');
                client.writeData({
                    data: {
                        isLoggedIn: true,
                        currentUser: createVendor.vendor.email,
                        role: 'VENDOR'
                    }
                })
            }
        }
    )
    if(error) throw new Error(error.message);
    return(
        <Formik
            initialValues= {{
                name: '',
                email: '',
                password: ''
           }}
          
            validationSchema={ Yup.object({
                name: Yup.string()
                          .max(15, 'Must be 15 characters or less')
                          .required('Required'),
                email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                password: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                })} 
                 onSubmit = {values => {
                    console.log('values', {input:values})
                    mutation({variables: {input : values}})
                }} 
        >
            <Form className="authForm">
                <label htmlFor="name"></label>
                <Field name="name" type="text" placeholder="Name"/>
                <ErrorMessage name="name"/>

                <label htmlFor="email"></label>
                <Field name="email" type="email" placeholder="Email"/>
                <ErrorMessage name="email"/>

                <label htmlFor="password"></label>
                <Field name="password" type="password" placeholder="Password"/>
                <ErrorMessage name="password"/>   
                
                <button disabled={loading} type="submit">
                    {loading? 'Creating Account...' : 'Sign Up'}
                </button>
            </Form>
        </Formik>
    )
}