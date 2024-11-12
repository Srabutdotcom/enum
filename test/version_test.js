// Import your classes
import { Version, ProtocolVersion, Versions } from "../src/version.js";
import { assertEquals } from "jsr:@std/assert";

// Helper function to create Uint8Array from two bytes
function toUint8Array(value) {
  return new Uint8Array([value >> 8, value & 0xff]);
}

// Test the Version class
Deno.test("Version Class - Static Constants", () => {
  // Test each version constant
  const versions = [
    { instance: Version.SSL30, value: 0x0300 },
    { instance: Version.TLS10, value: 0x0301 },
    { instance: Version.TLS11, value: 0x0302 },
    { instance: Version.TLS12, value: 0x0303 },
    { instance: Version.TLS13, value: 0x0304 },
    { instance: Version.legacy, value: 0x0303 },
  ];

  versions.forEach(({ instance, value }) => {
    assertEquals(instance.value, value, `Expected ${instance} to have value ${value}`);
  });
});

Deno.test("Version Class - parse method", () => {
  const validUint8Arrays = [
    { array: toUint8Array(0x0300), expected: Version.SSL30 },
    { array: toUint8Array(0x0301), expected: Version.TLS10 },
    { array: toUint8Array(0x0302), expected: Version.TLS11 },
    { array: toUint8Array(0x0303), expected: Version.TLS12 },
    { array: toUint8Array(0x0304), expected: Version.TLS13 },
  ];

  validUint8Arrays.forEach(({ array, expected }) => {
    const result = Version.parse(array);
    assertEquals(result, expected, `Expected ${result} to be ${expected}`);
  });

});

Deno.test("ProtocolVersion Class - fromVersion method", () => {
  const protocolVersion = ProtocolVersion.fromVersion(Version.TLS12);
  assertEquals(protocolVersion instanceof ProtocolVersion, true, "Expected instance to be a ProtocolVersion");
  assertEquals(protocolVersion.version, Version.TLS12, "Expected ProtocolVersion to match Version.TLS12");
});

Deno.test("ProtocolVersion Class - from method", () => {
  const array = toUint8Array(0x0301); // TLS10
  const protocolVersion = ProtocolVersion.from(array);

  assertEquals(protocolVersion instanceof ProtocolVersion, true, "Expected instance to be a ProtocolVersion");
  assertEquals(protocolVersion.version, Version.TLS10, "Expected ProtocolVersion to match Version.TLS10");
});

Deno.test("ProtocolVersion Class - Constructor", () => {
  const protocolVersion = new ProtocolVersion(Version.TLS13);

  assertEquals(protocolVersion instanceof ProtocolVersion, true, "Expected instance to be a ProtocolVersion");
  assertEquals(protocolVersion.version, Version.TLS13, "Expected ProtocolVersion to match Version.TLS13");
});

Deno.test("Versions", () => {
  const test = Versions.fromVersions(Version.TLS12, Version.TLS13);
  const back = Versions.from(test)
  assertEquals(test, back)
})
