import  connection  from "@/lib/mysql";






async function PaginaProfesor({params,searchParams}) {
    const {id} = await params;
   const [[profesor]] = await connection.query("SELECT * FROM profesores WHERE id = ?",[id]);
 

    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Información del Profesor</h1>
            <div className="space-y-2">
            <p className="text-gray-600">
                    <span className="font-medium text-gray-800">ID:</span> {profesor.id}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Nombre:</span> {profesor.nombre}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Especialidad:</span> {profesor.especialidad}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Estado Civil:</span> {profesor.estado_civil}
                </p>
            </div>
        </div>
    </div>
     );
}

export default PaginaProfesor ;