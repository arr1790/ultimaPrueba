import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";
export const dynamic = 'force-dynamic'


async function eliminarProfesor(formData) {
    'use server' //para que se ejecute en el servidor
    const id = formData.get("id")
 
    const consulta = `http://localhost:4000/profesores/${id}`
    
    await fetch(consulta, { method: 'DELETE' })
   
    revalidatePath('/profesores-api')
    
}


async function insertarProfesor(formData) {

    'use server' //siempre que sea un formulario
    const nombre = formData.get("nombre")
    const especialidad = formData.get("especialidad")
    const estado_civil = formData.get("estado_civil")

    const response = await fetch('http://localhost:4000/profesores', {
        method: 'POST',
        body: JSON.stringify({ nombre, especialidad, estado_civil }),
    })

    const data = await response.json()

    revalidatePath('/profesores-api')
}




async function PaginaProfesores() {
    const response = await fetch('http://localhost:4000/profesores' )
     
    const data = await response.json()

    console.log(data)
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de api profesores</h2>
                <div className="space-y-4">
                    {
                        data.map((profesor) => (
                            <div key={profesor.id} className="p-4 bg-white shadow-sm rounded-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{profesor.nombre}</h3>
                                    <p className="text-sm text-gray-500">ID: {profesor.id}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={`/profesores-api/${profesor.id}`} className="text-blue-500 hover:underline">Ver</Link>
                                    <Link href={`/profesores-api/${profesor.id}/modificar`} className="text-yellow-500 hover:underline">Modificar</Link>
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