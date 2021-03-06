import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import s from "./App.module.scss";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  onSubmitName = ({ name, number }) => {
    const newName = {
      id: nanoid(),
      name,
      number,
    };

    const compareContact = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === newName.name.toLowerCase()
    );
    if (compareContact) {
      return alert(`${name} is alredy in contacts`);
    }
    this.setState(({ contacts }) => {
      return {
        contacts: [newName, ...contacts],
        name: "",
        number: "",
      };
    });
  };

  filteredContact = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  onFilterValueChange = (e) => this.setState({ filter: e.target.value });

  deleteContact = (id) =>
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));

  render() {
    const {
      onSubmitName,
      onFilterValueChange,
      filteredContact,
      deleteContact,
      state,
    } = this;
    const filterResult = filteredContact();

    return (
      <main>
        <section>
          <div className={s.container}>
            <h1 className={s.title}>Phonebook</h1>

            <ContactForm onSubmit={onSubmitName} options={state} />

            <h2 className={s.title}>Contacts</h2>

            <Filter onChangeValue={onFilterValueChange} filter={state} />

            <ContactList
              filterContactsList={filterResult}
              onClickDel={deleteContact}
            />
          </div>
        </section>
      </main>
    );
  }
}

export default App;
