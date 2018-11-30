export function SplitString (string, to_character) {
  if (string.indexOf(to_character) > 0) {
    return string.substr(0,string.indexOf(to_character));
  }
  return string;
}
