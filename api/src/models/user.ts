export interface User {
  /** Profile ID (should be the firestore document ID) */
  readonly id: string;
  /** User ID from access token */
  uid: string;
  /** location/language string */
  locale: string;
  /** in app name/handle */
  handle: string;
  /** in app avatar */
  avatar: string;
}
