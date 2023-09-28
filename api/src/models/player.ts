/**
 * Placeholder R for base record
 * To be replace with each game base type with id, name, icon, stages, etc.
 */
import { R } from "./common";

/** Measure(s) of Experience over time */
export interface PlayerExperience extends R {
  /** total earned over time */
  earned: number;
  /** target to reach next stage */
  target?: number;
  /** current stage */
  stage?: number;
  /** timestamp at which time this progress measure expires */
  expires?: number;
}

export interface Player {
  /** Profile ID (should be the firestore document ID) */
  readonly id: string;
  /** User ID from access token */
  uid: string;
  /** location/language string */
  locale: string;
  /** in game name/handle */
  handle: string;
  /** in game avatar */
  avatar: string;
  /** in game group */
  group?: string;
  /** current level/rank */
  level: number;
  /** record of Experience */
  experience: PlayerExperience[];
}
