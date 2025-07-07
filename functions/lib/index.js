"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = void 0;
const functions = __importStar(require("firebase-functions"));
const nodemailer = __importStar(require("nodemailer"));
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.login,
        pass: functions.config().gmail.pass
    }
});
exports.sendContactEmail = functions.firestore
    .document('contacts/{contactId}')
    .onCreate(async (snap, context) => {
    const data = snap.data();
    const nom = data.nom || 'Inconnu';
    const email = data.email || 'non-renseigné';
    const message = data.message || '...';
    const mailOptions = {
        from: `"MoneyTime Rev’" <${functions.config().gmail.login}>`,
        to: 'tonadresseperso@gmail.com',
        subject: `📬 Nouveau message de ${nom}`,
        html: `<p><strong>Email :</strong> ${email}</p><p>${message}</p>`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Mail envoyé');
    }
    catch (error) {
        console.error('❌ Erreur e-mail', error);
    }
});
//# sourceMappingURL=index.js.map