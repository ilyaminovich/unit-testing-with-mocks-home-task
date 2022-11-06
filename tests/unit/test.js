const { expect } = require('chai')
const { UserDataHandler } = require('../../src/data_handlers/user_data_handler')
const path = './data/users.json'
const fs = require('fs')
const nock = require('nock')
const { describe, it, beforeEach } = require('mocha')

const scopeUrl = nock('http://localhost:3000')

describe('test user_data_handler.js file', async function () {
  const dataFromStorage = JSON.parse(fs.readFileSync(path))
  const userDataHandler = await new UserDataHandler()

  beforeEach('load users from mock server', async function () {
    scopeUrl.get('/users')
      .reply(200, dataFromStorage)
    await userDataHandler.loadUsers()
  })

  it('load users from mock server', async function () {
    expect(dataFromStorage).to.eql(userDataHandler.users)
  })

  it('get users data', async function () {
    const userEmails = userDataHandler.getUserEmailsList()
    const arrayOfEmailsFromStorage = dataFromStorage.map(user => user.email)
    const listOfUSerEmailsFromStorage = arrayOfEmailsFromStorage.join(';')
    expect(listOfUSerEmailsFromStorage).to.eql(userEmails)
  })

  it('get users data', async function () {
    const expectedNumberOfUsers = userDataHandler.getNumberOfUsers()
    expect(dataFromStorage.length).to.eql(expectedNumberOfUsers)
  })

  it('get users data', async function () {
    const expectedMatchingData = userDataHandler.isMatchingAllSearchParams(userDataHandler.users[1], userDataHandler.users[1])
    expect(expectedMatchingData).to.eql(true)
  })

  it('get users data', async function () {
    const expectedUser = userDataHandler.findUsers(userDataHandler.users[1])
    const userFromStorage = dataFromStorage[1]
    expect([userFromStorage]).to.eql(expectedUser)
  })

  it('get users data', async function () {
    const expectedUser = userDataHandler.findUsers(userDataHandler.users[1])
    const userFromStorage = dataFromStorage[1]
    expect([userFromStorage]).to.eql(expectedUser)
  })

  it('get users data', async function () {
    try {
      await userDataHandler.findUsers(userDataHandler)
    } catch (err) {
      expect(err.message).to.eql('No matching users found!')
    }
  })
})

describe('test user_data_handler.js file', async function () {
  const userDataHandler = await new UserDataHandler()

  it('load users from mock server', async function () {
    try {
      await userDataHandler.loadUsers()
    } catch (err) {
      expect(err.message).to.eql('Failed to load users data: Error: Nock: No match for request {\n' +
          '  "method": "GET",\n' +
          '  "url": "http://localhost:3000/users",\n' +
          '  "headers": {\n' +
          '    "accept": "application/json, text/plain, */*",\n' +
          '    "user-agent": "axios/0.19.2"\n' +
          '  }\n' +
          '}')
    }
  })

  it('get users data', async function () {
    try {
      await userDataHandler.getUserEmailsList()
    } catch (err) {
      expect(err.message).to.eql('No users loaded!')
    }
  })

  it('get users data', async function () {
    try {
      await userDataHandler.findUsers()
    } catch (err) {
      expect(err.message).to.eql('No search parameters provoded!')
    }
  })

  it('get users data', async function () {
    try {
      await userDataHandler.findUsers({})
    } catch (err) {
      expect(err.message).to.eql('No users loaded!')
    }
  })
})
