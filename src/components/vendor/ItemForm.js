import React, { useState, lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

import { categoryOptions, typeOptions } from '../../utils/option';
import { GET_USER } from '../../library/query';
import ErrorBoundary from '../ErrorBoundary';
const ImageUpload = lazy(() => import('./ImageUpload'));


const ItemForm = ({formType, mutation, details }) => {
    const [url, setUrl] = useState(() => !!details ? details.url : '')
    const { data : { currentUser } } = useQuery(GET_USER);
    
    return (
        <ErrorBoundary>
            <Formik
                initialValues = {{
                    name: !!details ? details.name : '',
                    category: !!details ? {value: details.category, label: details.category} : '',
                    description: !!details ? details.description : '',
                    type: !!details ? {value: details.type, label: details.type} : '',
                    price: !!details ? details.price : '',
                    is_available: !!details ? details.is_available : false
                }}

                validationSchema = {
                    Yup.object().shape({
                        name: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('required!'),
                        type: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('required!'),        
                        category: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('required!'),
                        description: Yup.string()
                                .max(300, 'Must be 300 characters or less')
                                .required('required!'),
                        price: Yup.number()
                                .required('Please enter an amount'),
                        is_available: Yup.boolean()
                                                
                    })
                }

                onSubmit = { (values, { setSubmitting }) => {
                    setSubmitting(true);
                    const input = {
                        ...values,
                        url,
                        type: values.type.value,
                        category: values.category.value,
                        price: parseInt(values.price),
                        vendor: currentUser
                    }
                    console.log({
                        ...values,
                        url,
                        type: values.type.value,
                        category: values.category.value,
                        price: parseInt(values.price)
                    })
                    formType === "edit" ?
                        mutation({
                            variables: {
                                id: details.id,
                                input: {
                                    ...values,
                                    url,
                                    type: values.type.value,
                                    category: values.category.value,
                                    price: parseInt(values.price)
                                }
                            }
                        }) :      
                        mutation({
                            variables: { input: input }
                        })
                }}
            >
                {( {values,touched,errors,handleChange,handleBlur,setFieldValue, isSubmitting}) => (
                    <Form className="itemForm">
                        <ImageUpload 
                            url={url}
                            setUrl={setUrl}
                        />
                        <label htmlFor="name"></label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Item Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {errors.name &&
                            touched.name &&
                                <div className="form-error">{errors.name}</div>
                        }
                        <label htmlFor="type"></label>
                        <Select 
                            name="type"
                            placeholder="Type"
                            options={typeOptions}
                            value={values.type}
                            onChange={option => setFieldValue('type', option)}
                        />                
                        {errors.type &&
                            touched.type &&
                            <div className="form-error">
                                {errors.type}
                            </div>    
                        }
                        <label htmlFor="category"></label>
                        <Select 
                            name="category"
                            placeholder="Category"
                            options={categoryOptions}
                            value={values.category}
                            onChange={option => setFieldValue('category', option)}
                        />
                        {errors.category &&
                            touched.category && (
                            <div className="form-error">{errors.category}</div>
                        )}
                        <label htmlFor="description"></label>
                        <textarea
                            name="description"
                            type="text"
                            placeholder="Description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.description &&
                            touched.description && (
                            <div className="form-error">{errors.description}</div>
                        )}
                        <label htmlFor="price"></label>
                        <input
                            name="price"
                            type="number"
                            min="1"
                            step="1"
                            placeholder="Price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.price &&
                            touched.price && (
                            <div className="form-error">{errors.price}</div>
                        )}
                        <div className="itemAvailablity">
                            <label htmlFor="is_available">
                                    In Stock
                            </label>
                            <input 
                                name="is_available"
                                type="checkbox"
                                checked={values.is_available}
                                onChange={handleChange}
                            />
                            {errors.is_available &&
                                touched.is_available && (
                                <div className="form-error">{errors.is_available}</div>
                            )}  
                        </div>
                        <button type="submit" disabled={!url || isSubmitting}>
                            {isSubmitting? 'Submitting...': 'Submit'}
                        </button>
                </Form>
                )}
            </Formik>
        </ErrorBoundary>
    )
}

export default ItemForm;