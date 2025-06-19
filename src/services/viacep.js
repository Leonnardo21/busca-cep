export async function buscaCep(cep) {
  if (typeof cep !== "string" || !cep.trim()) {
    throw new Error("Informe um CEP válido.");
  }

  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    throw new Error("Digite um CEP válido com 8 números.");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return data;
}
