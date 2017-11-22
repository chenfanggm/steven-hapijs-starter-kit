const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const i18next = require('i18next')

// setup template engine option
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g
const applyErrorTemplate = (template, payload) => {
  if (payload) {
    return _.template(template)(payload)
  } else {
    return template
  }
}

const isDirectory = (dirPath) => {
  return fs.lstatSync(dirPath).isDirectory()
}

const getDirectories = (dirPath) => {
  return fs.readdirSync(dirPath).filter((dirName) => {
    return isDirectory(path.resolve(dirPath, dirName))
  })
}

// setup error message i18n
const loadLocaleResources = (localeDirPath) => {
  const langs = getDirectories(localeDirPath)
  const resources = {}
  langs.forEach((lang) => {
    const filePath = path.resolve(localeDirPath, lang, './errorCode.json')
    resources[lang] = {}
    resources[lang].errorCode = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  })
  return resources
}

const resources = loadLocaleResources(path.resolve(__dirname, './locale'))
const errI18n = i18next.createInstance({
  resources: resources,
  fallbackLng: 'en',
  ns: ['errorCode'],
  defaultNS: 'errorCode',
  debug: false
}, (err, t) => {
  if (err) throw err
})

const getErrorMessage = (errorCode, payload = {}) => {
  return errI18n.t(errorCode, payload)
}

const setLang = (lang) => {
  if (errI18n.language !== lang) {
    errI18n.changeLanguage(lang, (err, t) => {
      if (err) throw err
    })
  }
}

module.exports = {
  setLang,
  getErrorMessage,
  applyErrorTemplate
}
