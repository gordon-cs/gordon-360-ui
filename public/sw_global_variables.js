/**
 * ES-Lint warning is disabled because these variables are being used. They're used in the other
 * service worker scripts
 */
/* eslint-disable no-unused-vars */

// Cache version
const cacheVersion = 'cache v1.3';

// Console log decorations
const successfulLog = ['color: #17b534', 'margin-left: 20px'].join(';');
const successfulEmoji = `\u{2705}`;
const errorLog = ['color: #ff0b23', 'margin-left: 20px'].join(';');
const errorEmoji = `\u{1F6AB}`;
const warningLog = ['color: #edc02c', 'margin-left: 24px'].join(';');
const warningEmoji = `\u{26A0}`;
const cacheEmoji = `\u{1F4C1}`;
const cacheLog = ['margin-left: 24px'].join(';');
const statusLog = ['color: #e67e22', 'margin-left: 24px'].join(';');

// Determines if the service worker should do any console logs
const showDeveloperConsoleLog = false;
