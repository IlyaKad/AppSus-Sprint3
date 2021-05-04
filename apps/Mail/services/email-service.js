import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const emailService = {
    query,
    saveEmail,
    deleteEmail,
    getEmailById,
}

const KEY_email = 'emails';
// var gEmails = storageService.loadFromStorage(KEY_email) || null;

var emailSamples = [
    {
        id: utilService.makeId(),
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594,
        author: 'Joko'
    },
    {
        id: utilService.makeId(),
        subject: 'email2',
        body: 'works',
        isRead: true,
        sentAt: 1551133930594,
        author: 'joko2'
    }]

var gEmails = emailSamples;

function query(filterBy) {
    if (filterBy) {
        var { subject, author, body } = filterBy //check filterBy that was sent
        author = author ? author : ''
        subject = subject ? subject : ''
        body = body ? body : ''
        const filteredEmails = gEmails.filter(email => {
            return email.author.includes(author) &&
                email.subject.includes(subject) &&
                email.body.includes(body)
        })
        return Promise.resolve(filteredEmails)
    }
    return Promise.resolve(gEmails)
}


// SAVE Email: update current or create & add to storage

function saveEmail(email) {
    return email.id ? _updateEmail(email) : _addEmail(email)
}

function _updateEmail(emailToUpdate) {
    var emailIdx = gEmails.findIndex(function (email) {
        return email.id === emailToUpdate.id;
    })
    gEmails.splice(emailIdx, 1, emailToUpdate)
    storageService.saveToStorage(KEY, gEmails);
    return Promise.resolve(emailToUpdate)
}

function _addEmail(emailToAdd) {
    var email = _createEmail(emailToAdd.title, emailToAdd.listPrice.amount)
    gEmails.unshift(email)
    storageService.saveToStorage(KEY, gEmails)
    return Promise.resolve()
}

function _createEmail(subject, body, author) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        author
    }
}

//  DELETE EMAIL BY ID

function deleteEmail(emailId) {
    var emailIdx = gEmails.findIndex(function (email) {
        return emailId === email.id
    })
    gEmails.splice(emailIdx, 1)
    storageService.saveToStorage(KEY, gEmails);
    return Promise.resolve()
}


// GET EMAIL BY ID

function getEmailById(emailId) {
    var email = gEmails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}