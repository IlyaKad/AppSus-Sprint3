import { utilService } from '../../../app-services/util-service.js'
import { storageService } from '../../../app-services/storage-service.js'

export const replyService = {
    query,
    addReply,
    removeReply,
}

var gReplies;

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

    if (!gReplies[emailId]) gReplies[emailId] = []
    gReplies[emailId].push(reply);
    storageService.saveToStorage('replies', gReplies);
    return Promise.resolve(reply);
}

function removeReply(replyId, emailId) {
    const replyIdx = gReplies[emailId].findIndex(reply => reply.id === replyId)
    gReplies[emailId].splice(replyIdx, 1);
    storageService.saveToStorage('replies', gReplies);
}

//not sure about this one
// gReplies = storageService.loadFromStorage('replies') ? storageService.loadFromStorage('replies')
//     : [
//         {
//             id: utilService.makeId(),
//             subject: 'Subject1',
//             date: '2021-05-04',
//             replyBody: 'text text 1',
//             recipient: 'replier1'
//         },
//     ]

