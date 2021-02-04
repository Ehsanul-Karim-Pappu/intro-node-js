const fs = require('fs')
const path = require('path')

// this path needs to be relative to work with fs
const contactsLocation = 'exercises/cli/contacts.json'

/**
 * should read the contacts at the
 * @contactsLocation path and convert
 * it to a js object
 */
const getContacts = () => {
  return JSON.parse(fs.readFileSync(contactsLocation, { encoding: 'utf-8' }))
}

/**
 * takes a contacts object, converts it to JSON
 * and saves it at the @contactsLocation path
 * @param {Object} contacts contacts object
 */
const saveContacts = (contacts) => {
  fs.writeFileSync(contactsLocation, JSON.stringify(contacts))
}

module.exports = {
  contactsLocation,
  getContacts,
  saveContacts
}

