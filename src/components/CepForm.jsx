import { useState } from "react";
import { Search, MapPin } from "lucide-react";

// Componente CepForm otimizado para layout lado a lado
export default function CepForm({ onSearch, loading }) {
    const [input, setInput] = useState('');

    const formatCep = (value) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 5) {
            return numbers;
        }
        return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    };

    const handleInputChange = (e) => {
        const formatted = formatCep(e.target.value);
        setInput(formatted);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || input.length < 8) return;
        await onSearch(input.replace(/\D/g, ''));
    };

    const isValidCep = input.replace(/\D/g, '').length === 8;

    return (
        <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Consulta CEP</h2>
                <p className="text-gray-600 text-sm">Digite o CEP para buscar o endereço</p>
            </div>

            {/* Form */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
                {/* Input Container */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    
                    <input 
                        type="text" 
                        placeholder="00000-000"
                        maxLength={9}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl 
                                 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 
                                 transition-all duration-200 bg-white shadow-sm
                                 placeholder:text-gray-400 placeholder:font-normal"
                    />
                    
                    {/* Validation indicator */}
                    {input && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <div className={`w-2 h-2 rounded-full ${
                                isValidCep ? 'bg-green-400' : 'bg-red-400'
                            }`} />
                        </div>
                    )}
                </div>

                {/* Helper text */}
                <p className="text-xs text-gray-500 px-1">
                    Digite apenas números. Exemplo: 01234567
                </p>

                {/* Submit Button */}
                <button 
                    type="button" 
                    onClick={handleSubmit}
                    disabled={!isValidCep || loading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 
                             hover:from-emerald-600 hover:to-emerald-700 
                             disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
                             text-white py-4 px-6 rounded-xl font-semibold text-lg
                             transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                             shadow-lg hover:shadow-xl disabled:shadow-none
                             flex items-center justify-center gap-3"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Buscando...
                        </>
                    ) : (
                        <>
                            <Search className="w-5 h-5" />
                            Buscar Endereço
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

