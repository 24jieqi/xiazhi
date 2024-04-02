import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

import '@/tests/match-media-mock'

vi.mock('react-router-dom', async importOriginal => {
  const apis = (await importOriginal()) as any
  return { ...apis, matchRoutes: vi.fn(() => []) }
})

function noop() {}
if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: noop })
}

beforeAll(() => {
  const { getComputedStyle } = window
  window.getComputedStyle = elt => getComputedStyle(elt)
})

declare module 'vitest' {
  interface Assertion<T = any>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers)
