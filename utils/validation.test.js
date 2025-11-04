import { describe, it, expect } from 'vitest'
import { validateCredentials } from '../utils/validation'

describe('validateCredentials', () => {
  it('возвращает ошибку, если email пустой', () => {
    const result = validateCredentials('', '123', '', false)
    expect(result).toBe('Заполните email и пароль')
  })

  it('возвращает ошибку, если пароль пустой', () => {
    const result = validateCredentials('user@mail.com', '', '', false)
    expect(result).toBe('Заполните email и пароль')
  })

  it('возвращает ошибку, если регистрация и имя пользователя пустое', () => {
    const result = validateCredentials('user@mail.com', '123', '', true)
    expect(result).toBe('Заполните имя пользователя')
  })

  it('возвращает null, если все поля заполнены (регистрация)', () => {
    const result = validateCredentials('user@mail.com', '123', 'Alex', true)
    expect(result).toBeNull()
  })

  it('возвращает null, если все поля заполнены (логин)', () => {
    const result = validateCredentials('user@mail.com', '123', '', false)
    expect(result).toBeNull()
  })

  it('игнорирует пробелы вокруг значений', () => {
    const result = validateCredentials('  user@mail.com  ', '  123  ', '  Alex  ', true)
    expect(result).toBeNull()
  })
})