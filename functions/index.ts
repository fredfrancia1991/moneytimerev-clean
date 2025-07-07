import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'

// Création du transporteur SMTP Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.login,
    pass: functions.config().gmail.pass
  }
})

// Fonction déclenchée à chaque ajout de document dans 'contacts'
export const sendContactEmail = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap) => {
    const data = snap.data()
    const nom = data.nom || 'Inconnu'
    const email = data.email || 'Non renseigné'
    const message = data.message || '...'

    const mailOptions = {
      from: `"MoneyTime Rev’" <${functions.config().gmail.login}>`,
      to: functions.config().gmail.to,
      subject: `📬 Nouveau message de ${nom}`,
      html: `<p><strong>Email :</strong> ${email}</p><p>${message}</p>`
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('✅ Mail envoyé')
    } catch (error) {
      console.error('❌ Erreur e-mail', error)
    }
  })
