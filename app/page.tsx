  "use client";

  import { useState } from "react";
  
  const servicios = [
  {
    nombre: "Masaje Relajante",
    descripcion: "60 minutos de relajación profunda con aceites esenciales",
    precio: "Q350",
  },
  {
    nombre: "Facial Hidratante",
    descripcion: "Limpieza profunda e hidratación para todo tipo de piel",
    precio: "Q280",
  },
  {
    nombre: "Piedras Calientes",
    descripcion: "Terapia con piedras volcánicas para aliviar tensión muscular",
    precio: "Q400",
  },
];

export default function Home() {
 

  const [formulario, setFormulario] = useState({
    nombre: "",
    servicio: "",
    fecha: "",
    hora: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ultimaReserva, setUltimaReserva] = useState({
    nombre: "",
    servicio: "",
    fecha: "",
    hora: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setEnviando(true);

  try {
    const res = await fetch("/api/reservar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulario),
    });

    if (!res.ok) throw new Error("Error al enviar la reserva");

    setEnviado(true);
    setFormulario({ nombre: "", servicio: "", fecha: "", hora: "" });
 
  } catch (error) {
    console.error(error);
    alert("Hubo un problema al enviar tu reserva. Intenta de nuevo.");
  } finally {
    setEnviando(false);
  }
};


  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-emerald-900 mb-4">
          Spa Serenidad
        </h1>
        <p className="text-xl text-emerald-700 mb-8">
          Tu momento de paz te espera
        </p>
        
        <a  href="#reservar"
          className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition"
        >
          Reserva tu cita
        </a>
      </section>

      {/* Servicios Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-emerald-900 mb-10">
          Nuestros Servicios
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {servicios.map((servicio) => (
            <div
              key={servicio.nombre}
              className="border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                {servicio.nombre}
              </h3>
              <p className="text-gray-600 mb-4">{servicio.descripcion}</p>
              <p className="text-emerald-600 font-bold text-lg">{servicio.precio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulario de Reserva */}
      <section id="reservar" className="py-16 px-6 max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-emerald-900 mb-8">
          Reserva tu Cita
        </h2>

        {enviado ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <p className="text-emerald-800 font-semibold text-lg">
              ¡Gracias, {ultimaReserva.nombre}!
            </p>
            <p className="text-emerald-700 mt-2">
              Tu cita para {ultimaReserva.servicio} el {ultimaReserva.fecha} a las{" "}
              {ultimaReserva.hora} ha sido registrada.
            </p>
            <button
              onClick={() => setEnviado(false)}
              className="mt-6 text-emerald-700 font-semibold underline hover:text-emerald-900"
            >
              Hacer otra reserva
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Servicio
              </label>
              <select
                name="servicio"
                value={formulario.servicio}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((s) => (
                  <option key={s.nombre} value={s.nombre}>
                    {s.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formulario.fecha}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora
              </label>
              <input
                type="time"
                name="hora"
                value={formulario.hora}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {enviando ? "Enviando..." : "Confirmar Reserva"}
            </button>
          </form>
        )}
      </section>

    </main>
  );
}