import { Enum } from "../src/enum.js";

class Color extends Enum {
    /** @type {Color} Red color constant */
    static RED = new Color('RED', '#FF0000');
    /** @type {Color} Green color constant */
    static GREEN = new Color('GREEN', '#00FF00');
    /** @type {Color} Blue color constant */
    static BLUE = new Color('BLUE', '#0000FF');
}

const test = Color.fromValue('#00FF00');
//const test_2 = Color.fromValue('#000000')
