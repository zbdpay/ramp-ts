# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.9] - 2025-11-24

### Fixed
- StepChange callback now receives full payload object with `previousStep` and `currentStep` instead of extracting single field

### Added
- `StepChangePayload` interface with proper TypeScript types for step change events

## [1.1.8] - 2025-09-18
### Chore
- Improve error response

## [1.1.7] - 2025-09-11
### Fixed
- export refreshAccessToken

## [1.1.6] - 2025-09-11
### Added
- Access token authentication support for `initRampSession`
- `refreshAccessToken` method for token refresh functionality
- Authentication method selector in interactive example (js.html)

### Changed
- `initRampSession` now accepts either `email` or `access_token` as authentication
- Updated TypeScript types to use union type for authentication parameters
- Enhanced error handling with reusable `handleFailedResponse` utility
- add camera permission to iframe params

## [1.1.5] - 2025-09-05
### Chore
- add error response body to error on session init

## [1.1.4] - 2025-08-22
### Fixed
- lower environments base url
- example updated to use latest remote package

## [1.1.3] - 2025-08-22
### Fixed
- lower environments base url
- example updated to use remote package

## [1.1.2] - 2025-08-21
### Added
- secret parameter
- add initRampSession method

## [1.1.1] - 2025-08-18
### Changed
- use and export WidgetPostMessageEnum

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
