export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(err: unknown) {
    const anyErr = err as any;
    super(anyErr?.message ?? "Unknown error");
    this.name = "ApiError";
    this.status = anyErr?.response?.status ?? anyErr?.status;
    this.data = anyErr?.response?.data ?? anyErr?.data;
  }
}
