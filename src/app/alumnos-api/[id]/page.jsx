import  connection  from "@/lib/mysql";
import menu     from "@/components/menu";
import header   from "@/components/header";






async function PaginaAlumno({ params }) {
    const { id } = await params; // Obtenemos el ID del estudiante desde los parámetros.

    // Realizamos la solicitud para obtener los datos del estudiante.
    const response = await fetch(`http://localhost:4000/alumnos/${id}`);
  

    const alumno = await response.json(); // Suponemos que `response.json()` devuelve un objeto con los datos del alumno.

    return (
        <div>
            <header />
     
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Información del Alumno</h1>
            <div className="space-y-2">
                <p className="text-gray-600">
                    <span className="font-medium text-gray-800">ID:</span> {alumno.id}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Nombre:</span> {alumno.nombre}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Localidad:</span> {alumno.localidad}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Fecha de nacimiento:</span>{" "}
                    {new Date(alumno.fecha_nacimiento).toLocaleDateString()}
                </p>
            </div>
        </div>
    </div>
    </div>
    );
}

export default PaginaAlumno;
