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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reserva enviada:", formulario);
    setEnviado(true);
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
              ¡Gracias, {formulario.nombre}!
            </p>
            <p className="text-emerald-700 mt-2">
              Tu cita para {formulario.servicio} el {formulario.fecha} a las{" "}
              {formulario.hora} ha sido registrada.
            </p>
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
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Confirmar Reserva
            </button>
          </form>
        )}
      </section>

    </main>
  );
}