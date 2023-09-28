import { QNotifyCreateOptions } from "quasar";

// Set the minimum and maximum timeout values
const MIN_TIMEOUT = 1000; // 1 second
const MAX_TIMEOUT = 5000; // 5 seconds
const DIVISOR = 100; // Adjust for range

// Use a quadratic function to determine the timeout
const scaleFactor = (MAX_TIMEOUT - MIN_TIMEOUT) / Math.pow(DIVISOR, 2);

function calculateNotificationTimeout(message: string): number {
  const timeout = MIN_TIMEOUT + scaleFactor * message.length * message.length;
  return Math.min(MAX_TIMEOUT, Math.max(MIN_TIMEOUT, timeout));
}

export class NotifyError extends Error {
  public message: string;
  public timeout: number;

  private defaults = {
    position: "center",
    type: "warning",
    // ... add more as required
  };

  constructor(opts: string | QNotifyCreateOptions) {
    super(typeof opts == "string" ? opts : opts.message);
    this.message = super.message;
    this.timeout = calculateNotificationTimeout(this.message);

    Object.assign(this, this.defaults);
    if (typeof opts != "string") {
      Object.assign(this, opts);
    }
  }
}
