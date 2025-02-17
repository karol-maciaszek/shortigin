# Deep Shortigin

## Introduction

## Solutions

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
