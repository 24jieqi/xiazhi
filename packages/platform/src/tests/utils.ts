import { screen, act, within } from '@testing-library/react'
import type { UserEvent } from 'node_modules/@testing-library/user-event/dist/types/setup/setup'

/**
 * 选择器单选
 * @param userEvent
 */
export function selectOption(userEvent: UserEvent) {
  const _click = click(userEvent)
  return async (selectorTestId: string, optionText: string) => {
    const selector = await screen.findByTestId(selectorTestId)
    await _click(selector.querySelector('.ant-select-selector'))
    const targetOption = await screen.findByTitle(optionText)
    await _click(targetOption)
  }
}

/**
 * 联级选择器选择
 * @param userEvent
 */
export function cascaderOption(userEvent: UserEvent) {
  const _click = click(userEvent)
  return async (cascaderTestId: string, optionText: string[]) => {
    const selector = await screen.findByTestId(cascaderTestId)
    await _click(selector.querySelector('.ant-select-selector'))
    for (const text of optionText) {
      const targetOption = await screen.findByTitle(text)
      await _click(targetOption)
    }
  }
}

/**
 * 点击事件
 * @param userEvent
 */
export function click(userEvent: UserEvent) {
  return async (element: Element) => {
    await act(async () => {
      await userEvent.click(element)
    })
  }
}

/**
 * 输入事件
 * @param userEvent
 * @returns
 */
export function type(userEvent: UserEvent) {
  return async (element: Element, content: string) => {
    await act(async () => {
      await userEvent.type(element, content)
    })
  }
}

/**
 * 获取当前页面唯一的对话框
 * @returns
 */
export async function getUniqueDialog() {
  const dialog = await screen.findByRole('dialog')
  return within(dialog)
}

/**
 * 文件上传事件
 * @param userEvent
 * @returns
 */
export function upload(userEvent: UserEvent) {
  return async (element: HTMLElement, fileOrFiles?: File | File[]) => {
    const image = new File(['file'], 'test.png', { type: 'image/png' })
    await act(async () => {
      await userEvent.upload(element, fileOrFiles || [image])
    })
  }
}
