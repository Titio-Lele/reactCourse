---
description: "Use when writing or reviewing React/front-end tests, including Jest, React Testing Library, Vitest, Cypress, coverage strategy, flaky test prevention, and maintainable test architecture."
name: "React Testing Standards"
applyTo: "src/**/*.test.js, src/**/*.test.jsx, src/**/*.test.ts, src/**/*.test.tsx, src/**/*.spec.js, src/**/*.spec.jsx, src/**/*.spec.ts, src/**/*.spec.tsx, src/**/__tests__/**, cypress/**/*.cy.{js,jsx,ts,tsx}, tests/e2e/**/*.{js,jsx,ts,tsx}"
---
# React Testing Standards

Apply these standards when creating or maintaining automated tests in this workspace.

## Core Goals

- Validate user-visible behavior over implementation details.
- Keep tests deterministic, readable, and easy to maintain.
- Prevent regressions while minimizing false positives.
- Reduce SonarQube risk from duplication, brittleness, and weak assertions.

## Test Design Rules

- Follow Arrange, Act, Assert.
- One primary behavior per test.
- Use explicit, intent-revealing test names.
- Prefer semantic queries in React Testing Library (`getByRole`, `findByRole`) before fallback selectors.
- Avoid asserting private internals (state shape, non-public methods, exact hook call counts) unless strictly required.

## Reliability Rules

- No real network calls in unit/component tests.
- Mock only external boundaries; keep mocks minimal and local.
- Control timers and async flows to avoid race conditions.
- Avoid fixed sleeps; use waiting utilities designed for async UI updates.
- Ensure tests can run independently and in any order.

## Coverage and Risk Prioritization

Prioritize:
- Critical user flows
- Validation and error handling
- Edge cases and boundary values
- Regression scenarios for previously fixed bugs

Treat raw coverage percentage as a secondary signal; focus first on meaningful scenario coverage.

## SonarQube-Oriented Checklist

- No duplicate test setup blocks when helpers/fixtures can reduce repetition.
- Assertions must be specific and meaningful.
- No dead tests, skipped tests without justification, or permanently focused tests.
- Keep test files small enough for readability; split by feature when needed.
- Remove unnecessary complexity from test helpers.

## Review Output Expectations

When reviewing tests, report:
1. High-risk gaps
2. Flaky patterns and likely causes
3. Suggested improvements in priority order
4. Any residual risk after changes
