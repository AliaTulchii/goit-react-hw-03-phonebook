import React from 'react';
import css from './Filter.module.css'
import PropTypes from 'prop-types'

const Filter = ({ filter, onChange }) => {
    return (
        <input
            type='text'
            name='filter'
            value={filter}
            onChange={({ target }) => onChange(target.value)}
            placeholder='Enter name for search'
            className={css.Filter__input}
        />
        
    )
}

export default Filter;

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };