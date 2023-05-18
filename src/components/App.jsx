import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filters/Filter';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';


class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate(prevProps, prevState ) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    };
  };

  addNewContact = (name, number) => {
    const newContact = {name, number, id: nanoid()};
    const CheckingContactForSimilarity = this.state.contacts.some(
      contact =>
      contact.name.toLowerCase() === name.toLowerCase() || contact.number === number
    );

    if (CheckingContactForSimilarity) {
      alert(`${name} is already in contacts  
       => ${name} уже есть в контактах <=`);
      return;
    }

    this.setState(({ contacts }) => 
    ({ contacts: [...contacts, newContact] }));
  };

  searchFilter = filter => {
    this.setState({ filter });
  };

  UpdateList = contacts => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().match(this.state.filter.toLowerCase())
    );
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      return { contacts: contacts.filter(contact => contact.id !== id) };
    });
  };

  render() {
    const { contacts } = this.state;
    const filterContacts = this.UpdateList(contacts);
    return (
      <div
      className="container"
      >
        <h1>Phonebook</h1>
        <ContactForm  addNewContact={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter searchFilter={this.searchFilter} />
        <ContactList 
           contacts={filterContacts}
           removeContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;