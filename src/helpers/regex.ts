/* eslint-disable no-useless-escape */
// noinspection RegExpRedundantEscape,RegExpUnnecessaryNonCapturingGroup

// name must contain only all unicode letters and spaces
// name must not contain any numbers
// name must allow backtick (`)
// name must allow dash
// name must allow period
// name must not contain other special characters
// if name includes period than must have space after period

// ^(?![ ]) not allowed space at the beginning of the string
// (?=[\p{L}\s]) at least one letter or space at start of the string
// (?!.*(?<=(\.\S))) not allowed dot without space after it
// [\p{L}\s`'\-.\d]+ at least letters, spaces, backticks, dashes, periods, single quotes or numbers
// $ end of the string

export const nameRegex =
  /^(?![ ])(?=[\p{L}\s])(?!.*(?<=(\.\S)))[\p{L}\s`'\-.\d]+$/u;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const urlRegex =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?&]{8,}$/;
