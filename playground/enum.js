// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/enum.d.ts"

export class Enum {
   static #instances = new Map();
   static #frozen = new Set();

   #name;
   #value;
   #ordinal;

   constructor(name, value) {
       if (this.constructor === Enum) {
           throw new TypeError("Cannot instantiate abstract Enum class directly");
       }
       
       this.#name = name;
       this.#value = value;
       this.#ordinal = this.constructor.size;
       
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

   get name() {
       return this.#name;
   }

   get value() {
       return this.#value;
   }

   get ordinal() {
       return this.#ordinal;
   }

   static get size() {
       return this.values().length;
   }

   static values() {
       const instanceMap = Enum.#instances.get(this) || new Map();
       return Array.from(instanceMap.values());
   }

   static names() {
       const instanceMap = Enum.#instances.get(this) || new Map();
       return Array.from(instanceMap.keys());
   }

   static valueOf(name) {
       const instanceMap = Enum.#instances.get(this);
       if (!instanceMap || !instanceMap.has(name)) {
           throw new Error(`No enum constant ${this.name}.${name}`);
       }
       return instanceMap.get(name);
   }

   static fromValue(value) {
       const instance = this.values().find(inst => inst.value === value);
       if (!instance) {
           throw new Error(`No enum constant with value ${value} in ${this.name}`);
       }
       return instance;
   }

   static freeze() {
       Enum.#frozen.add(this);
       return this;
   }

   static isFrozen() {
       return Enum.#frozen.has(this);
   }

   toString() {
       return `${this.constructor.name}.${this.name}`;
   }

   toJSON() {
       return {
           name: this.name,
           value: this.value,
           ordinal: this.ordinal
       };
   }

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

   equals(other) {
       if (!(other instanceof this.constructor)) {
           return false;
       }
       return this.name === other.name && this.value === other.value;
   }

   compareTo(other) {
       if (!(other instanceof this.constructor)) {
           throw new TypeError(`Cannot compare ${this.constructor.name} with ${other?.constructor?.name}`);
       }
       return this.ordinal - other.ordinal;
   }
}

