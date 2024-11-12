// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/extensiontype.d.ts"

import { Constrained, Struct, Uint16, Byte } from "./dep.js";
import { Enum } from "./enum.js";

/**
 * Represents different TLS extension types. Each extension type is associated with a 16-bit value.
 */
export class ExtensionType extends Enum {
   /**
    * Used to specify the server name requested by the client.
    * @type {ExtensionType} Server Name Indication (SNI) - 0
    * @see RFC 6066
    */
   static SERVER_NAME = new ExtensionType("SERVER_NAME", 0);

   /**
    * Used to limit the size of fragments in TLS records.
    * @type {ExtensionType} Maximum Fragment Length - 1
    * @see RFC 6066
    */
   static MAX_FRAGMENT_LENGTH = new ExtensionType("MAX_FRAGMENT_LENGTH", 1);

   /**
    * Used to request certificate status information from the server.
    * @type {ExtensionType} Status Request - 5
    * @see RFC 6066
    */
   static STATUS_REQUEST = new ExtensionType("STATUS_REQUEST", 5);

   /**
    * Used to indicate the elliptic curve groups supported by the client.
    * @type {ExtensionType} Supported Groups - 10
    * @see RFC 8422; RFC 7919
    */
   static SUPPORTED_GROUPS = new ExtensionType("SUPPORTED_GROUPS", 10);

   /**
    * Used to negotiate supported signature algorithms.
    * @type {ExtensionType} Signature Algorithms - 13
    * @see RFC 8446
    */
   static SIGNATURE_ALGORITHMS = new ExtensionType("SIGNATURE_ALGORITHMS", 13);

   /**
    * Used to negotiate Secure Real-time Transport Protocol (SRTP) parameters.
    * @type {ExtensionType} Use SRTP - 14
    * @see RFC 5764
    */
   static USE_SRTP = new ExtensionType("USE_SRTP", 14);

   /**
    * Used to detect idle connections and trigger retransmissions.
    * @type {ExtensionType} Heartbeat - 15
    * @see RFC 6520
    */
   static HEARTBEAT = new ExtensionType("HEARTBEAT", 15);

   /**
    * Used to negotiate application layer protocols.
    * @type {ExtensionType} Application Layer Protocol Negotiation - 16
    * @see RFC 7301
    */
   static APPLICATION_LAYER_PROTOCOL_NEGOTIATION = new ExtensionType("APPLICATION_LAYER_PROTOCOL_NEGOTIATION", 16);

   /**
    * Used to provide a timestamp for the server's certificate.
    * @type {ExtensionType} Signed Certificate Timestamp - 18
    * @see RFC 6962
    */
   static SIGNED_CERTIFICATE_TIMESTAMP = new ExtensionType("SIGNED_CERTIFICATE_TIMESTAMP", 18);

   /**
    * Used to indicate the types of client certificates supported.
    * @type {ExtensionType} Client Certificate Type - 19
    * @see RFC 7250
    */
   static CLIENT_CERTIFICATE_TYPE = new ExtensionType("CLIENT_CERTIFICATE_TYPE", 19);

   /**
    * Used to indicate the types of server certificates supported.
    * @type {ExtensionType} Server Certificate Type - 20
    * @see RFC 7250
    */
   static SERVER_CERTIFICATE_TYPE = new ExtensionType("SERVER_CERTIFICATE_TYPE", 20);

   /**
    * Used to add padding to TLS records.
    * @type {ExtensionType} Padding - 21
    * @see RFC 7685
    */
   static PADDING = new ExtensionType("PADDING", 21);

   /**
    * Used to limit the maximum size of TLS records.
    * @type {ExtensionType} Record Size Limit - 28
    * @see RFC 8449
    */
   static RECORD_SIZE_LIMIT = new ExtensionType("RECORD_SIZE_LIMIT", 28);

   /**
    * Used to store session state for faster resumption of connections.
    * @type {ExtensionType} Session Ticket - 35
    * @see RFC 5077; RFC 8447
    */
   static SESSION_TICKET = new ExtensionType("SESSION_TICKET", 35);

   /**
    * Used to establish a secure session using pre-shared keys.
    * @type {ExtensionType} Pre-Shared Key - 41
    * @see RFC 8446
    */
   static PRE_SHARED_KEY = new ExtensionType("PRE_SHARED_KEY", 41);

   /**
    * Used to send application data before the handshake is complete.
    * @type {ExtensionType} Early Data - 42
    * @see RFC 8446
    */
   static EARLY_DATA = new ExtensionType("EARLY_DATA", 42);

   /**
    * Used to negotiate supported TLS versions.
    * @type {ExtensionType} Supported Versions - 43
    * @see RFC 8446
    */
   static SUPPORTED_VERSIONS = new ExtensionType("SUPPORTED_VERSIONS", 43);

   /**
    * Used to implement cookie-based authentication and session resumption.
    * @type {ExtensionType} Cookie - 44
    * @see RFC 8446
    */
   static COOKIE = new ExtensionType("COOKIE", 44);

   /**
    * Used to negotiate PSK key exchange modes.
    * @type {ExtensionType} PSK Key Exchange Modes - 45
    * @see RFC 8446
    */
   static PSK_KEY_EXCHANGE_MODES = new ExtensionType("PSK_KEY_EXCHANGE_MODES", 45);

   /**
    * Reserved for future use.
    * @type {ExtensionType} Reserved - 46
    * @see Used but never assigned
    */
   static RESERVED = new ExtensionType("RESERVED", 46);

   /**
    * Used to indicate the trusted certificate authorities.
    * @type {ExtensionType} Certificate Authorities - 47
    * @see RFC 8446
    */
   static CERTIFICATE_AUTHORITIES = new ExtensionType("CERTIFICATE_AUTHORITIES", 47);

   /**
    * Used to filter the certificate authorities based on OIDs.
    * @type {ExtensionType} OID Filters - 48
    * @see RFC 8446
    */
   static OID_FILTERS = new ExtensionType("OID_FILTERS", 48);

   /**
    * Used to perform additional authentication after the handshake.
    * @type {ExtensionType} Post-Handshake Auth - 49
    * @see RFC 8446
    */
   static POST_HANDSHAKE_AUTH = new ExtensionType("POST_HANDSHAKE_AUTH", 49);

   /**
    * Used to indicate the signature algorithms supported by the certificate.
    * @type {ExtensionType} Signature Algorithms Certificate - 50
    * @see RFC 8446
    */
   static SIGNATURE_ALGORITHMS_CERT = new ExtensionType("SIGNATURE_ALGORITHMS_CERT", 50);

   /**
    * Used to negotiate key exchange groups.
    * @type {ExtensionType} Key Share - 51
    * @see RFC 8446
    */
   static KEY_SHARE = new ExtensionType("KEY_SHARE", 51);

   /**
    * Used to negotiate renegotiation parameters.
    * @type {ExtensionType} Renegotiation Info - 65281
    * @see RFC 5746
    */
   static RENEGOTIATION_INFO = new ExtensionType("RENEGOTIATION_INFO", 65281);

   /**
    * check octet and return ExtensionType 
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {ExtensionType}
    */
   static parse(octet) {
      const value = octet[0] * 256 + octet[1]
      return ExtensionType.fromValue(value) ?? Error(`Unknown ${value} extension type`);
   }

   toUint16() {
      return Uint16.fromValue(+this)
   }


   /**
    * Bit 16
    *
    * @type {number}
    */
   get bit() { return 16 }
}

export class Extension extends Struct {
   extension_type
   extension_data
   constructor(extension_type, extension_data) {
      super(extension_type.toUint16(), extension_data)
      this.extension_type = extension_type;
      this.extension_data = extension_data
   }
   static from(array) {
      const arrayCopy = Uint8Array.from(array);
      const extension_type = ExtensionType.parse(arrayCopy.subarray(0, 2))
      const extension_data = arrayCopy.subarray(2);
      return new Extension(extension_type, extension_data)
   }
}

export class Cookie extends Constrained {
   cookie
   
   static from(array) {
      // Convert Cookie instance to Uint8Array
      const arrayCopy = array instanceof Cookie ? new Uint8Array(array) : array

      if (arrayCopy.length < 3) {
         throw new Error('Invalid array length')
      }

      const length = Uint16.from(arrayCopy.subarray(0, 2)).value()

      // Validate length against array size
      if (length + 2 > arrayCopy.length) {
         throw new Error('Invalid cookie length')
      }

      const cookie = arrayCopy.subarray(2, 2 + length)
      return new Cookie(cookie)
   }

   constructor(octet) {
      if (!(octet instanceof Uint8Array)) {
         throw new TypeError('Cookie data must be a Uint8Array')
      }
      super(1, 65535 /*2^16 - 1*/, octet)
      this.cookie = octet
   }
}
/* const cookie = new Cookie(new Uint8Array([1,3,4]))
const back = Cookie.from(cookie); debugger; */

export class DistinguishedName extends Constrained {

   static fromName(byte) {
      return new DistinguishedName(byte)
   }
   static from(array) {
      // Convert DistinguishedName instance to Uint8Array
      array = array instanceof DistinguishedName ? Uint8Array.from(array) : array
      const lengthInOctet = array.subarray(0, 2);
      const length = Uint16.from(lengthInOctet).value();
      return new DistinguishedName(array.subarray(2, 2 + length))
   }
   constructor(opaque) {
      super(1,65535,opaque);
   }
}
/* const distinguishedName = new DistinguishedName(new Uint8Array([1,3,4]))
const back = DistinguishedName.from(distinguishedName); debugger; */

export class CertificateAuthoritiesExtension extends Constrained {
   authorities
   static fromDistinguishedName(...distinguishedName) {
      return new CertificateAuthoritiesExtension(...distinguishedName)
   }
   static from(array) {
      // Convert CertificateAuthoritiesExtension instance to Uint8Array
      array = array instanceof CertificateAuthoritiesExtension ? Uint8Array.from(array) : array
      const lengthInOctet = array.subarray(0, 2);
      const length = Byte(lengthInOctet).value;
      const copyArray = array.subarray(2, 2+length)
      let offset = 0;
      const distinguishedNames = []
      while (true){
         const distinguishedName = DistinguishedName.from(copyArray);
         offset+=distinguishedName.length;
         distinguishedNames.push(distinguishedName);
         if(offset >= copyArray.length)break
      }
      return CertificateAuthoritiesExtension.from(...distinguishedNames)
   }
   constructor(...distinguishedName) {
      super(1,65535,...distinguishedName)
      this.authorities = distinguishedName
   }
}

// CertificateExtensionOid class represents opaque certificate_extension_oid<1..2^8-1>
export class CertificateExtensionOid extends Constrained {
   oid
   /**
    * Creates a CertificateExtensionOid instance from an OID in octets.
    * @param {Uint8Array} oidInOctet - The OID data in octet format.
    * @returns {CertificateExtensionOid}
    * @throws {TypeError} If oidInOctet is not a Uint8Array.
    */
   static fromOid(oidInOctet) {
      if (!(oidInOctet instanceof Uint8Array)) {
         throw new TypeError("Expected oidInOctet to be a Uint8Array");
      }
      return new CertificateExtensionOid(oidInOctet);
   }

   /**
    * Parses a CertificateExtensionOid from an array of octets.
    * @param {Uint8Array} array - The data array.
    * @returns {CertificateExtensionOid}
    */
   static from(array) {
      // Convert CertificateExtensionOid instance to Uint8Array
      array = array instanceof CertificateExtensionOid ? Uint8Array.from(array) : array
      const lengthInOctet = array.subarray(0, 1);
      const length = new Uint8(lengthInOctet).value();
      const oidInOctet = array.subarray(1, 1 + length);
      return new CertificateExtensionOid(oidInOctet);
   }

   /**
    * Constructs a CertificateExtensionOid instance.
    * @param {Uint8Array} lengthInOctet - The length prefix in octets.
    * @param {Uint8Array} oidInOctet - The OID data in octets.
    * @throws {RangeError} If length is out of bounds.
    */
   constructor(oidInOctet) {
      super(1,255,oidInOctet);
      this.oid = oidInOctet
   }
}

// CertificateExtensionValues class represents opaque certificate_extension_values<0..2^16-1>
export class CertificateExtensionValues extends Constrained {
   values
   /**
    * Creates a CertificateExtensionValues instance from values in octets.
    * @param {Uint8Array} valuesInOctet - The values data in octet format.
    * @returns {CertificateExtensionValues}
    * @throws {TypeError} If valuesInOctet is not a Uint8Array.
    */
   static fromValues(valuesInOctet) {
      if (!(valuesInOctet instanceof Uint8Array)) {
         throw new TypeError("Expected valuesInOctet to be a Uint8Array");
      }
      return new CertificateExtensionValues(valuesInOctet);
   }

   /**
    * Parses a CertificateExtensionValues from an array of octets.
    * @param {Uint8Array} array - The data array.
    * @returns {CertificateExtensionValues}
    */
   static from(array) {
      // Convert CertificateExtensionValues instance to Uint8Array
      array = array instanceof CertificateExtensionValues ? Uint8Array.from(array) : array
      
      const lengthInOctet = array.subarray(0, 2);
      const length = new Uint16(lengthInOctet).value();
      const valuesInOctet = array.subarray(2, 2 + length);
      return new CertificateExtensionValues(valuesInOctet);
   }

   /**
    * Constructs a CertificateExtensionValues instance.
    * @param {Uint8Array} lengthInOctet - The length prefix in octets.
    * @param {Uint8Array} valuesInOctet - The values data in octets.
    * @throws {RangeError} If length is out of bounds.
    */
   constructor(valuesInOctet) {
      super(0,65535,valuesInOctet);
      this.value = valuesInOctet
   }
}

export class OIDFilter extends Struct {
   certificate_extension_oid;
   certificate_extension_values;

   static from(array) {
      // Convert OIDFilter instance to Uint8Array
      array = array instanceof OIDFilter ? Uint8Array.from(array) : array

      const oid = CertificateExtensionOid.from(array);
      const values = CertificateExtensionValues.from(array.subarray(oid.length));
      return new OIDFilter(oid, values);
   }

   constructor(certificate_extension_oid, certificate_extension_values) {
      super(certificate_extension_oid, certificate_extension_values);
      this.certificate_extension_oid = certificate_extension_oid;
      this.certificate_extension_values = certificate_extension_values;
   }
}

export class OIDFilterExtension extends Constrained {
   static from(array){
      const lengthOf = Byte(array.subarray(0,2)).value;
      const oidfilters = []
      let offset = 2;
      while(true){
         const oidFilter = OIDFilter.from(array.subarray(2));
         oidfilters.push(oidFilter);
         offset+=oidFilter.length;
         if(offset>=lengthOf)break
      }
      return new OIDFilterExtension(...oidfilters)
   }
   constructor(...oidfilters){
      super(0,65535, ...oidfilters)
      this.oidFiltes = oidfilters
   }
}

export var PostHandshakeAuth = new Struct

// npx -p typescript tsc ./src/extensiontype.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist