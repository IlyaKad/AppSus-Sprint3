import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const emailService = {
    query,
    saveEmail,
    deleteEmail,
    getEmailById,
    starEmail,
    addEmail,
    updateEmail
}

const KEY_email = 'emails';
// var gEmails = storageService.loadFromStorage(KEY_email) || null;

var emails = [
    {
        id: utilService.makeId(),
        subject: 'Approve Your Account',
        body: 'No one lives forever, approve your insurance account',
        isRead: true,
        sentAt: 'May 1st',
        author: 'Life Insurance',
        isTrash: true,
        isStarred: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        subject: 'Updates to the Google Cloud Platform',
        body: 'Hello Google Cloud Customer, We are sending this message to let you know about the following updates to the Google Cloud Platform Subprocessors list',
        isRead: false,
        sentAt: 'March 3rd',
        author: 'Google Cloud Platform ',
        isTrash: false,
        isStarred: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        subject: 'How to write for publications',
        body: 'If one of your goals is to eventually grow your blog, business or personal brand by landing a spot as a contributor for a major',
        isRead: false,
        sentAt: 'Jan 14',
        author: 'Robinson',
        isTrash: false,
        isStarred: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        subject: 'Ready to roll with Sushi Week?',
        body: 'Open the Uber Eats app and discover some faves in your area. You’re getting 20% off selected sushi',
        isRead: false,
        sentAt: '2020 Dec 26',
        author: 'Uber Eats ',
        isTrash: false,
        isStarred: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        subject: 'Your account has been charged',
        body: 'Nice doing bussines with you',
        isRead: true,
        sentAt: '2020 Sep 22',
        author: 'Oliver from Avocode',
        isTrash: false,
        isStarred: false,
        isSent: false
    },
]

var gEmails = emails;

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

//  DELETE EMAIL BY ID

function deleteEmail(emailId) {
    var emailIdx = gEmails.findIndex(email => {
        return emailId === email.id
    })

    if (gEmails[emailIdx].isTrash) gEmails.splice(emailIdx, 1)
    else gEmails[emailIdx].isTrash = true

    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve()
}

////Star EMail
function starEmail(emailId) {
    var emailIdx = gEmails.findIndex(email => {
        return emailId === email.id
    })

    if (gEmails[emailIdx].isStarred) gEmails[emailIdx].isStarred = false
    else gEmails[emailIdx].isStarred = true

    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve()
}


/////////////////////

// is there an id? if yes update email if no add a new one
function saveEmail(email) {
    return email.id ? _updateEmail(email) : _addEmail(email)
}

// same as delete email
function updateEmail(emailToUpdate) {
    var emailIdx = gEmails.findIndex(function (email) {
        return email.id === emailToUpdate.id;
    })
    gEmails.splice(emailIdx, 1, emailToUpdate)
    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve(emailToUpdate)
}


function addEmail({ subject, body, author }) {
    var email = _createEmail(subject, body, author)
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
        author,
        isTrash: false,
        isStarred: false,
        isSent: true
    }
}


// GET EMAIL BY ID

function getEmailById(emailId) {
    var email = gEmails.find(email => {
        return emailId === email.id
    })
    return Promise.resolve(email)
}