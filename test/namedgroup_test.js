import { assertEquals } from "jsr:@std/assert";
import { NamedGroup } from "../src/namedgroup.js";

Deno.test(
   "NamedGroup",
   ()=>{
      const namedGroups = [23, 24, 25, 29, 30, 256, 257, 258, 259, 260]
      assertEquals(NamedGroup.values().map(e=>e.value), namedGroups);
   }
)

