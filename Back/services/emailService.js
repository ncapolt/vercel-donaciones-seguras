import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transporter para Gmail
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'tu-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'tu-app-password'
    }
  });
};

// Enviar email de verificación
export const enviarEmailVerificacion = async (email, codigo) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'tu-email@gmail.com',
      to: email,
      subject: '🔐 Código de Verificación - Donaciones Seguras',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #200030 0%, #1A002A 100%); padding: 30px; border-radius: 15px; text-align: center;">
            <h1 style="color: #FFFFFF; margin-bottom: 20px;">🔐 Verificación de Email</h1>
            <p style="color: #FFFFFF; font-size: 16px; margin-bottom: 30px;">
              Hola! Gracias por registrarte en Donaciones Seguras.
            </p>
            <p style="color: #FFFFFF; font-size: 16px; margin-bottom: 20px;">
              Tu código de verificación es:
            </p>
            <div style="background-color: #502070; border: 3px solid #FFD700; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <span style="color: #FFD700; font-size: 32px; font-weight: bold; letter-spacing: 5px;">${codigo}</span>
            </div>
            <p style="color: #FFFFFF; font-size: 14px; margin-top: 20px;">
              Este código expira en 15 minutos.
            </p>
            <p style="color: #A080B0; font-size: 12px; margin-top: 30px;">
              Si no solicitaste este código, puedes ignorar este email.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>Donaciones Seguras - Sistema de Verificación</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`📧 Email enviado exitosamente a ${email}`);
    console.log(`📧 Message ID: ${result.messageId}`);
    
    return { success: true, message: 'Email enviado exitosamente', messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw new Error(`Error enviando email: ${error.message}`);
  }
};

// Enviar email de bienvenida después de verificación
export const enviarEmailBienvenida = async (email, nombre) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'tu-email@gmail.com',
      to: email,
      subject: '🎉 ¡Bienvenido a Donaciones Seguras!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #200030 0%, #1A002A 100%); padding: 30px; border-radius: 15px; text-align: center;">
            <h1 style="color: #FFFFFF; margin-bottom: 20px;">🎉 ¡Bienvenido ${nombre}!</h1>
            <p style="color: #FFFFFF; font-size: 16px; margin-bottom: 20px;">
              Tu email ha sido verificado exitosamente.
            </p>
            <p style="color: #FFFFFF; font-size: 16px; margin-bottom: 20px;">
              Ahora puedes acceder a todas las funcionalidades de Donaciones Seguras.
            </p>
            <div style="background-color: #502070; border: 3px solid #FFD700; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <p style="color: #FFD700; font-size: 18px; margin: 0;">
                ✅ Cuenta verificada y lista para usar
              </p>
            </div>
            <p style="color: #FFFFFF; font-size: 14px; margin-top: 20px;">
              Gracias por unirte a nuestra comunidad de ayuda solidaria.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>Donaciones Seguras - Comunidad Solidaria</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`📧 Email de bienvenida enviado a ${email}`);
    
    return { success: true, message: 'Email de bienvenida enviado exitosamente', messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error enviando email de bienvenida:', error);
    throw new Error(`Error enviando email de bienvenida: ${error.message}`);
  }
};

// Función para probar la configuración de email
export const probarConfiguracionEmail = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Configuración de email verificada correctamente');
    return { success: true, message: 'Configuración de email OK' };
  } catch (error) {
    console.error('❌ Error en configuración de email:', error);
    return { success: false, message: error.message };
  }
};






