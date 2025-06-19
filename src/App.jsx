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
    try{
      const result = await buscaCep(cep);
      setData(result);
    }catch(err){
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-emerald-600 mb-6 text-center">Buscador de CEP</h1>
        <CepForm onSearch={handleSearch}/>

        {loading && <p className="text-sm text-gray-500 mt-4">Buscando...</p>}
        {erro && <p className="text-red-500 font-semibold mt-4">{erro}</p>}
        <CepResult data={data}/>
      </div>
    </main>
  )
}

export default App
