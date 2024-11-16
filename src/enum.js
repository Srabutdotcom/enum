// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/enum.d.ts"

/**
 * Abstract base class for creating enumeration types in JavaScript
 * @abstract
 * @example
 * ```js
 * class Color extends Enum {
 *   static RED = new Color('RED', '#FF0000');
 *   static GREEN = new Color('GREEN', '#00FF00');
 *   static BLUE = new Color('BLUE', '#0000FF');
 *   
 *   static {
 *     this.freeze();
 *   }
 * }
 * ```
 */
export class Enum {
    /** @private @static @type {Map<Function, Map<string, Enum>>} */
    static #instances = new Map();

    /** @private @static @type {Set<Function>} */
    static #frozen = new Set();

    /** @private @type {string} */
    #name;

    /** @private @type {*} */
    #value;

    /** @private @type {number} */
    #ordinal;

    /**
     * Creates a new enum constant
     * @param {string} name - The name of the enum constant
     * @param {*} value - The value associated with the enum constant
     * @throws {TypeError} If attempting to instantiate Enum directly
     * @throws {Error} If enum is frozen or if duplicate name/value exists
     */
    constructor(name, value) {
        if (this.constructor === Enum) {
            throw new TypeError("Cannot instantiate abstract Enum class directly");
        }

        this.#name = name;
        this.#value = value;
        this.#ordinal = this.constructor.size;

        // Register instance
        if (!Enum.#instances.has(this.constructor)) {
            Enum.#instances.set(this.constructor, new Map());
        }

        const instanceMap = Enum.#instances.get(this.constructor);

        if (Enum.#frozen.has(this.constructor)) {
            throw new Error(`Cannot add new enum constant ${name} to frozen enum ${this.constructor.name}`);
        }

        if (instanceMap.has(name)) {
            throw new Error(`Duplicate enum constant name: ${name}`);
        }

        for (const [, instance] of instanceMap) {
            if (instance.value === value) {
                throw new Error(`Duplicate enum value: ${value} for constant ${name}`);
            }
        }

        instanceMap.set(name, this);
    }

    /**
     * Gets the name of the enum constant
     * @returns {string} The enum constant's name
     */
    get name() {
        return this.#name;
    }

    /**
     * Gets the value of the enum constant
     * @returns {*} The enum constant's value
     */
    get value() {
        return this.#value;
    }

    /**
     * Gets the ordinal (position) of the enum constant
     * @returns {number} The enum constant's ordinal
     */
    get ordinal() {
        return this.#ordinal;
    }

    /**
     * Gets the number of constants in the enum
     * @returns {number} The number of enum constants
     */
    static get size() {
        return this.values().length;
    }

    /**
     * Gets all constants of the enum
     * @returns {Enum[]} Array of all enum constants
     */
    static values() {
        const instanceMap = Enum.#instances.get(this) || new Map();
        return Array.from(instanceMap.values());
    }

    /**
     * Gets all constant names of the enum
     * @returns {string[]} Array of all enum constant names
     */
    static names() {
        const instanceMap = Enum.#instances.get(this) || new Map();
        return Array.from(instanceMap.keys());
    }

    /**
     * Gets an enum constant by name
     * @param {string} name - The name of the enum constant
     * @returns {Enum} The enum constant
     * @throws {Error} If no constant exists with the given name
     */
    static valueOf(name) {
        const instanceMap = Enum.#instances.get(this);
        if (!instanceMap || !instanceMap.has(name)) {
            throw new Error(`No enum constant ${this.name}.${name}`);
        }
        return instanceMap.get(name);
    }

    /**
     * Gets an enum constant by value
     * @param {*} value - The value to look up
     * @returns {Enum} The enum constant
     * @throws {Error} If no constant exists with the given value
     */
    static fromValue(value) {
        const instance = this.values().find(inst => inst.value === value);
        if (!instance) {
            throw new Error(`No enum constant with value ${value} in ${this.name}`);
        }
        return instance;
    }

    /**
     * Freezes the enum, preventing further constant additions
     * @returns {typeof Enum} The enum class
     */
    static freeze() {
        Enum.#frozen.add(this);
        return this;
    }

    /**
     * Checks if the enum is frozen
     * @returns {boolean} True if the enum is frozen
     */
    static isFrozen() {
        return Enum.#frozen.has(this);
    }

    /**
     * Gets string representation of the enum constant
     * @returns {string} String representation
     */
    toString() {
        return `${this.constructor.name}.${this.name}`;
    }

    /**
     * Gets JSON representation of the enum constant
     * @returns {{name: string, value: *, ordinal: number}} JSON representation
     */
    toJSON() {
        return {
            name: this.name,
            value: this.value,
            ordinal: this.ordinal
        };
    }

    /**
     * Converts enum constant to primitive type
     * @param {string} hint - The type hint ('string', 'number', or 'default')
     * @returns {string|number|*} The primitive value
     */
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return this.value;
            case 'string':
                return this.toString();
            default:
                return this.value;
        }
    }

    /**
     * Checks if this enum constant equals another
     * @param {Enum} other - The enum constant to compare with
     * @returns {boolean} True if the constants are equal
     */
    equals(other) {
        if (!(other instanceof this.constructor)) {
            return false;
        }
        return this.name === other.name && this.value === other.value;
    }

    /**
     * Compares this enum constant with another by ordinal
     * @param {Enum} other - The enum constant to compare with
     * @returns {number} Negative if this comes before other, positive if after
     * @throws {TypeError} If comparing with different enum type
     */
    compareTo(other) {
        if (!(other instanceof this.constructor)) {
            throw new TypeError(`Cannot compare ${this.constructor.name} with ${other?.constructor?.name}`);
        }
        return this.ordinal - other.ordinal;
    }
}

// npx -p typescript tsc ./src/enum.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
