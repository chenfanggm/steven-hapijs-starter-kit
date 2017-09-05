const normalNestedPromiseWithResolve = () => {
  return Promise.resolve()
    .then(() => {
      return Promise.resolve()
        .then(()=> {
          console.log('Hit: inner promise then')
          return 'Hello'
        })
        .catch((err) => {
          console.log('Hit: inner promise catch')
        })
    })
    .then((result) => {
      console.log('Hit: outer promise then')
    })
    .catch((err) => {
      console.log('Hit: outer promise catch')
    })
}

const throwErrorAtInnerPromiseWithInnerCatchButNotThrow = () => {
  return Promise.resolve()
    .then(() => {
      return Promise.resolve()
        .then(()=> {
          throw new Error('a error in promise')
          console.log('Hit: inner promise then')
          return 'Hello'
        })
        .catch((err) => {
          console.log('Hit: inner promise catch')
        })
    })
    .then((result) => {
      console.log('Hit: outer promise then')
    })
    .catch((err) => {
      console.log('Hit: outer promise catch')
    })
}

const throwErrorAtInnerPromiseWithInnerCatchButThrow = () => {
  return Promise.resolve()
    .then(() => {
      return Promise.resolve()
        .then(()=> {
          throw new Error('a error in promise')
          console.log('Hit: inner promise then')
          return 'Hello'
        })
        .catch((err) => {
          console.log('Hit: inner promise catch')
          throw err
        })
    })
    .then((result) => {
      console.log('Hit: outer promise then')
    })
    .catch((err) => {
      console.log('Hit: outer promise catch')
    })
}

const rejectAtInnerPromiseWithInnerCatchButNotThrow = () => {
  return Promise.resolve()
    .then(() => {
      return Promise.reject()
        .then(()=> {
          console.log('Hit: inner promise then')
          return 'Hello'
        })
        .catch((err) => {
          console.log('Hit: inner promise catch')
        })
    })
    .then((result) => {
      console.log('Hit: outer promise then')
    })
    .catch((err) => {
      console.log('Hit: outer promise catch')
    })
}

const rejectAtInnerPromiseWithInnerCatchButThrow = () => {
  return Promise.resolve()
    .then(() => {
      return Promise.reject()
        .then(()=> {
          console.log('Hit: inner promise then')
          return 'Hello'
        })
        .catch((err) => {
          console.log('Hit: inner promise catch')
          throw err
        })
    })
    .then((result) => {
      console.log('Hit: outer promise then')
    })
    .catch((err) => {
      console.log('Hit: outer promise catch')
    })
}

module.exports = {
  normalNestedPromiseWithResolve,
  throwErrorAtInnerPromiseWithInnerCatchButNotThrow,
  throwErrorAtInnerPromiseWithInnerCatchButThrow,
  rejectAtInnerPromiseWithInnerCatchButNotThrow,
  rejectAtInnerPromiseWithInnerCatchButThrow
}
