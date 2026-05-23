const ADMIN_EMAIL = "jordank06759@gmail.com";

export function isAdminEmail(email) {
  if (!email) {
    return false;
  }

  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
