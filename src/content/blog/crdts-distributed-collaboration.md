---
title: "CRDTs: The Math Behind Real-Time Collaboration"
excerpt: "From Google Docs to video like counts — how Conflict-free Replicated Data Types enable collaboration without consensus. A deep dive with TypeScript implementations."
date: 2026-02-14
tags: ["Distributed Systems", "TypeScript", "Data Structures"]
coverGradient: "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))"
---

Have you ever wondered how Google Docs lets multiple people type in the same document simultaneously without conflicts? Or how YouTube can count millions of likes across globally distributed servers without them constantly arguing about the "true" count?

The answer is CRDTs — Conflict-free Replicated Data Types.

## What Are CRDTs?

CRDTs are data structures that can be replicated across multiple nodes in a distributed system, where each node can update its local copy independently, and all copies are guaranteed to converge to the same state — without any coordination.

No locks. No consensus protocols. No leader election. Just math.

## The Key Insight

The magic of CRDTs lies in their merge function. For any CRDT, the merge operation must be:

- **Commutative:** merge(A, B) = merge(B, A)
- **Associative:** merge(merge(A, B), C) = merge(A, merge(B, C))
- **Idempotent:** merge(A, A) = A

If your merge function satisfies these three properties, you get eventual consistency for free. It doesn't matter what order updates arrive, or if some arrive multiple times — the final state will be the same everywhere.

## Implementing a G-Counter

The simplest CRDT is a Grow-only Counter (G-Counter). Each node maintains its own counter. The merge operation takes the maximum of each node's counter.

```typescript
class GCounter {
  private counts: Map<string, number>;

  increment(nodeId: string): void {
    const current = this.counts.get(nodeId) ?? 0;
    this.counts.set(nodeId, current + 1);
  }

  query(): number {
    let total = 0;
    for (const count of this.counts.values()) {
      total += count;
    }
    return total;
  }

  merge(other: GCounter): GCounter {
    const result = new GCounter();
    const allKeys = new Set([...this.counts.keys(), ...other.counts.keys()]);
    for (const key of allKeys) {
      result.counts.set(
        key,
        Math.max(this.counts.get(key) ?? 0, other.counts.get(key) ?? 0),
      );
    }
    return result;
  }
}
```

## Beyond Counters

I built a TypeScript library implementing six CRDT types: GCounter, PNCounter (supports decrements), GSet (grow-only set), 2P-Set (supports removal), LWW-Element-Set (last-writer-wins), and OR-Set (observed-remove).

For me, the most interesting challenge wasn't just writing the code—it was figuring out how to prove it worked. Unit tests aren't enough for distributed systems where messages can arrive in any order. So, I designed a three-layer testing strategy:

1. **Unit tests** — basic operations work correctly
2. **Property-based tests** — mathematical properties (commutativity, etc.) hold for random inputs
3. **Randomized simulations** — multiple virtual nodes performing random operations converge

## When to Use CRDTs

CRDTs aren't a silver bullet. They work best when:

- You need availability over strong consistency (AP in CAP theorem)
- Operations are naturally commutative (counting, set operations)
- You can tolerate temporary divergence between replicas

They're the backbone of collaborative editing (Figma, Google Docs), distributed databases (Riak, Redis CRDB), and any system where "it's better to be available and eventually correct than unavailable and immediately correct."

Check out my implementation: [github.com/googleknight/crdt-lib](https://github.com/googleknight/crdt-lib)
