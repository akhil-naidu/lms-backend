import { object, email, string, parse } from 'valibot';

const testEmail = (value) => {
  const EmailSchema = string([email()]);
  return parse(EmailSchema, value);
};

console.log(testEmail('akhil@gmail.com'));
