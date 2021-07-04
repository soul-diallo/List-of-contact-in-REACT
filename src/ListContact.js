import React, {Component} from 'react';
import PropTypes from 'prop-types'
import escapeStringRegexp from "escape-string-regexp";
import sortBy from 'sort-by'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    clearQuery = () => {
        this.setState({ query: ''})
    }

    render() {
        const { contacts, onDeleteContact } = this.props
        const { query } = this.state

        let showingContacts
        if (query) {
            const match = new RegExp(escapeStringRegexp(query), 'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <a
                        href="#create"
                        onClick={this.props.onNavigate}
                        className="add-contact"
                    >Add Contact</a>
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total </span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}>
                            </div>
                            <div>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>

            </div>
        )
    }
}

//In our ListContacts component, not only does the component render a form,
//but it also controls what happens in that form based on user input.
//In this case, event handlers update the component's state with the user's search query.
//And as we've learned: any changes to React state will cause a re-render on the page,
//effectively displaying our live search results.

export default ListContacts