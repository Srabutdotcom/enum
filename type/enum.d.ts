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
 * @version __VERSION__
 */
export class Enum {
    /**
     * Gets the number of constants in the enum
     * @returns {number} The number of enum constants
     */
    static get size(): number;
    /**
     * Gets all constants of the enum
     * @returns {Enum[]} Array of all enum constants
     */
    static values(): Enum[];
    /**
     * Gets all constant names of the enum
     * @returns {string[]} Array of all enum constant names
     */
    static names(): string[];
    /**
     * Gets an enum constant by name
     * @param {string} name - The name of the enum constant
     * @returns {Enum} The enum constant
     * @throws {Error} If no constant exists with the given name
     */
    static valueOf(name: string): Enum;
    /**
     * Gets an enum constant by value
     * @param {*} value - The value to look up
     * @returns {Enum} The enum constant
     * @throws {Error} If no constant exists with the given value
     */
    static fromValue(value: any): Enum;
    /**
     * Freezes the enum, preventing further constant additions
     * @returns {typeof Enum} The enum class
     */
    static freeze(): typeof Enum;
    /**
     * Checks if the enum is frozen
     * @returns {boolean} True if the enum is frozen
     */
    static isFrozen(): boolean;
    /**
     * Creates a new enum constant
     * @param {string} name - The name of the enum constant
     * @param {*} value - The value associated with the enum constant
     * @throws {TypeError} If attempting to instantiate Enum directly
     * @throws {Error} If enum is frozen or if duplicate name/value exists
     */
    constructor(name: string, value: any);
    /**
     * Gets the name of the enum constant
     * @returns {string} The enum constant's name
     */
    get name(): string;
    /**
     * Gets the value of the enum constant
     * @returns {*} The enum constant's value
     */
    get value(): any;
    /**
     * Gets the ordinal (position) of the enum constant
     * @returns {number} The enum constant's ordinal
     */
    get ordinal(): number;
    /**
     * Gets string representation of the enum constant
     * @returns {string} String representation
     */
    toString(): string;
    /**
     * Gets JSON representation of the enum constant
     * @returns {{name: string, value: *, ordinal: number}} JSON representation
     */
    toJSON(): {
        name: string;
        value: any;
        ordinal: number;
    };
    /**
     * Checks if this enum constant equals another
     * @param {Enum} other - The enum constant to compare with
     * @returns {boolean} True if the constants are equal
     */
    equals(other: Enum): boolean;
    /**
     * Compares this enum constant with another by ordinal
     * @param {Enum} other - The enum constant to compare with
     * @returns {number} Negative if this comes before other, positive if after
     * @throws {TypeError} If comparing with different enum type
     */
    compareTo(other: Enum): number;
    /**
     * Converts enum constant to primitive type
     * @param {string} hint - The type hint ('string', 'number', or 'default')
     * @returns {string|number|*} The primitive value
     */
    [Symbol.toPrimitive](hint: string): string | number | any;
    #private;
}
