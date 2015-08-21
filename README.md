### Description

- This is my demo for simple animation *height, new-item*.
- This repo is used with **Flux Architecture**. Please read more in https://facebook.github.io/flux/
- This repo is used for testing typescript/react. It may not work in the future.
- This repo is used webpack/babel for building with react jsx

### Install

```
- npm install
- npm install -g http-server
- npm install -g typescript@next
```

### Run

```
- cd to project directory
- webpack --watch
- http-server
```

### References
- http://www.jbrantly.com/es6-modules-with-typescript-and-webpack/


### Notes

``` js
import someLib from 'someLib'; // this will throw an error  
import * as someLib from 'someLib'; // this will work  
import { someProp } from 'someLib'; // this will also work  

```