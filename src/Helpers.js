/**
 * Format returned data from an Http call
 * @param {boolean} success Status indicating whether the http call was successful
 * @param {*} data Http data if call was successful
 * @returns Http success state and data
 */
const createHttpObj = (success, data) => ({ success, data });

export { createHttpObj };