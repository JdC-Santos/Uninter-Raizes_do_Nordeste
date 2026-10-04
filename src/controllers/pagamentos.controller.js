import {
  processarPagamento as processarPagamentoService
} from '#services/pagamentos.service.js';

const processarPagamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { resultadoPagamento } = req.body;
    const { idUsuario } = req.usuario

    const pagamento = await processarPagamentoService(
      id,
      resultadoPagamento,
      idUsuario
    );

    return res.status(201).json(pagamento);
  } catch (error) {
    next(error);
  }
};

export {
  processarPagamento
};