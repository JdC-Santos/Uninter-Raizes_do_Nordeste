import {
  processarPagamento as processarPagamentoService
} from '#services/pagamentos.service.js';

const processarPagamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { resultadoPagamento } = req.body;

    const pagamento = await processarPagamentoService(
      id,
      resultadoPagamento
    );

    return res.status(201).json(pagamento);
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

export {
  processarPagamento
};