import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.log('Newsletter signup (mock):', email);
      return NextResponse.json({ success: true });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Sentinelle Pulse <newsletter@sentinellepulse.com>',
        to: email,
        subject: 'Confirmez votre inscription à la Newsletter',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #C41E3A; margin: 0;">SENTINELLE PULSE</h1>
              </div>
              <h2 style="color: #1A1A2E;">Bienvenue sur Sentinelle Pulse !</h2>
              <p>Merci de confirmer votre inscription en cliquant sur le bouton ci-dessous :</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://sentinellepulse.com'}/api/newsletter/confirm?email=${encodeURIComponent(email)}" 
                   style="background: #C41E3A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                  Confirmer mon inscription
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">
                Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet email.
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="color: #999; font-size: 12px; text-align: center;">
                © 2026 Sentinelle Pulse. Tous droits réservés.
              </p>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend error:', errorData);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
