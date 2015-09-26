# DevTools Author
*A simple set of editor settings for Chrome Developer Tools.*

![Devtools Author Logo](app/images/1400x560_marquee.png)

## Features
If you develop in the browser and/or use Chrome Developer Tools as your web authoring environment, this extension provides a small set of settings to enhance DevTools editing environment:

- Choose from +25 editor themes (applies to [`Sources` and `Console` panels only](https://github.com/micjamking/devtools-author/issues/31))
- Supports custom editor fonts [`Hack`](http://sourcefoundry.org/hack/), [`Source Code Pro`](http://adobe-fonts.github.io/source-code-pro/), [`Droid Sans Mono`](https://www.google.com/fonts/specimen/Droid+Sans+Mono) (must be installed prior on your computer)
- Change font size from 10px - 16px

## Usage
1. Install the [Chrome extension](https://chrome.google.com/webstore/detail/devtools-themes/egfhcfdfnajldliefpdoaojgahefjhhi)
2. Enable Developer Tools experiments in `chrome://flags/#enable-devtools-experiments`.
3. Open DevTools (`cmd + opt + I`); *Settings* > *Experiments* > check **Allow custom UI themes**.

After restarting DevTools, you should see the default theme *3024* take affect within the *Sources* and *Console* panels.

## Contributing
[Fork the repository](../../fork) and then follow the steps below to contribute new themes or bug fixes. *Devtools Author* is built using [NodeJS](https://nodejs.org/en/) and [GruntJs](http://gruntjs.com/).

### Installation:
```
$ git clone git@github.com:<username>/devtools-author.git
...
$ cd devtools-author
$ npm install
```

### Development: 
```
$ grunt serve
```
- Once grunt is running, to install development extension in Chrome, open *Settings* > More Tools > Extensions and click on the **Load unpacked extension...** button. (also enable `Allow incognito` below if you wish).
- Make sure [Developer Tools experiments are enabled and custom UI themes are allowed](#usage).
- Restart DevTools if it is already open. I find the fastest way to see changes take affect is to undock DevTools in a separate window and then open a subsequent DevTools window (`cmd + opt + I` while the current DevTools window is focused) after changes have been saved and grunt reloads the assets. 

#### Creating additional themes
1. Make a copy of `app/styles/themes/_theme-template.scss` and rename the file to your theme name **without the underscore**, ie. if your theme is called *aloha*, inside of `app/styles/themes/`, copy `_theme-template.scss` and rename it to `aloha.scss`
2. Add color values for the palette based on the code syntax highlighter variables in your scss file.
3. Add your color palette object (name and colors array) to the `themes.json` in `app/scripts/`
4. In DevTools, select your theme palette in the *Author Settings* panel.
5. Preview and adjust your colors as needed.
6. Commit and push your changes to your repo, then create a [pull request](../../compare) for your new theme once it is ready!

## License
MIT © Mike King [yo@mikeking.io](mailto:yo@mikeking.io)
