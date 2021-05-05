import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const replyService = {
    query,
    addReply,
    removeReply,
}


function query(id) {
    return Promise.resolve(gReplies[id]);
}

function addReply(recipient, date, subject, replyBody, emailId) {
    const reply = {
        id: utilService.makeId(),
        subject,
        date,
        replyBody,
        recipient,
    }

    if (!gReplies[emailId]) gReplies[emailId] = [];
    gReplies[emailId].push(reply);
    storageService.saveToStorage('replies', gReplies);
    return Promise.resolve(reply);
}

function removeReply(replyId, emailId) {
    const replyIdx = gReplies[emailId].findIndex(reply => reply.id === replyId)
    gReplies[emailId].splice(replyIdx, 1);
    storageService.saveToStorage('replies', gReplies);
}

const gReplies = storageService.loadFromStorage('replies') ? storageService.loadFromStorage('replies') : {
    '2e0Pwuc46GU': [
        {
            id: 123,
            subject: 'Congrats',
            date: '2021-03-04',
            replyBody: 'Purchase Confirmed',
            recipient: 'AliExpress',
        },

        {
            id: 1234,
            subject: 'Confirm Your Email',
            date: '2021-03-04',
            replyBody: 'Please confirm your email',
            recipient: 'AvoCode',
        },
    ],

    'OXeMG8wNskc': [
        {
            id: 12345,
            subject: 'Facebook - a new friend request',
            date: '2021-05-04',
            replyBody: 'Ali Abdel Tahat has sent you a friend request',
            recipient: 'Facebook',
        },

        {
            id: 123456,
            subject: 'koko Jambo',
            date: '2021-10-04',
            replyBody: 'Purchase Confirmed',
            recipient: 'PcOnline',
        },
    ]


}