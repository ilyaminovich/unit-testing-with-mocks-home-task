const axios = require('axios').default

/**
 *
 * A class for interracting with user data
 * @class UserDataHandler
 */
class UserDataHandler {
  /**
   *Creates an instance of UserDataHandler.
   * @memberof UserDataHandler
   */
  constructor () {
    this.users = []
  }

  /**
   * A method for loading users data from the server
   * @return {Promise} if successful updates users array of the calass instance
   * @memberof UserDataHandler
   */
  async loadUsers () {
    const response = await axios.get('http://localhost:3000/users').catch(err => {
      throw new Error(`Failed to load users data: ${err}`)
    })
    this.users = response.data
  }

  /**
   *
   * A method for creating a string containing al user emails
   * @return {String} a string containing all the users emails separated by a semicolon
   * @memberof UserDataHandler
   */
  getUserEmailsList () {
    if (this.users.length === 0) throw new Error('No users loaded!')
    const arrayOfEmails = this.users.map(user => user.email)
    const listOfUSerEmails = arrayOfEmails.join(';')
    return listOfUSerEmails
  }

  /**
   *
   * A method for retrieving number of current users
   * @return {Number} current number of users in class instance
   * @memberof UserDataHandler
   */
  getNumberOfUsers () {
    return this.users.length
  }

  /**
   *
   *
   * @param {Object} user user object to be checked
   * @param {Object} searchParamsObject object containing search parameters in key-value pairs
   * @return {Boolean} returns true if user object matches all provided search parameters
   * @memberof UserDataHandler
   */
  isMatchingAllSearchParams (user, searchParamsObject) {
    let isMatching = true
    for (const searchParam in searchParamsObject) {
      if (user[searchParam] !== searchParamsObject[searchParam]) {
        isMatching = false
      }
      if (isMatching === false) break
    }
    return isMatching
  }

  /**
   *
   *
   * @param {Object} searchParamsObject object containing search parameters in key-value pairs
   * @return {Array<Object>} array of objects that match provided search parameters
   * @memberof UserDataHandler
   */
  findUsers (searchParamsObject) {
    if (!searchParamsObject) throw new Error('No search parameters provoded!')
    if (this.users.length === 0) throw new Error('No users loaded!')
    const matchingUsers = this.users.filter(user => this.isMatchingAllSearchParams(user, searchParamsObject))
    if (matchingUsers.length === 0) throw new Error('No matching users found!')
    return matchingUsers
  }
}

module.exports = { UserDataHandler }
