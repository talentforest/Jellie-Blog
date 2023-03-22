export function cutLetter(letter: string, length: number) {
  return letter.length > length ? `${letter.slice(0, length)}...` : letter;
}
