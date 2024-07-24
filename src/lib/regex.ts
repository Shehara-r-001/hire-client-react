// Regular expression to match phone numbers with country code
// assumes the country code starts with a "+" followed by 1-3 digits, and then the phone number
export const phoneRegex = /^\+[1-9]{1}[0-9]{1,14}$/
