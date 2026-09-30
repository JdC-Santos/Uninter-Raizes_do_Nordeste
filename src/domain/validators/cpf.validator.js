const limparCPF = (cpf) => {
  return String(cpf).replace(/\D/g, '');
};

const validarCPF = (cpf) => {
  cpf = limparCPF(cpf);

  if (cpf.length !== 11) return false;

  // evita CPFs tipo 000.000.000-00, 111.111.111-11 etc...
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const calcularDigito = (quantidade) => {
    let soma = 0;

    for (let i = 0; i < quantidade; i++) {
      soma += Number(cpf[i]) * (quantidade + 1 - i);
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(9);
  if (primeiroDigito !== Number(cpf[9])) return false;

  const segundoDigito = calcularDigito(10);
  if (segundoDigito !== Number(cpf[10])) return false;

  return true;
};

export { limparCPF, validarCPF };