## figlet-console-webpack-plugin

A application version output in the browser console with figlet


### Install

Use npm or yarn install this webpack plugin.

```js
 npm install figlet-console-webpack-plugin --save-dev 
```


### Usage

Example

Set this in the webpack config file

```js

new FigletConsoleWebpackPlugin({
  name: 'console',
  content: 'version 0.0.1',
  options: {
    mark: '#'
  }
})

```

That should print out:

```
##################################################
                                        _        
   ___    ___    _ __    ___    ___   | |   ___ 
  / __|  / _ \  | '_ \  / __|  / _ \  | |  / _ \
 | (__  | (_) | | | | | \__ \ | (_) | | | |  __/
  \___|  \___/  |_| |_| |___/  \___/  |_|  \___|
                                                
##################################################
                  version 0.0.1                  
```


### Options


##### font 

You can set a string, default value: 'Standard'.
Only support: 'Ghost' and 'Standard'.


##### mark

You can set a string, default value: '#'.


##### prodOnly

You can set a boolean, default value: false.
f you set true, that only print out in production environment.


##### markMaxLength

You can set a number, default value: 50.
This needs to be adjusted according to name with figlet.
