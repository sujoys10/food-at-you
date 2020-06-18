import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { USER_SIGNUP_MUTATION } from '../../library/mutation';


export default function SignupForm(){
    const client = useApolloClient();
    
    const [ mutation, { loading, error } ] = useMutation(
        USER_SIGNUP_MUTATION,
        {
            onCompleted({createUser}){
                localStorage.setItem('token', createUser.token);
                localStorage.setItem('currentUser', createUser.user.email);
                localStorage.setItem('role', 'USER');
                client.writeData({
                    data: {
                        isLoggedIn: true,
                        currentUser: createUser.user.email,
                        role: 'USER'
                    }
                })
            }
        }
    )
    if(error) throw new Error(error.message)
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