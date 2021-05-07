import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const emailService = {
    query,
    // saveEmail,
    deleteEmail,
    getEmailById,
    starEmail,
    addEmail,
    updateEmail,
    toggleReadUnread
}

const KEY_email = 'emails';
var gEmails = storageService.loadFromStorage(KEY_email) || emails;

var emails = [
    {
        id: utilService.makeId(),
        subject: 'Approve Your Account',
        body: 'No one lives forever, approve your insurance account',
        isRead: false,
        sentAt: 'May 1st',
        author: 'Life Insurance',
        isTrash: false,
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
        isRead: true,
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
        isRead: true,
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
var gEmails = storageService.loadFromStorage(KEY_email) || emails;

function query(filterBy) {
    if (!filterBy || filterBy.value === 'all') return Promise.resolve(gEmails)

    else if (filterBy) {
        const { value, type } = filterBy
        // console.log('type:', type, 'value:', value);
        let filteredEmails;
        if (type === 'search') filteredEmails = getEamilsBySearch(value)
        if (type === 'radio') filteredEmails = getEamilsByRadio(value)
        return Promise.resolve(filteredEmails)
    }
}

function getEamilsBySearch(value) {
    value = value ? value.toUpperCase() : ''
    console.log('getEamilsBySearch value:', value);
    const serchedEmails = gEmails.filter(email => {
        return email.author.toUpperCase().includes(value)
            || email.subject.toUpperCase().includes(value) ||
            email.body.toUpperCase().includes(value)
    })
    return serchedEmails
}

function getEamilsByRadio(value) {
    console.log('getEamilsByRadio value:', value)
    let condition = (value === 'read') ? true : false
    const sortedEmails = gEmails.filter(email => {
        return email.isRead === condition
    })
    return sortedEmails
}


function deleteEmail(emailId) {
    var emailIdx = gEmails.findIndex(email => {
        return emailId === email.id
    })

    if (gEmails[emailIdx].isTrash) gEmails.splice(emailIdx, 1)
    else gEmails[emailIdx].isTrash = true

    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve()
}

function starEmail(emailId) {
    var emailIdx = gEmails.findIndex(email => {
        return emailId === email.id
    })

    if (gEmails[emailIdx].isStarred) gEmails[emailIdx].isStarred = false
    else gEmails[emailIdx].isStarred = true

    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve()
}


// function saveEmail(email) {
//     return email.id ? _updateEmail(email) : _addEmail(email)
// }

function updateEmail(emailId) {
    var emailIdx = gEmails.findIndex((email) => email.id === emailId)
    if (!gEmails[emailIdx].isRead) gEmails[emailIdx].isRead = !gEmails[emailIdx].isRead

    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve()
}

function toggleReadUnread(emailId) {
    var emailIdx = gEmails.findIndex((email) => email.id === emailId)
    gEmails[emailIdx].isRead = !gEmails[emailIdx].isRead
    storageService.saveToStorage(KEY_email, gEmails);
    return Promise.resolve()
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
        sentAt: getDate(),
        subject,
        body,
        author,
        isRead: false,
        isTrash: false,
        isStarred: false,
        isSent: true
    }
}

function getDate() {
    const date = new Date(2021, 5, 6)
    const month = date.toLocaleString('default', { month: 'long' })
    const day = new Date().getDate()

    return `${month} ${day}`
}

function getEmailById(emailId) {
    var email = gEmails.find(email => {
        return emailId === email.id
    })
    return Promise.resolve(email)
}