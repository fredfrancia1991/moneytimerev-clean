export const sendDiagnosticEmail = functions.firestore
  .document('diagnostics/{id}')
  .onWrite(async (change) => {
    const before = change.before.exists ? change.before.data() : null
    const after = change.after.exists ? change.after.data() : null

    if (!after || !after.mailRequested || (before && before.mailRequested === after.mailRequested)) {
      return null
    }

    const prenom = after.prenom || ''
    const email = after.email || ''
    const resume = after.resume || ''

    const mailOptions = {
      from: `"MoneyTime Rev’" <${functions.config().gmail.login}>`,
      to: email,
      subject: 'Votre mini bilan MoneyTime Rev’',
      html: `<p>Bonjour ${prenom},</p><p>${resume.replace(/\n/g, '<br>')}</p><p><a href="https://calendly.com/votre-lien">Prendre un RDV gratuit de 30 minutes</a></p>`
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('✅ Diagnostic email sent')
    } catch (error) {
      console.error('❌ Erreur e-mail diagnostic', error)
    }
  })