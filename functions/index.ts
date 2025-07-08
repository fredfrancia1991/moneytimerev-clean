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
      to: 'tonadresse@tonmail.fr', // 🔁 Mets ici ton email réel
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

// Envoi du mini bilan lorsque 'mailRequested' passe a true
export const sendDiagnosticEmail = functions.firestore
  .document('diagnostics/{id}')
  .onCreate(async (snap) => {
    const data = snap.data()

    if (!data.mailRequested) {
      return null
    }

    const prenom = data.prenom || ''
    const email = data.email || ''
    const resume = data.resume || ''

    const mailOptions = {
      from: `"MoneyTime Rev’" <${functions.config().gmail.login}>`,
      to: email,
      subject: 'Votre mini bilan MoneyTime Rev’',
      html: `<p>Bonjour ${prenom},</p><p>${resume.replace(/\n/g, '<br>')}</p><p><a href="https://calendly.com/votre-lien">Prendre un RDV gratuit de 30 minutes</a></p>`
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('Diagnostic email sent')
    } catch (error) {
      console.error('Erreur e-mail diagnostic', error)
    }
  })
