import React from 'react';
import css from './ContactsList.module.css'
import { FaTrashAlt } from 'react-icons/fa'
import person from './person.png'
import PropTypes from 'prop-types'


const ContactListItem = ({ id, name, number, avatar = person, onDelete }) => {
    return (
        <li key={id}
            className={css.ContactsList__item}>     
            <img src={avatar} alt={name} className={ css.ContactList__img } />
                <p className={css.ContactsList__text}>{name}</p>
                <p className={css.ContactsList__textWhite}>{number}</p>
                <button
                    className={css.ContactsList__button}
                    onClick={() => onDelete(id)}
                ><FaTrashAlt /></button>
            </li>)
   
}

const ContactList = ({ contacts, onDelete }) => {
    if (contacts.length === 0) return null
    return (
        <ul>
            {contacts.map(contact => <ContactListItem {...contact} onDelete={onDelete} />)}
        </ul>
    )
}

export default ContactList;


ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
        })
    )
}