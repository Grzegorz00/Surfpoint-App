const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    notEmpty: "notEmpty",
    len_2_100: "len_2_100",
    len_5_50: "len_5_50",
    isEmail: "isEmail",
    isDecimal: "isDecimal",
    formErrors: "formErrors",
    containsNine: "containsNine",
    isDate: "isDate"
}

export function getvalidationErrorKey(error) {
    return `validation.messages.${error}`
}

export default formMode;