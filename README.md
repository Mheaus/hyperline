HyperLine
=========

**HyperLine is a status line plugin for [Hyper.app](https://hyper.is/)**. It shows you useful system information such as free memory, uptime and CPU usage.

This is my version of the plugin, updated from the original on `Hyperline/hyperline`](https://github.com/Hyperline/hyperline/).

![Screenshot](./screenshot.png)

## Install

To install, edit `~/.hyper.js` and add `"hyperline"` to `plugins`:

```
plugins: [
  "hyperline",
],
```

## Contributing

Feel free to contribute to HyperLine by [requesting a feature](https://github.com/mheaus/hyperline/issues/new), [submitting a bug](https://github.com/mheaus/hyperline/issues/new) or contributing code.

To set up the project for development:

1. Clone this repository into `~/.hyper_plugins/local/`
2. Run `npm install` within the project directory
3. Run `npm run build` to build the plugin **OR** `npm run dev` to build the plugin and watch for file changes.
4. Add the name of the directory to `localPlugins` in `~/.hyper.js`.
5. Reload terminal window

## Authors

- Mathieu Audebert [@mheaus](https://github.com/mheaus)

## Contributors

This project exists thanks to the opencollective who first started this project.
<a href="graphs/contributors"><img src="https://opencollective.com/hyperline/contributors.svg?width=890" /></a>
