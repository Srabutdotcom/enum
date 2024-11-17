# JavaScript Enum Implementation

A robust enumeration implementation for JavaScript/TypeScript that provides Java-style enums with additional features for TLS 1.3 protocol definitions.

## Features

- Type-safe enumerations
- Frozen constants to prevent modifications
- Value and name lookups
- Ordinal-based comparison
- JSON serialization
- Built-in TLS 1.3 protocol enumerations

## Installation

```bash
deno add 'jsr:@tls/enum';
```

## Basic Usage

```javascript
import { Enum } from 'jsr:@tls/enum';

class Color extends Enum {
  static RED = new Color('RED', '#FF0000');
  static GREEN = new Color('GREEN', '#00FF00');
  static BLUE = new Color('BLUE', '#0000FF');

  static {
    this.freeze(); // Prevent further modifications
  }
}

// Usage examples
console.log(Color.RED.value);          // '#FF0000'
console.log(Color.RED.name);           // 'RED'
console.log(Color.RED.ordinal);        // 0
console.log(Color.values());           // [Color.RED, Color.GREEN, Color.BLUE]
console.log(Color.valueOf('GREEN'));    // Color.GREEN
console.log(Color.fromValue('#0000FF')); // Color.BLUE
```

## TLS 1.3 Enumerations

### SignatureScheme

```javascript
import { SignatureScheme } from 'jsr:@tls/enum';

// Access signature schemes
console.log(SignatureScheme.RSA_PKCS1_SHA256.value);        // 0x0401
console.log(SignatureScheme.ED25519.name);                  // 'ED25519'
console.log(SignatureScheme.FromValue(0x0403));      // 'ECDSA_SECP256R1_SHA256'
console.log(SignatureScheme.Values());                // [0x0401, 0x0501, ...]
```

### ExtensionType

```javascript
import { ExtensionType } from 'jsr:@tls/enum';

// Access extension types
console.log(ExtensionType.SERVER_NAME.value);              // 0
console.log(ExtensionType.SUPPORTED_VERSIONS.name);        // 'SUPPORTED_VERSIONS'
console.log(ExtensionType.fromValue(43));                  // ExtensionType.SUPPORTED_VERSIONS
```

## API Reference

### Enum Base Class

#### Static Methods

- `size`: Get the number of enum constants
- `values()`: Get all enum constants
- `names()`: Get all enum constant names
- `valueOf(name)`: Get enum constant by name
- `fromValue(value)`: Get enum constant by value
- `freeze()`: Prevent further modifications
- `isFrozen()`: Check if enum is frozen

#### Instance Properties

- `name`: The name of the enum constant
- `value`: The value associated with the enum constant
- `ordinal`: The position of the constant in the enum

#### Instance Methods

- `toString()`: Get string representation
- `toJSON()`: Get JSON representation
- `equals(other)`: Compare with another enum constant
- `compareTo(other)`: Compare ordinal positions
- `[Symbol.toPrimitive](hint)`: Convert to primitive type

## Examples

### Creating Custom Enums

```javascript
class HttpStatus extends Enum {
  static OK = new HttpStatus('OK', 200);
  static NOT_FOUND = new HttpStatus('NOT_FOUND', 404);
  static INTERNAL_ERROR = new HttpStatus('INTERNAL_ERROR', 500);

  static {
    this.freeze();
  }
}

// Usage
if (response.status === HttpStatus.OK.value) {
  console.log('Request successful');
}
```

### Contributing

Contributions to improve the library are welcome. Please open an issue or pull request on the GitHub repository.

### Donation

- https://paypal.me/aiconeid 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.