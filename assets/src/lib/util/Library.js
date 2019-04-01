import {Vector2D} from './Vector2D.js'

export function randomDouble(min, max) {
    if (min === 'undefined' || max === 'undefined') {
        return Math.random();
    } else {
        return Math.random() * (max - min) + min;
    }
}

export function randomInteger(min, max) {
    if (min === 'undefined' || max === 'undefined') {
        return Math.floor(Math.random());
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export function randomBoolean() {
    return (randomInteger(0, 1) == 1);
}

export function randomVector2D(min, max) {
    return new Vector2D(randomDouble(min, max), randomDouble(min, max))
}

/**
 * Determines whether two circles intersect
 * Returns the distance between origins is less than the combined radii of the circles
 *
 * @param  {Integer} c1X x-coord of circle1 origin
 * @param  {Integer} c1Y y-coord of circle1 origin
 * @param  {Double} c1Radius radius of cricle1
 * @param  {Integer} c2X x-coord of circle2 origin
 * @param  {Integer} c2Y y-coord of circle2 origin
 * @param  {Double} c2Radius radius of cricle2
 * @return {Boolean}
 */
export function circlesIntersect(c1X, c1Y, c1Radius, c2X, c2Y, c2Radius) {
    var distanceX = c2X - c1X;
    var distanceY = c2Y - c1Y;

    var magnitude = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return magnitude < c1Radius + c2Radius;
}

/**
 * Gets the x and y coords of the meeting point of two circles
 *
 * @param  {Integer} c1X x-coord of circle1 origin
 * @param  {Integer} c1Y y-coord of circle1 origin
 * @param  {Double} c1Radius radius of cricle1
 * @param  {Integer} c2X x-coord of circle2 origin
 * @param  {Integer} c2Y y-coord of circle2 origin
 * @param  {Double} c2Radius radius of cricle2
 * @return {Point}
 */
export function circlesIntersectionPoint(c1X, c1Y, c1Radius, c2X, c2Y, c2Radius) {
    return {
        x: ((c1X * c2Radius) + (c2X * c1Radius)) / (c1Radius + c2Radius),
        y: ((c1Y * c2Radius) + (c2Y * c1Radius)) / (c1Radius + c2Radius)
    }
}

/**
 * [pointOnCircumference description]
 * @param  {[type]} origin [description]
 * @param  {[type]} radius [description]
 * @param  {[type]} angle  [description]
 * @return {[type]}        [description]
 */
export function pointOnCircumference(origin, radius, angle) {
    return {
        x: origin.x + radius * Math.cos(angle),
        y: origin.y + radius * Math.sin(angle)
    }
}

export function pointIntersectsCircle(pX, pY, cX, cY, cR) {
    var x = pX - cX,
        y = pY - cY,
        rr = cR * cR;

    return ((x * x) + (y * y) <= rr);
}

export function elasticCollisionVelocities(v1, m1, v2, m2) {
    return {
        x: (v1.x * (m1 - m2) + (2 * m2 * v2.x)) / (m1 + m2),
        y: (v1.y * (m1 - m2) + (2 * m2 * v2.y)) / (m1 + m2)
    }
}

export function forceOfGravity(G, m1, m2, r) {
    return (G * m1 * m2) / (r * r);
}

export function contains(array, elem) {
    return array.indexOf(elem) >= 0;
}

export function removeArrayElem(array, elem) {
    return array.splice(array.indexOf(elem), 1);
}

export function toRadians(deg) {
    return deg * (Math.PI / 180);
}

export function toDegrees(rad) {
    return rad * (180 / Math.PI);
}

export function normalize(x, min, max, a, b) {
    return (((b - a) * (x - min)) / max - min) + a;
}
