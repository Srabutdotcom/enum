/**
 * Supported groups - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7.
 */
export class CertificateType extends Enum {
    static X509: CertificateType;
    static RAWPUBLICKEY: CertificateType;
    /**
     * check octet and return valid CertificateType
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {CertificateType }
     */
    static parse(octet: Uint8Array): CertificateType;
    /**return 8 */
    get bit(): number;
}
import { Enum } from "../src/enum.js";
