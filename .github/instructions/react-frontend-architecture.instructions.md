---
description: "Use when creating or refactoring React front-end architecture, component boundaries, state management, hooks, folders, and maintainability strategy."
name: "React Frontend Architecture Standards"
applyTo: "src/**/*.js, src/**/*.jsx, src/**/*.ts, src/**/*.tsx"
---
# React Frontend Architecture Standards

Apply these standards when implementing or refactoring front-end code.

## Core Principles

- Keep components focused on a single responsibility.
- Prefer composition over deep inheritance.
- Separate domain/business logic from rendering concerns.
- Keep effects predictable and side effects isolated.

## Component Design

- Keep presentational components simple and reusable.
- Move complex orchestration to custom hooks or view-model-like adapters.
- Prefer controlled data flow through props and explicit callbacks.
- Avoid prop drilling by introducing context only when justified.

## State Strategy

- Keep local state local; lift state only when truly shared.
- Derive computed values instead of duplicating state.
- Normalize async state handling (idle/loading/success/error).
- Avoid hidden mutable module-level state.

## Quality and Maintainability

- Write clear and stable public component APIs.
- Favor small pure utility functions for business rules.
- Add tests for critical behavior and regression-prone paths.
- Minimize duplication in UI and state transitions.
- Prefer incremental refactors over large rewrites.

## SonarQube-Oriented Guidance

- Reduce cognitive complexity in render and handlers.
- Avoid deeply nested conditions inside JSX.
- Extract repeated logic to helpers/hooks.
- Keep error paths explicit and testable.
- Remove dead code and temporary debug artifacts.
