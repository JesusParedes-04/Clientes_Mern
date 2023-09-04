import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {

  const { email, name, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  //Información del email

  const info = await transport.sendMail({


    from: 'Mailtrap',
    to: email,
    subject: 'Confirma tu cuenta',
    text: 'Correo de confirmación de cuenta',
    html: `<p>Hola: ${name}, tu cuenta está casi lista </p>
    <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar Cuenta </a>`
  })

}



export const passwordForget = async (datos) => {

  const { email, name, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  //Información del email

  const info = await transport.sendMail({


    from: 'Mailtrap',
    to: email,
    subject: 'Restablecer Password',
    text: 'Reestablecer Password',
    html: `<p>Hola: ${name}, has solicitado reestablecer password </p>
    <a href="${process.env.FRONTEND_URL}/password-recover/${token}">Reestablecer Password </a>`
  })

}



