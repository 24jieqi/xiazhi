// 生成词条key
export function generateEntryKey(langText: string) {
  return langText
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word
      }
      return word.substring(0, 1).toUpperCase() + word.substring(1)
    })
    .join('')
}
