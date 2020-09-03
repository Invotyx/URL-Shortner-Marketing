//custom.request.d.ts
declare namespace Express {
  export interface Request {
    userId?: number,
    user?: any
  }
}