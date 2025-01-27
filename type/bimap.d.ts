/**
 * Represents a bidirectional map where keys and values can be interchanged.
 */
export declare class BiMap {
  constructor();

  /**
   * Adds a key-value pair to the BiMap.
   * @throws {Error} If the key or value already exists.
   */
  set(key: any, value: any): void;

  /**
   * Retrieves the value associated with the given key.
   * @returns The associated value, or `undefined` if not found.
   */
  getValue(key: any): any;

  /**
   * Retrieves the key associated with the given value.
   * @returns The associated key, or `undefined` if not found.
   */
  getKey(value: any): any;

  /**
   * Checks if the given key exists in the BiMap.
   */
  hasKey(key: any): boolean;

  /**
   * Checks if the given value exists in the BiMap.
   */
  hasValue(value: any): boolean;

  /**
   * Deletes the key-value pair associated with the given key.
   */
  deleteByKey(key: any): void;

  /**
   * Deletes the key-value pair associated with the given value.
   */
  deleteByValue(value: any): void;

  /**
   * Clears all key-value pairs in the BiMap.
   */
  clear(): void;

  /**
   * Returns an iterator for all keys in the BiMap.
   */
  keys(): IterableIterator<any>;

  /**
   * Returns an iterator for all values in the BiMap.
   */
  values(): IterableIterator<any>;
}
