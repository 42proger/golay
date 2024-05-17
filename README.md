# Golay Code Implementation in JavaScript

[![Deploy to GitHub Pages](https://github.com/42proger/golay/actions/workflows/deploy.yml/badge.svg)](https://github.com/42proger/golay/actions/workflows/deploy.yml)

This repository contains an implementation of the Golay code [24, 12] in JavaScript. The Golay code is a type of error correcting code that can detect and correct multiple errors in a 24-bit block of data. This implementation is designed for educational purposes and demonstrates how encoding, error injection and decoding processes work using the Golay code.

**Live Demo**: You can view and interact with the implementation at: https://42proger.github.io/golay/

## Features

* **Encoding**: Convert a 12-bit message into a 24-bit codeword using Golay code [24, 12].
* **Error introduction**: Simulate transmission errors by introducing bit errors into the encoded message.
* **Decoding**: Correct errors in the received 24-bit codeword.
* **Error Detection**: Identify whether the received message can be correctly decoded or whether errors exceed the correctability.

## Educational Purpose

This project is intended for educational purposes to illustrate the principles of error correcting codes, particularly the Golay code [24, 12]. It is not optimized for performance and is not suitable for production use in real-world applications.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.