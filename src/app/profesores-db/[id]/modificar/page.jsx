import connection from "@/lib/mysql";
import { redirect } from "next/navigation";

async function modificarProfesor(formData) {
    'use server'
    const id = formData.get("id")
    const nombre = formData.get("nombre")
    const especialidad = formData.get("especialidad")
    const estado_civil = formData.get("estado_civil")
   ("UPDATE profesores SET nombre = ?, especialidad = ?, estado_civil = ?, WHERE id = ?", [nombre,especialidad, estado_civil, id])
    redirect(`/profesores-db/${id}`)
}


async function PageModificar({params}) {
    const { id } = await params;
    const [rows] = await connection.query("SELECT * FROM profesores WHERE id = ?", [id]);
    const profesor = rows[0];
    return (
        <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
        <form action={modificarProfesor} className="space-y-4">
        
            <input type="hidden" name="id" defaultValue={profesor.id} />

            <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={profesor.nombre}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">Especialidad</label>
                <input
                    type="text"
                    name="especialidad"
                    defaultValue={profesor.especialidad}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="estado_civil" className="block text-sm font-medium text-gray-700">Estado Civil</label>
                <select
                    name="estado_civil"
                    id="estado_civil"
                    defaultValue={profesor.estado_civil}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                    <option defaultValue disabled>Selecciona una opción</option>
                    <option defaultValue="soltero">Soltero/a</option>
                    <option defaultValue="casado">Casado/a</option>
                    <option defaultValue="divorciado">Divorciado/a</option>
                    <option defaultValue="viudo">Viudo/a</option>
                </select>
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Modificar
                </button>
            </div>
        </form>
    </div>
    
    );
}

export default PageModificar;