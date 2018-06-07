const test: INode = {
  r0c0: { r0c1: 1, r1c0: 2 },
  r0c1: { r0c0: 1, r0c2: 1, r1c1: 2 },
  r0c2: { r0c1: 1, r0c3: 1, r1c2: 2 },
  r0c3: { r0c2: 1, r0c4: 1, r1c3: 2 },
  r0c4: { r0c3: 1, r5c0: 3, r1c4: 2 },
  r1c0: { r0c0: 2, r1c1: 1, r2c0: 1 },
  r1c1: { r1c0: 1, r0c1: 2, r1c2: 1 },
  r1c2: { r1c1: 1, r0c2: 2, r1c3: 1 },
  r1c3: { r1c2: 1, r0c3: 2, r1c4: 1 },
  r1c4: { r1c3: 1, r0c4: 2, r6c0: 3, r2c4: 1 },
  r2c0: { r1c0: 1, r2c1: 1, r3c0: 2 },
  r2c1: { r2c0: 1, r3c1: 2, r2c2: 1 },
  r2c2: { r2c1: 1, r3c2: 2, r2c3: 1 },
  r2c3: { r2c2: 1, r3c3: 2, r2c4: 1 },
  r2c4: { r1c4: 1, r2c3: 1, r3c4: 2, r7c0: 3 },
  r3c0: { r2c0: 2, r3c1: 1, r4c1: 1 },
  r3c1: { r3c0: 1, r2c1: 2, r3c2: 1 },
  r3c2: { r3c1: 1, r2c2: 2, r3c3: 1 },
  r3c3: { r3c2: 1, r2c3: 2, r3c4: 1 },
  r3c4: { r3c3: 1, r2c4: 2, r8c0: 3, r4c4: 1 },
  r4c0: { r3c0: 1, r4c1: 1 },
  r4c1: { r4c0: 1, r4c2: 1 },
  r4c2: { r4c1: 1, r4c3: 1 },
  r4c3: { r4c2: 1, r4c4: 1 },
  r4c4: { r4c3: 1, r3c4: 1, r9c0: 3 },
  r5c0: { r0c4: 3, r6c0: 2, r5c1: 1 },
  r5c1: { r5c0: 1, r6c1: 2, r5c2: 1 },
  r5c2: { r5c1: 1, r6c2: 2, r5c3: 1 },
  r5c3: { r5c2: 1, r6c3: 2, r5c4: 1 },
  r5c4: { r5c3: 1, r6c4: 2 },
  r6c0: { r1c4: 3, r5c0: 2, r6c1: 1, r7c0: 1 },
  r6c1: { r6c0: 1, r5c1: 2, r6c2: 1 },
  r6c2: { r6c1: 1, r5c2: 2, r6c3: 1 },
  r6c3: { r6c2: 1, r5c3: 2, r6c4: 1 },
  r6c4: { r6c3: 1, r5c4: 2 },
  r7c0: { r2c4: 3, r6c0: 1, r7c1: 1, r8c0: 2 },
  r7c1: { r7c0: 1, r8c1: 2, r7c2: 1 },
  r7c2: { r7c1: 1, r8c2: 2, r7c3: 1 },
  r7c3: { r7c2: 2, r8c3: 2, r7c4: 1 },
  r7c4: { r7c3: 1, r8c4: 2 },
  r8c0: { r3c4: 3, r7c0: 2, r8c1: 1 },
  r8c1: { r8c0: 1, r7c1: 2, r8c2: 1},
  r8c2: { r8c1: 1, r7c2: 2, r8c3: 1},
  r8c3: { r8c2: 1, r7c3: 2, r8c4: 1},
  r8c4: { r8c3: 1, r7c4: 2},
  r9c0: { r4c4: 3, r1c1: 1 },
  r9c1: { r9c0: 1, r9c2: 1 },
  r9c2: { r9c1: 1, r9c3: 1 },
  r9c3: { r9c2: 1, r9c4: 1 },
  r9c4: { r9c3: 1 },
}

type cost = number;

export interface INode {
  [ID: string]: {
    [NodeName: string]: cost
  };
}

export class WarehouseGraph {

}
