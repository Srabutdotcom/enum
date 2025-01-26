export function parseItems(copy, start, lengthOf, Fn) {
   const items = new Set;
   let offset = start;
   while (true) {
      const item = Fn.from(copy.subarray(offset)); offset += item.length;
      items.add(item);
      if (offset >= lengthOf + start) break;
   }
   return items
}

