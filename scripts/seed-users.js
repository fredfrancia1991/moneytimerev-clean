const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const auth = admin.auth();
const db = admin.firestore();

async function run() {
  const users = [
    {
      email: 'client@example.com',
      password: 'azerty',
      prenom: 'Sarah',
      nom: '',
      role: 'client',
      plan: 'basic',
      score: 0,
    },
    {
      email: 'admin@example.com',
      password: 'azerty',
      prenom: 'Fred',
      nom: '',
      role: 'admin',
      plan: 'basic',
      score: 0,
    },
  ];

  for (const u of users) {
    try {
      const userRecord = await auth.createUser({
        email: u.email,
        password: u.password,
        displayName: `${u.prenom} ${u.nom}`.trim(),
      });

      await db
        .collection('utilisateurs')
        .doc(userRecord.uid)
        .set({
          prenom: u.prenom,
          nom: u.nom,
          email: u.email,
          role: u.role,
          plan: u.plan,
          score: u.score,
        });

      console.log(`Created ${u.email} (${userRecord.uid})`);
    } catch (err) {
      console.error(`Error creating ${u.email}:`, err.message);
    }
  }
}

run().then(() => process.exit());
