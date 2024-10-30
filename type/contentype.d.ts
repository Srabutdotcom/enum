/**
 * The higher-level protocol used to process the enclosed
      fragment
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-5.1
 * @export
 * @extends {Enum}
 */
export class ContentType extends Enum {
    static INVALID: ContentType;
    static CHANGE_CIPHER_SPEC: ContentType;
    static ALERT: ContentType;
    static HANDSHAKE: ContentType;
    static APPLICATION_DATA: ContentType;
    /**
     * check octet and return valid ContentType
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {ContentType }
     */
    static parse(octet: Uint8Array): ContentType;
    /**return 8 */
    get bit(): number;
}
import { Enum } from "../src/enum.js";
