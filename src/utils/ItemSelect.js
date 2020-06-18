import React from 'react';
import Select from 'react-select';

const SelectCategory = (props) => {
    const handleChange = value => {
        props.onChange('type', value);
    }

    const handleBlur = value => {
        props.onBlur('type', value);
    }
    return(
        <div style={{ margin: '1rem 0' }}>
            <label htmlFor={name}>{name}</label>
            <Select 
                options={options}
                multi={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={props.value}
            />
            {!!this.props.error &&
                this.props.touched && (
                    <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
            )}
        </div>
    )
}