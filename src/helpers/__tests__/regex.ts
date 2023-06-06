import { emailRegex, nameRegex, passwordRegex, urlRegex } from '../regex';

describe('regex', () => {
  test('nameRegex', () => {
    expect(nameRegex.test('Juan Pablo')).toBe(true);
    expect(nameRegex.test('Fernández de Calderón')).toBe(true);
    expect(nameRegex.test('Карпенко - Карий')).toBe(true);
    expect(nameRegex.test('Mr. William Smith')).toBe(true);
    expect(nameRegex.test('Демян')).toBe(true);
    expect(nameRegex.test('first name2')).toBe(true);
    expect(nameRegex.test('first$name2')).toBe(false);
    expect(nameRegex.test(' first$name2')).toBe(false);
    expect(nameRegex.test(' first name')).toBe(false);
    expect(nameRegex.test('1firstname')).toBe(false);
    expect(nameRegex.test('first.name')).toBe(false);
    expect(nameRegex.test('first%name')).toBe(false);
    expect(nameRegex.test('.first%name')).toBe(false);
  });

  test('emailRegex', () => {
    expect(emailRegex.test('test@')).toBe(false);
    expect(emailRegex.test('test@test')).toBe(false);
    expect(emailRegex.test('test@test.')).toBe(false);
    expect(emailRegex.test('test@test@test.uq')).toBe(false);
    expect(emailRegex.test('test@test.uq')).toBe(true);
    expect(emailRegex.test('te.st@test.uq')).toBe(true);
  });

  test('passwordRegex', () => {
    expect(passwordRegex.test('12345')).toBe(false);
    expect(passwordRegex.test('qwerqwe')).toBe(false);
    expect(passwordRegex.test('4ewr@')).toBe(false);
    expect(passwordRegex.test('fwefW')).toBe(false);
    expect(passwordRegex.test('Ltpuzk36!')).toBe(true);
  });

  test('urlRegex', () => {
    expect(urlRegex.test('http://www.google.com')).toBe(true);
    expect(urlRegex.test('https://www.google.com')).toBe(true);
    expect(urlRegex.test('www.google.com')).toBe(true);
    expect(urlRegex.test('google.com')).toBe(false);
  });
});
