import * as servicoClientes from '#services/clientes.service.js';

const cadastrarCliente = async (req, res, next) => {
  try {
    const cliente = req.body;
    const idCliente = await servicoClientes.cadastrarCliente(cliente);

    const resposta = {
      id: idCliente,
      message: 'Cliente cadastrado com sucesso!'
    };

    return res.status(201).json(resposta);
  } catch (error) {
    next(error);
  }
};

export {
  cadastrarCliente
};
