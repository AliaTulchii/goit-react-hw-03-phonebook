import { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css'


const initialState = [
  { id: 'id-1', name: 'Jerry Simpson', number: '459-12-56', avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12', avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79', avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26', avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
];

class App extends Component{
  state = {
    contacts: '',
    filter: ''
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts !== null) {
      this.setState({ contacts: JSON.parse(contacts) });
    } else {
      this.setState({ contacts: initialState });
    }
    
 }

 
  componentDidUpdate(prevProps,prevState) {
    console.log('App did update');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Contacts field is update ');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = ({name, number}) => {
    const person = {
      name,
      number,
    }

    const exist = this.state.contacts.find(({ name }) => name === person.name);

    if (exist) {
      alert(`${person.name} is already in contacts list`);
      return;
    }
    
    this.setState(prevState => ({
      contacts: [person, ...prevState.contacts],
    }));
  }

  

  handleCheckContact = (name) => {
    const { contacts } = this.state;

    const isContact = contacts.find(contact => contact.name === name);

    isContact && alert('Contact is already found!');

    return !isContact;
  }

  handleDelete = (id) => {
    this.setState(({contacts}) => ({contacts: contacts.filter(contact => contact.id !== id)}))
  }

  handleFilterChange = (filter) => {
    this.setState({ filter });
  }

 

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  

 

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
    <div className={css.ContactsList}>
        <h1 className={css.ContactList__titleWhite}>Phonebook</h1>
        <div className={css.ContactList__style}>
        <Form  onAdd={this.handleAddContact} onCheck={this.handleCheckContact} />

        <h2 className={css.ContactList__titleBlue}>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.handleFilterChange}/>
        <ContactList contacts={visibleContacts} onDelete={this.handleDelete}/>
        </div>
        
    </div>
  )
  }
}


export default App;