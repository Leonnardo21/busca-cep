import { useState } from "react";

export default function CepForm({ onSearch }){
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSearch(input);
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Digite o CEP"
                maxLength={9}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-esmerald-400" />
            <button type="submit" className="w-full bg-esmerald-500 hover:bg-esmerald-600 text-white py-3 rounded font-medium">Buscar</button>
        </form>
    );
}