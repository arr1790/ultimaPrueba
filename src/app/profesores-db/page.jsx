import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";


async function eliminarProfesor(formData) {
    'use server' //para que se ejecute en el servidor
    const id = formData.get("id")
    await connection.query("DELETE FROM profesores WHERE id = ?", [id])
    revalidatePath("/profesores-db") //para que se actualice la pagina
}


async function insertarProfesor(formData) {

    'use server' //siempre que sea un formulario
    const nombre = formData.get("nombre")
    const especialidad = formData.get("especialidad")
    const estado_civil = formData.get("estado_civil")

    await connection.query("INSERT INTO profesores (nombre, especialidad, estado_civil) VALUES (?,?,?)", [nombre, especialidad, estado_civil])
    revalidatePath("/profesores-db")
}




async function PaginaProfesores() {
    const [rows] = await connection.query("SELECT * FROM profesores");
    return (

        <>
            {/* Formulario para insertar profesores */}
            <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
                <form action={insertarProfesor} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" name="nombre" id="nombre"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">Especialidad</label>
                        <input type="text" name="especialidad" id="especialidad"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="estado_civil" className="block text-sm font-medium text-gray-700">Estado civil</label>
                        <select name="estado_civil" id="estado_civil" defaultValue={'soltero'}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            
                            <option value="soltero">Soltero/a</option>
                            <option value="casado">Casado/a</option>
                            <option value="divorciado">Divorciado/a</option>
                            <option value="viudo">Viudo/a</option>
                        </select>
                    </div>
                    <div>
                        <button
                            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Insertar
                        </button>
                    </div>
                </form>
            </div>


            {/* Lista de alumnos */}
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de base de datos profesores</h2>
                <div className="space-y-4">
                    {
                        rows.map((profesor) => (
                            <div key={profesor.id} className="p-4 bg-white shadow-sm rounded-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{profesor.nombre}</h3>
                                    <p className="text-sm text-gray-500">ID: {profesor.id}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={`/profesores-db/${profesor.id}`} className="text-blue-500 hover:underline">Ver</Link>
                                    <Link href={`/profesores-db/${profesor.id}/modificar`} className="text-yellow-500 hover:underline">Modificar</Link>
                                    <form action={eliminarProfesor} className="inline">
                                        <input type="hidden" name="id" defaultValue={profesor.id} />
                                        <button type="submit" className="text-red-500 hover:underline">Eliminar</button>
                                    </form>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default PaginaProfesores