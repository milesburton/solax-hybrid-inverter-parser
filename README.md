# ⚠️ LEGACY REPOSITORY - DO NOT USE IN PRODUCTION

> **WARNING:** This repository contains known CRITICAL security vulnerabilities and is no longer maintained.

## 🛑 Status: UNMAINTAINED

This repository has **4 CRITICAL security vulnerabilities** that cannot be automatically fixed due to outdated dependencies from 2018.

### Security Issues

- **babel-traverse**: Arbitrary code execution (NO PATCH AVAILABLE)
- **form-data**: Unsafe random boundary generation
- **cryptiles**: Insufficient cryptographic entropy
- **fsevents**: Code injection vulnerability

**📋 See [SECURITY.md](SECURITY.md) for full details.**

### ⚠️ Do Not Use For:
- ❌ Production environments
- ❌ Internet-facing applications
- ❌ Processing untrusted input
- ❌ Any security-sensitive operations

---

# solax-hybrid-inverter-parser

Simple nodeJS application to interact with the Solax Hybrid inverter.

The application does the following:
* Scans for the inverter on the LAN
* Connect to the socket server
* Decodes uploadSensor packets sent to the debugging port
* Maps sensor payload to JSON object
* Prints json object to stdout

Built on RXJS, Socket library

---

**Status:** LEGACY/UNMAINTAINED (2018)  
**Last Security Review:** 2026-02-13  
**Vulnerabilities:** 4 CRITICAL, 18+ HIGH/MEDIUM  
**For Historical Reference Only**
