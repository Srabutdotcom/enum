// @ts-self-types="../type/bimap.d.ts"

export class BiMap {
   constructor() {
      this.keyToValue = new Map();
      this.valueToKey = new Map();
   }

   // Add a key-value pair
   set(key, value) {
      if (this.keyToValue.has(key) || this.valueToKey.has(value)) {
         throw new Error("Key or value already exists!");
      }
      this.keyToValue.set(key, value);
      this.valueToKey.set(value, key);
   }

   // Get a value by key
   getValue(key) {
      return this.keyToValue.get(key);
   }

   // Get a key by value
   getKey(value) {
      return this.valueToKey.get(value);
   }

   // Check if a key exists
   hasKey(key) {
      return this.keyToValue.has(key);
   }

   // Check if a value exists
   hasValue(value) {
      return this.valueToKey.has(value);
   }

   // Delete by key
   deleteByKey(key) {
      const value = this.keyToValue.get(key);
      if (value !== undefined) {
         this.keyToValue.delete(key);
         this.valueToKey.delete(value);
      }
   }

   // Delete by value
   deleteByValue(value) {
      const key = this.valueToKey.get(value);
      if (key !== undefined) {
         this.valueToKey.delete(value);
         this.keyToValue.delete(key);
      }
   }

   // Clear all entries
   clear() {
      this.keyToValue.clear();
      this.valueToKey.clear();
   }

   keys(){ return this.keyToValue.keys() }
   values(){ return this.keyToValue.values() }
}