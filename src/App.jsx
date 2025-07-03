import { useState } from "react"
import CepForm from "./components/CepForm"
import CepResult from "./components/CepResult"
import { buscaCep } from "./services/viacep"

function App() {
  const [data, setData] = useState(null);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (cep) => {
        if (!cep) return;
        setLoading(true);
        setErro("");
        setData(null);
        
        try {
            const result = await buscaCep(cep);
            setData(result);
        } catch (err) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl min-h-[600px] overflow-hidden">
                {/* Header principal */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
                    <h1 className="text-4xl font-bold text-white text-center">Buscador de CEP</h1>
                    <p className="text-emerald-100 text-center mt-2">Encontre qualquer endereço do Brasil</p>
                </div>
                
                {/* Layout lado a lado */}
                <div className="grid lg:grid-cols-2 min-h-[500px]">
                    {/* Lado esquerdo - Formulário */}
                    <div className="p-8 border-r border-gray-100 bg-gray-50">
                        <CepForm onSearch={handleSearch} loading={loading} />
                    </div>
                    
                    {/* Lado direito - Resultado */}
                    <div className="p-8 bg-white">
                        <CepResult data={data} error={erro} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App
