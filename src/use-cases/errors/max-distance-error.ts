export class MaxDistanceError extends Error {
  constructor(message?: string) {
    super(message ?? 'Max distance reached.');
  }
}
