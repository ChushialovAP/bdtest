![test](https://user-images.githubusercontent.com/45356689/195144705-8e328c75-df8c-47e9-b0c1-8166a6b24a52.gif)

задача на рефакторинг:
```
function func(s, a, b) {
  if (!s) {
    return -1;
  }

  let i = s.length - 1;
  let aIndex = -1;
  let bIndex = -1;
  while (aIndex == -1 && bIndex == -1 && i > 0) {
    if (s[i] == a) {
      aIndex = i;
    }
    if (s[i] == b) {
      bIndex = i;
    }
    i--;
  }

  if (aIndex != -1 || bIndex != -1) {
    return Math.max(aIndex,bIndex);
  } else {
    return -1;
  }
}
```
