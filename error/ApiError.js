class ApiError extends Error {
    constructor(status, message, errors) {
        super();
        this.status = status
        this.message = message
        this.errors = errors
    }

    static UnautorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static badRequest(message, errors = []) {
        return new ApiError(404, message, errors)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError