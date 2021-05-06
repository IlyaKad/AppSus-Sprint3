export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getFourColors
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// i know this function is shit:
function getFourColors(tag) {

    let str1 = 'ABCDEFGאבגדהו'
    let str2 = 'HIJKLMNזחטיכל'
    let str3 = 'OPQRSTמנסעפ'
    let str4 = 'UVWXYZצקרשת'

    if (str1.includes(tag)) return '#1a73e8'
    if (str2.includes(tag)) return '#ea5ca7'
    if (str3.includes(tag)) return '#66ce66'
    if (str4.includes(tag)) return '#05e6c2'

}
