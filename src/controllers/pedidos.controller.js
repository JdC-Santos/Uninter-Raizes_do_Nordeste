import { criarPedido } from '#services/pedidos.service.js';

const cadastrarPedido = async (req, res) => {
  try {
    const { idUsuario } = req.usuario;
    const resultado = await criarPedido(idUsuario, req.body);

    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

export {
  cadastrarPedido
};
