import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";



async function eliminarAlumno(formData) {
    'use server' //para que se ejecute en el servidor
    const id = formData.get("id")
    await connection.query("DELETE FROM alumnos WHERE id = ?", [id])
    revalidatePath("/alumnos-db") //para que se actualice la pagina
}


async function insertarAlumno(formData) {

    'use server' //siempre que sea un formulario
    const nombre = formData.get("nombre")
    const localidad = formData.get("localidad")
    const fecha_nacimiento = formData.get("fecha_nacimiento")
    await connection.query("INSERT INTO alumnos (nombre, localidad, fecha_nacimiento) VALUES (?,?,?)", [nombre, localidad, fecha_nacimiento])
    revalidatePath("/alumnos-db")
}




async function PaginaAlumnos() {
    const [rows] = await connection.query("SELECT * FROM alumnos");
    return (

        <>
            {/* Formulario para insertar alumnos */}
            <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
                <form action={insertarAlumno} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" name="nombre" id="nombre"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="localidad" className="block text-sm font-medium text-gray-700">Localidad</label>
                        <input type="text" name="localidad" id="localidad"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                        <input type="date" name="fecha_nacimiento" id="fecha_nacimiento"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Alumnos de base de datos</h2>
                <div className="space-y-4">
              
              
                    {
                        rows.map((alumno) => (
                            <div key={alumno.id} className="p-4 bg-white shadow-sm rounded-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{alumno.nombre}</h3>
                                    <p className="text-sm text-gray-500">ID: {alumno.id}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={`/alumnos-db/${alumno.id}`} className="text-blue-500 hover:underline">Ver</Link>
                                    <Link href={`/alumnos-db/${alumno.id}/modificar`} className="text-yellow-500 hover:underline">Modificar</Link>
                                    <form action={eliminarAlumno}  className="inline">
                                        <input type="hidden" name="id" defaultValue={alumno.id} />
                                        <button  className="text-red-500 hover:underline">Eliminar</button>
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

export default PaginaAlumnos