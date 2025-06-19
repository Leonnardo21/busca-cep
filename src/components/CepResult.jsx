export default function CepResult({data}){
    if(!data)return null;

    return(
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm animate-fade-in">
            <h2 className="text-lg font-semibold text-emerald-700 mb-2">Resultado</h2>
            <div className="text-gray-700 space-y-1 text-sm">
                <p><strong>Rua:</strong> {data.logradouro || "-"}</p>
                <p><strong>Bairro:</strong>{data.bairro || "-"}</p>
                <p><strong>Cidade:</strong>{data.localidade}</p>
                <p><strong>Estado:</strong>{data.uf}</p>
            </div>
        </div>
    );
}