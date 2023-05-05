import { Component } from "react";
import css from './Form.module.css'
import shortid from "shortid";


class Form extends Component {
    state = {
        name: '',
        number: '',
    }

    // nameInputId = shortid.generate();
    // numberInputId = shortid.generate();
    
    handleChange = ({target}) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        
        const { name, number } = this.state;
        const { onAdd } = this.props;

        const isValidate = this.validateForm();
        if (!isValidate) return
        
        onAdd({ id: shortid.generate(), name, number });
    
        this.reset();
    };

    validateForm = () => {
        const { name, number } = this.state;
        const { onCheck } = this.props;
        if (!name || !number) {
            alert('This field empty!');
            return false;
        }

        return onCheck;
    }
    
    reset = () => {
        
        this.setState({
            name: ' ',
            number: ' ',
  })
};




    render() {
        const { name, number } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className={css.Form}>

                <label  className={css.Form__inputLabel}>
                    <p>Name:</p>
                <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                placeholder="Enter name"
                value={name}
                onChange={this.handleChange}
                className={css.Form__input}
                    />
            </label>
                
                <label  className={css.Form__inputLabel}>
                    <p>Number:</p>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    placeholder="Enter phone number"
                    value={number}
                    onChange={ this.handleChange} 
                    className={css.Form__input}
                    />
                </label>
                
                <button type="submit" className={css.Form__button}> Add contact</button>
            </form>
        )
    }
}


export default Form;

