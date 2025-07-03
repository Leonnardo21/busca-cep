import { MapPin, Home, Building2, Map, Navigation } from "lucide-react";

export default function CepResult({ data, error }) {
     if (!data && !error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aguardando consulta</h3>
                <p className="text-gray-500">Digite um CEP válido para ver os resultados aqui</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Erro na consulta</h3>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const resultItems = [
        {
            icon: Home,
            label: "Logradouro",
            value: data.logradouro,
            fallback: "Não informado"
        },
        {
            icon: Building2,
            label: "Bairro",
            value: data.bairro,
            fallback: "Não informado"
        },
        {
            icon: Map,
            label: "Cidade",
            value: data.localidade,
            fallback: "Não informado"
        },
        {
            icon: Navigation,
            label: "Estado",
            value: data.uf,
            fallback: "Não informado"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col animate-[fadeInUp_0.5s_ease-out]">
            {/* Header do resultado */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-md">
                    <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Endereço Encontrado</h2>
                    <p className="text-sm text-gray-600">CEP: {data.cep}</p>
                </div>
            </div>

            {/* Card com os dados */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 border-b border-emerald-100">
                    <h3 className="font-semibold text-emerald-800">Informações do Endereço</h3>
                </div>
                
                <div className="p-6 space-y-4">
                    {resultItems.map((item, index) => {
                        const Icon = item.icon;
                        const hasValue = item.value && item.value.trim();
                        
                        return (
                            <div 
                                key={item.label}
                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                                    hasValue 
                                        ? 'bg-emerald-100 text-emerald-600' 
                                        : 'bg-gray-100 text-gray-400'
                                }`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {item.label}
                                    </p>
                                    <p className={`text-base font-medium ${
                                        hasValue 
                                            ? 'text-gray-900' 
                                            : 'text-gray-400 italic'
                                    }`}>
                                        {hasValue ? item.value : item.fallback}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer com botão de copiar */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                    <button 
                        onClick={() => window.navigator?.clipboard?.writeText(
                            `${data.logradouro || ''}, ${data.bairro || ''}, ${data.localidade || ''} - ${data.uf || ''}, CEP: ${data.cep || ''}`
                        )}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 
                                 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copiar Endereço
                    </button>
                </div>
            </div>
        </div>
    );
}

