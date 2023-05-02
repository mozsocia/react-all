give me a circle loading component for react app

ChatGPTChatGPT

1 / 1

Sure, here's an example of a simple circle loading component for a React app:

```js
import React from 'react';
import './CircleLoading.css';

const CircleLoading = () => {
  return (
    <div className="circle-loading">
      <div className="circle-loading-spinner"></div>
    </div>
  );
};

export default CircleLoading;

```

The above code defines a functional component `CircleLoading` that renders a circle loading spinner. The spinner is implemented using CSS and is defined in a separate stylesheet `CircleLoading.css`. Here's what the `CircleLoading.css` file might look like:

```css
.circle-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.circle-loading-spinner {
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: #5b5bff;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

```

The above CSS defines the styles for the `CircleLoading` component. The `circle-loading` class centers the spinner within its parent element, and the `circle-loading-spinner` class defines the appearance of the spinner itself. The `spin` animation rotates the spinner continuously to create the loading effect.

To use the `CircleLoading` component in your React app, you can simply import it and render it wherever you need it:

```js
import React from 'react';
import CircleLoading from './CircleLoading';

const MyComponent = () => {
  return (
    <div>
      <h1>Loading...</h1>
      <CircleLoading />
    </div>
  );
};

export default MyComponent;

```

In the above example, the `CircleLoading` component is used within the `MyComponent` component to indicate that data is loading.
