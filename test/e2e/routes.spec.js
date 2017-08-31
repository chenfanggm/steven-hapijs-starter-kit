'use strict'
const { expect, it } = exports.lab = require('lab').script()


// 'use strict'
//
// describe('Routes /todo', () => {
//   let token
//   before((done) => {
//     let options = {
//       method: 'POST',
//       url: '/user',
//       payload: {
//         name: 'Jack Bauer',
//         username: 'jack_b',
//         email: 'jbauer@24hours.com',
//         password: '#24hoursRescuePresident'
//       }
//     }
//
//     server.inject(options, (response) => {
//       token = response.result.token
//       done()
//     })
//   })
//
//   describe('GET /todo', () => {
//     it('return 200 HTTP status code', (done) => {
//       db.Todo.remove(() => {
//         let options = {
//           method: 'GET',
//           url: '/todo',
//           headers: {'Authorization': 'Bearer ' + token}
//         }
//
//         server.inject(options, (response) => {
//           expect(response).to.have.property('statusCode', 200)
//           done()
//         })
//       })
//     })
//
//     it('returns an empty array when todo is empty', (done) => {
//       db.Todo.remove(() => {
//         let options = {
//           method: 'GET',
//           url: '/todo',
//           headers: {'Authorization': 'Bearer ' + token}
//         }
//         server.inject(options, (response) => {
//           expect(response).to.have.property('result')
//           expect(response.result).to.have.length.least(0)
//           done()
//         })
//       })
//     })
//
//     it('return 1 todo at a time', (done) => {
//       let options = {
//         method: 'GET',
//         url: '/todo',
//         headers: {'Authorization': 'Bearer ' + token}
//       }
//       server.inject(options, (response) => {
//         expect(response).to.have.property('result')
//         expect(response.result).to.have.length.least(1)
//
//         let todo = response.result
//         expect(todo).to.have.property('name')
//         expect(todo.name).to.contain('TODO Task')
//         expect(todo).to.have.property('checked', false)
//         done()
//       })
//     })
//   })
// })