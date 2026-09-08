import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { nombre, servicio, fecha, hora } = await request.json();

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "matalejandro18@gmail.com",
      subject: `Nueva reserva: ${nombre}`,
      html: `
        <h2>Nueva reserva recibida</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora:</strong> ${hora}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}