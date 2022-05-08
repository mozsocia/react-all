## react-recoil

```js
import { RecoilRoot } from 'recoil';
import AtomPrac from './componentsss/AtomPrac';

function App() {
  return (
   
      <RecoilRoot>
        <div className="App">
          <h1>This is react 18</h1>
          <AtomPrac />
        </div>
      </RecoilRoot >
  );
}
```

### /componentsss/AtomPrac
```js
import React from 'react'
import { atom, useRecoilState } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function AtomPrac() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  )
}

export default AtomPrac

```
