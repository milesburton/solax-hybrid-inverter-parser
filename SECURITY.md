# Security Policy

## ⚠️ Legacy Repository Notice

**This repository is LEGACY/UNMAINTAINED and contains known security vulnerabilities that cannot be easily resolved.**

### Known Critical Security Issues

This repository has **4 CRITICAL** security vulnerabilities:

1. **babel-traverse** - Arbitrary code execution (NO PATCH AVAILABLE)
2. **form-data** - Unsafe random function for boundary selection
3. **cryptiles** - Insufficient entropy in cryptographic operations
4. **fsevents** - Code injection vulnerability

### Why Can't These Be Fixed?

- Uses **Babel 6.x** ecosystem which is no longer maintained
- babel-traverse vulnerability has **no patch available** - would require complete rewrite to Babel 7+
- Requires **node-gyp** with Python distutils (deprecated in Python 3.12+)
- Dependencies are from **2018** and are incompatible with modern Node.js
- Fixing these issues would require a complete architectural rewrite

### Recommendations

**For Production Use:**
- ❌ **DO NOT use this repository in production environments**
- ❌ **DO NOT expose this code to untrusted input**
- ❌ **DO NOT use for internet-facing applications**

**Alternatives:**
- Rewrite the application using modern dependencies (Node.js 18+, Babel 7+, or ESBuild/SWC)
- Fork and modernize the codebase with current tooling
- Find alternative maintained libraries for Solax inverter parsing

### Historical Context

This repository was created in **2018** and uses dependencies from that era. The JavaScript ecosystem has evolved significantly, and these dependencies are no longer maintained or compatible with modern security standards.

### Reporting Security Issues

As this is an unmaintained legacy repository, security reports will not be actively addressed. If you need this functionality, please consider:
1. Creating a modern fork with updated dependencies
2. Contributing to actively maintained alternatives
3. Using this code only as reference material

---

**Last Updated:** 2026-02-13
**Status:** LEGACY/UNMAINTAINED
**Vulnerability Count:** 4 CRITICAL, 18+ HIGH/MEDIUM
