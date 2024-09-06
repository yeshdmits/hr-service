export class AIError extends Error {
    constructor(message: string) {
        super(message)
    }
    public getMessage() {
        return super.message
    }
    public getStatus() {
        return 424
    }
}

export class InternalError extends Error {
    constructor(message: string) {
        super(message)
    }
    public getMessage() {
        return super.message
    }
    public getStatus() {
        return 500
    }
}
export class RequestError extends Error {
    constructor(message: string) {
        super(message)
    }
    public getMessage() {
        return super.message
    }
    public getStatus() {
        return 400
    }
}

export function errorHandler(err: any, res: any) {
    console.error(err.stack)
    if (err.getStatus()) {
        res.status(err.getStatus()).json({ error: err.getMessage() })
    }
    res.status(500).json({ error: err.message })
   
  }