import { Alert, AlertDescription } from "../src/alert.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test(
   "AlertDescription",
   () => {
      const tls13AlertDescriptionValues = [
         0,   // CLOSE_NOTIFY
         10,  // UNEXPECTED_MESSAGE
         20,  // BAD_RECORD_MAC
         21,  // DECRYPTION_FAILED_RESERVED
         22,  // RECORD_OVERFLOW
         30,  // DECOMPRESSION_FAILURE_RESERVED
         40,  // HANDSHAKE_FAILURE
         41,  // NO_CERTIFICATE_RESERVED
         42,  // BAD_CERTIFICATE
         43,  // UNSUPPORTED_CERTIFICATE
         44,  // CERTIFICATE_REVOKED
         45,  // CERTIFICATE_EXPIRED
         46,  // CERTIFICATE_UNKNOWN
         47,  // ILLEGAL_PARAMETER
         48,  // UNKNOWN_CA
         49,  // ACCESS_DENIED
         50,  // DECODE_ERROR
         51,  // DECRYPT_ERROR
         60,  // EXPORT_RESTRICTION_RESERVED
         70,  // PROTOCOL_VERSION
         71,  // INSUFFICIENT_SECURITY
         80,  // INTERNAL_ERROR
         86,  // INAPPROPRIATE_FALLBACK
         90,  // USER_CANCELED
         100, // NO_RENEGOTIATION_RESERVED
         109, // MISSING_EXTENSION
         110, // UNSUPPORTED_EXTENSION
         111, // CERTIFICATE_UNOBTAINABLE_RESERVED
         112, // UNRECOGNIZED_NAME
         113, // BAD_CERTIFICATE_STATUS_RESPONSE
         114, // BAD_CERTIFICATE_HASH_VALUE_RESERVED
         115, // UNKNOWN_PSK_IDENTITY
         116, // CERTIFICATE_REQUIRED
         120  // NO_APPLICATION_PROTOCOL
      ];

      assertEquals(AlertDescription.values().map(e => e.value).sort((a, b) => a - b), tls13AlertDescriptionValues);
   }
)

Deno.test("Alert creation from AlertDescription", () => {

   const alert = AlertDescription.BAD_RECORD_MAC.alert();
   const back = Alert.from(alert)
   assertEquals(+alert.level, 2);
   assertEquals(+alert.description, 20);
   assertEquals(alert, back);
});

