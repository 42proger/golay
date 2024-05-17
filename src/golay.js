import { P, binAdd, binMult, weight } from './constants';

class Golay {
  constructor() {
    this.n = 24;
    this.k = 12;
    this.u = new Array(24).fill(0);
    this.s = new Array(12).fill(0);
    this.r = new Array(24).fill(0);
    this.G = [];
    this.HT = [];
    this.getMatrices();
  }

  // Construct generator and parity-check matrices
  getMatrices() {
    let I = Array.from({ length: 12 }, (_, i) => Array.from({ length: 12 }, (_, j) => (i === j ? 1 : 0)));

    for (let i = 0; i < 12; i++) {
      this.G[i] = [...P[i], ...I[i]];
    }

    for (let i = 0; i < 24; i++) {
      this.HT[i] = new Array(12);
      for (let j = 0; j < 12; j++) {
        if (i < 12) {
          this.HT[i][j] = I[j][i];
        } else {
          this.HT[i][j] = P[j][i - 12];
        }
      }
    }
  }

  // Encode message
  encode(m) {
    this.u.fill(0);
    this.r.fill(0);

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 12; j++) {
        this.u[i] = binAdd(this.u[i], binMult(m[j], this.G[j][i]));
        this.r[i] = this.u[i];
      }
    }
    return this.u.join('');
  }

  // Add errors to the encoded message
  addErrors(positions) {
    for (let pos of positions) {
      this.r[pos] = binAdd(this.r[pos], 1);
    }
    return this.r.join('');
  }

  // Calculate syndrome of the received message
  getSyndrome() {
    this.s.fill(0);
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 12; j++) {
        this.s[j] = binAdd(this.s[j], binMult(this.r[i], this.HT[i][j]));
      }
    }
    return this.s;
  }

  // Decode received message
  decode() {
    this.getSyndrome();
    let e = new Array(24).fill(0);
    let decodable = true;

    // Case 1: Weight of syndrome <= 3
    if (weight(this.s) <= 3) {
      for (let i = 0; i < 24; i++) {
        e[i] = i < 12 ? this.s[i] : 0;
      }
      console.log(`w(s) = ${weight(this.s)} <= 3`);
    } else {
      // Case 2: Weight of syndrome + pi <= 2
      let found = false;
      for (let i = 0; i < 12 && !found; i++) {
        let spi = this.s.map((val, j) => binAdd(val, P[i][j]));
        if (weight(spi) <= 2) {
          for (let k = 0; k < 24; k++) {
            e[k] = k < 12 ? spi[k] : (i === k - 12 ? 1 : 0);
          }
          console.log(`w(s + p${i}) = ${weight(spi)} <= 2`);
          found = true;
        }
      }

      // Case 3: Weight of s*P == 2 or 3
      if (!found) {
        let sp = new Array(12).fill(0);
        for (let i = 0; i < 12; i++) {
          for (let j = 0; j < 12; j++) {
            sp[j] = binAdd(sp[j], binMult(this.s[i], P[i][j]));
          }
        }

        if (weight(sp) === 2 || weight(sp) === 3) {
          for (let i = 0; i < 24; i++) {
            e[i] = i < 12 ? 0 : sp[i - 12];
          }
          console.log(`w(s*P) = ${weight(sp)}`);
        } else {
          // Case 4: Weight of s*P + pi == 2
          for (let i = 0; i < 12; i++) {
            let sppi = sp.map((val, j) => binAdd(val, P[i][j]));
            if (weight(sppi) === 2) {
              for (let k = 0; k < 24; k++) {
                e[k] = k < 12 ? (i === k ? 1 : 0) : sppi[k - 12];
              }
              console.log(`w(s*P + p${i}) = ${weight(sppi)}`);
              found = true;
            }
          }
          if (!found) {
            decodable = false;
          }
        }
      }
    }

    if (decodable) {
      let decoded = this.r.map((val, i) => binAdd(val, e[i]));
      return { errorPattern: e.join(''), decodedMessage: decoded.join('') };
    } else {
      return { error: 'ERROR: Message Undecodable. Unable to correct using Golay Code. Requesting retransmission...' };
    }
  }
}

export { Golay };
