import { uid } from 'uid/secure';
import { v4 } from 'uuid';

export const createID = (length = 16) => uid(length);
export const uuid = () => v4();
