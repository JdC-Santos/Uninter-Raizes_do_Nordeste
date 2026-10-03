import {
  criarPedido,
  consultarPedidos as consultarPedidosService,
  atualizarStatus as atualizarStatusService
} from '#services/pedidos.service.js';

const cadastrarPedido = async (req, res, next) => {
  try {
    const { idUsuario } = req.usuario;
    const resultado = await criarPedido(idUsuario, req.body);

    return res.status(201).json(resultado);
  } catch (error) {
    next(error);
  }
};

const consultarPedidos = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.idUsuario;
    const { canalPedido } = req.query;

    const pedidos = await consultarPedidosService(
      idUsuario,
      canalPedido
    );

    return res.status(200).json(pedidos);
  } catch (error) {
    next(error);
  }
};

const atualizarStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = await atualizarStatusService(
      id,
      status
    );

    return res.status(200).json(pedido);
  } catch (error) {
    next(error);
  }
};

export {
  cadastrarPedido,
  consultarPedidos,
  atualizarStatus
};
