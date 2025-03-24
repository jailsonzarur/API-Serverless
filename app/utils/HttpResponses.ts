export interface HttpResponse {
    statusCode: number;
    body: string;
}

export const httpResponse = {
success: (data: unknown, statusCode = 200): HttpResponse => ({
    statusCode,
    body: JSON.stringify({
    success: true,
    data,
    }),
}),

error: (message: string, statusCode = 500): HttpResponse => ({
    statusCode,
    body: JSON.stringify({
    success: false,
    message,
    }),
}),

badRequest: (message = 'Bad Request'): HttpResponse => ({
    statusCode: 400,
    body: JSON.stringify({
    success: false,
    message,
    }),
}),

notFound: (message = 'Not Found'): HttpResponse => ({
    statusCode: 404,
    body: JSON.stringify({
    success: false,
    message,
    }),
}),

unauthorized: (message = 'Unauthorized'): HttpResponse => ({
    statusCode: 401,
    body: JSON.stringify({
    success: false,
    message,
    }),
}),
};
  