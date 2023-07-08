export class LateCheckInValidationError extends Error {
  constructor(message?: string) {
    super(
      message ??
        'The CheckIn can only be validated until 20 minutes of its creation.'
    );
  }
}
