export function validateCredentials(email, password, username, isRegistration) {
  if (!email.trim() || !password.trim()) {
    return "Заполните email и пароль"
  }

  if (isRegistration && !username.trim()) {
    return "Заполните имя пользователя"
  }

  return null
}