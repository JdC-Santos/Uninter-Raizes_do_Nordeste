import { cadastrarCliente} from '#services/clients.service.js'

const cadastrar = async (req, res) => {
  try {
    const cliente = req.body;

    const idCliente = await cadastrarCliente(cliente);

    const response = {
      id: idCliente,
      message: 'Cliente cadastrado com sucesso!'
    }

    return res.status(201).json(response);

  } catch(error) {
    const responseComError = {
      error: error.message
    }

    return res.status(400).json(responseComError)
  }
}

export  {
  cadastrar
}