import axios from 'axios';

export const sendMail = async(name, email, phone) => {
  try {
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      user_id: 'user_YWHRL5p0UldXqQkZxq8QE',
      service_id: 'service_gxkb4se',
      template_id: 'template_gtqt9vr',
      template_params: {
        name,
        email,
        phone,
      }
    });

    const response = await axios.post('https://aulao-get-lorena-brandao.vercel.app/api/user', {
      name,
      email,
      phone,
    });

    return response;
  } catch (err) {
    console.error(err);
    return ({ error: 'Falha ao enviar o email' })
  }
}

export function validateEmail(email) {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (email?.length === undefined) return false;
  return !reg.test(email);
}

export function validateName(validName) {
  if (validName?.length < 3) {
    return true;
  } else {
    return false;
  }
}
