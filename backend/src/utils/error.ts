const errorMessages = {
  400: 'Dados inválidos',
  401: 'Não autorizado',
  403: 'Acesso negado',
  404: 'Não encontrado',
  409: 'Conflito',
  500: 'Erro interno',
} as { [key: number]: string };

export default class HttpError extends Error {
  statusCode: number;
  message: string;
  details?: any;

  constructor(statusCode: number = 500, message?: string, details?: any) {
    super(message ?? errorMessages[statusCode]);
    this.statusCode = statusCode;
    this.message = message ?? errorMessages[statusCode];
    if (details) this.details = details;
  }

  get name() {
    return this.constructor.name;
  }
}
