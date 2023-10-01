/**
 * @typedef {Object} User
 * @property {string} name New username
 * @property {string} email This should be validated to be an email address
 * @property {string} password
 * @property {{public_id: string, url: string}} avatar
 * @property {string} role
 * @property {boolean} isVerified
 * @property {Course[]} courses
 * @property {(password: string) => boolean} comparePassword
 */
