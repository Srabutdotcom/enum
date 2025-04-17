/**
 * KeyUpdateRequest - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.6.3
 * Indicates whether the recipient of the KeyUpdate
      should respond with its own KeyUpdate.  If an implementation
      receives any other value, it MUST terminate the connection with an
      "illegal_parameter" alert.
 * @version __VERSION__
 */
export class KeyUpdateRequest extends Enum {
    static UPDATE_NOT_REQUESTED: KeyUpdateRequest;
    static UPDATE_REQUESTED: KeyUpdateRequest;
    /**
     * check octet and return valid KeyUpdateRequest
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {KeyUpdateRequest }
     */
    static from(octet: Uint8Array): KeyUpdateRequest;
    /**return 8 */
    get bit(): number;
    get byte(): Uint8;
}
import { Uint8 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";
