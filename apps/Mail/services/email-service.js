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

var inboxEmails = [
    {
        id: utilService.makeId(),
        subject: 'Approve Your Account',
        body: 'No one lives forever, approve your insurance account',
        isRead: false,
        sentAt: 'May 1st',
        author: 'Life Insurance'
    },
    {
        id: utilService.makeId(),
        subject: 'Updates to the Google Cloud Platform',
        body: 'Hello Google Cloud Customer, We are sending this message to let you know about the following updates to the Google Cloud Platform Subprocessors list',
        isRead: true,
        sentAt: 'March 3rd',
        author: 'Google Cloud Platform '
    },
    {
        id: utilService.makeId(),
        subject: 'How to write for publications',
        body: 'If one of your goals is to eventually grow your blog, business or personal brand by landing a spot as a contributor for a major',
        isRead: false,
        sentAt: 'Jan 14',
        author: 'Robinson'
    },
    {
        id: utilService.makeId(),
        subject: 'Ready to roll with Sushi Week?',
        body: 'Open the Uber Eats app and discover some faves in your area. You’re getting 20% off selected sushi',
        isRead: true,
        sentAt: '2020 Dec 26',
        author: 'Uber Eats '
    },
    {
        id: utilService.makeId(),
        subject: 'Your account has been charged',
        body: 'Nice doing bussines with you',
        isRead: true,
        sentAt: '2020 Sep 22',
        author: 'Oliver from Avocode'
    },
]

var gEmails = inboxEmails;

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
    // return Promise.resolve(onSideBarClick)
}

function onSideBarClick(btnVal) {
    if (val === 'inbox') gEmails = inboxEmails
    if (val === 'sent') gEmails = sentEmails
    if (val === 'trash') gEmails = trashEmails
}


function saveEmail(email) {
    return email.id ? _updateEmail(email) : _addEmail(email)
}

function _updateEmail(emailToUpdate) {
    var emailIdx = gEmails.findIndex(function (email) {
        return email.id === emailToUpdate.id;
    })
    gEmails.splice(emailIdx, 1, emailToUpdate)
    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve(emailToUpdate)
}

function _addEmail(emailToAdd) {
    var email = _createEmail(emailToAdd.title, emailToAdd.listPrice.amount)
    gEmails.unshift(email)
    storageService.saveToStorage(KEY_email, gEmails)
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
    var emailIdx = gEmails.findIndex(email => {
        return emailId === email.id
    })
    //push to gTrash/gSent(according to action)
    //add to storage KEY=trash/
    gEmails.splice(emailIdx, 1)
    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve()
}


// GET EMAIL BY ID

function getEmailById(emailId) {
    var email = gEmails.find(email => {
        return emailId === email.id
    })
    return Promise.resolve(email)
}