function validateEmail(email:any) {
  const re = /^\S+@\S+\.\S+$/;
  if (!re.test(String(email))) throw new Error("Invalid email address");
}
function validatePassword(password:any) {
  if (!password || password.length < 6)
    throw new Error("Password must be at least 6 characters long");
}
export {validateEmail, validatePassword}