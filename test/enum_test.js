import { Enum } from "../src/enum.js";
import { assertEquals } from "jsr:@std/assert";

/**
* @class Color
* @extends Enum
* @description Example enum class for colors
*/
class Color extends Enum {
    /** @type {Color} Red color constant */
    static RED = new Color('RED', '#FF0000');
    /** @type {Color} Green color constant */
    static GREEN = new Color('GREEN', '#00FF00');
    /** @type {Color} Blue color constant */
    static BLUE = new Color('BLUE', '#0000FF');

    static {
        this.freeze();
    }

    /**
     * Checks if the color is warm
     * @returns {boolean} True if the color is warm
     */
    isWarm() {
        return [Color.RED].includes(this);
    }
}

/**
* @class Direction
* @extends Enum
* @description Example enum class for directions
*/
class Direction extends Enum {
    /** @type {Direction} North direction constant */
    static NORTH = new Direction('NORTH', 0);
    /** @type {Direction} East direction constant */
    static EAST = new Direction('EAST', 90);
    /** @type {Direction} South direction constant */
    static SOUTH = new Direction('SOUTH', 180);
    /** @type {Direction} West direction constant */
    static WEST = new Direction('WEST', 270);

    static {
        this.freeze();
    }

    /**
     * Rotates the direction by specified degrees
     * @param {number} degrees - The degrees to rotate
     * @returns {Direction} The new direction after rotation
     */
    rotate(degrees) {
        const newValue = (this.value + degrees) % 360;
        return Direction.fromValue(newValue);
    }
}

Deno.test(
    "Example",
    () => {
        assertEquals(Color.RED.toString(), "Color.RED");
        assertEquals(Direction.NORTH.rotate(90).equals(Direction.EAST), true);
        assertEquals(Color.GREEN.value, `#00FF00`)
        assertEquals(Color.GREEN.name, "GREEN")
    }
)

