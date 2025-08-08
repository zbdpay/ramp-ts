# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-08-08
### Added
- TL;DR section in README with quick start steps
- CDN installation option in README
- Interactive JavaScript example with session token creation
- Support for production environment in examples
- Automatic session token creation via ZBD API

### Changed
- Default iframe height from `600px` to `100%` for better responsiveness
- JavaScript example layout to side-by-side panels
- Improved form styling and user experience

### Fixed
- ES module imports with proper `.js` extensions
- CORS issues when serving examples locally
- TypeScript linting errors with import resolver

## [1.0.0] - 2025-08-08
### Added
- Initial release
- Core TypeScript/JavaScript iframe wrapper
- PostMessage communication system
- Environment support (production, x1, x2, voltorb)
- Comprehensive TypeScript definitions
- Error handling and logging
- Basic HTML iframe example

[Unreleased]: https://github.com/zbdpay/ramp-ts/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/zbdpay/ramp-ts/releases/tag/v1.0.0
