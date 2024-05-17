// Golay matrix and utility functions

// Parity matrix for Golay [24, 12] code
const P = [
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1],
    [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];

// Binary addition
const binAdd = (a, b) => (a + b) % 2;

// Binary multiplication
const binMult = (a, b) => (a * b) % 2;

// Calculate weight of a vector
const weight = v => v.reduce((acc, val) => acc + val, 0);

export { P, binAdd, binMult, weight };
