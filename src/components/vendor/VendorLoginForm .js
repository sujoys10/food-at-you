import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { LOGIN_VENDOR } from '../../library/mutation';


export default function VendorLoginForm(){
    const client = useApolloClient();
   
    const [ mutation, { loading, error } ] = useMutation(
        LOGIN_VENDOR,
        {
            onCompleted({loginVendor}){
                localStorage.setItem('token', loginVendor.token);
                localStorage.setItem('currentUser', loginVendor.vendor.email);
                localStorage.setItem('role', 'VENDOR');
                client.writeData({
                    data: {
                        isLoggedIn: true,
                        currentUser: loginVendor.vendor.email,
                        role: 'VENDOR'
                    }
                })
            }
        }
    )
    return(
        <div>
            {
                error && (
                    <pre>{error.graphQLErrors.map(({ message }, i) => (
                        <span key={i}>{message}</span>
                      ))}
                    </pre>
                )
            }
            <Formik
                initialValues= {{
                    email: '',
                    password: ''
            }}
            
                validationSchema={ Yup.object({
                    email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                    password: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                    })} 
                    onSubmit = {values => {
                        mutation({variables: {input : values}})
                    }} 
            >
                <Form className="authForm">
                    <label htmlFor="email"></label>
                    <Field name="email" type="email" placeholder="Email" />                
                    <ErrorMessage name="email"/>

                    <label htmlFor="password"></label>
                    <Field name="password" type="password" placeholder="Password"/>
                    <ErrorMessage name="password"/>    
                    
                    <button disabled={loading} type="submit">
                        {loading? 'Logging In...' : 'Log In'}
                    </button>
                </Form>
            </Formik>
        </div>
        
    )
}