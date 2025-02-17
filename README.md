# Deep Shortigin

## Introduction

## Solutions

### io-ts for input type validation

The backend leverages `io-ts` for input type validation. It is sibling of `fp-ts` - a functional patterns programming library. It adds a powerful mechanism where I can define the input structure once, and I get the parser (decoder) and TypeScript typings in return. Both are dynamically generated - no additional tools, no code generation. It is a great choice for protecting the backend from the invalid input, which could possibly travel through the whole application leading to unpredictable behavior.

### Redirection HTTP status code

The service uses `302` for redirection. It is because the underlying target URL of a slug can be edited in the UI. If `301` is used, browsers/proxies could cache the redirection ad future editing would be cumbersome.

### Slug generation

Slug generation is based on Hashids library. It generates a unique slug for a given integer id. The slug is generated using the following characters: `[a-zA-Z0-9]`.
It is not a cryptographic hash function, rather it is a obfuscation algorithm. 

- ✅ Non-trivial output → The output looks random (xYz8Aq instead of 12345).
- ✅ Collision-free → Every number gets a unique encoded string.
- ✅ Always ensures a minimum of 6 characters.
- ❌ The slug is only protected by the randomness of the supplied alphabet and salt.
- ❌ Technically, it is possible to discover a way to reverse the slug to the original ID.

I considered other options, like symmetric encryption, but the resulting slug were too long (which makes quite sense).



## Utils

### Redirection rate limiting test

```bash
for i in {1..50}; do curl -s -o /dev/null -w "Request $i: HTTP Status %{http_code}\n" http://localhost:4050/rpvjp3; done
```
