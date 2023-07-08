export class MaxNumberOfCheckInsError extends Error {
  constructor(message?: string) {
    super(message ?? 'Max number of check-ins reached.');
  }
}
