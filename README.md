# Desgruda 🍃

You'll never have to work with all that "stuck together" code again.

This extension helps you improve code readability by automatically separating sibling HTML-like elements with a blank line.

### Before

```jsx
<div>
  <Header />
  <main>
    <Article />
    <Sidebar />
    <Comments />
  </main>
  <Footer />
</div>
```

### After

```jsx
<div>
  <Header />

  <main>
    <Article />

    <Sidebar />

    <Comments />
  </main>

  <Footer />
</div>
```

## Usage

Desgruda can be triggered in two ways:

1. **Keyboard Shortcut**: Press `Ctrl+B B` (Windows/Linux) or `Cmd+B B` (Mac) while editing a file
2. **Command Palette**: Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for "Desgruda"

The extension will:

- Parse your JSX/TSX code
- Identify sibling elements that need spacing
- Insert blank lines with proper indentation
- Preserve existing spacing if elements already have blank lines between them

## Supported Languages

- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)
- React components
- JSX Fragments

## Requirements

No additional dependencies required. Desgruda works out of the box with your existing VS Code installation.

## Extension Settings

This extension does not currently add any VS Code settings. It works automatically when triggered.

## Known Issues

- The extension currently processes the entire file. For very large files, this may take a moment.
- Only formats JSX/TSX elements. Standard HTML files are not yet supported.

## Release Notes

### 1.0.0

Initial release of Desgruda:

- Automatic blank line insertion between sibling JSX elements
- Smart indentation matching
- Support for JSX and JSX Fragments
- Keyboard shortcut: `Ctrl+B B` / `Cmd+B B`

## Contributing

Found a bug or have a feature request? Please open an issue on the [GitHub repository](https://github.com/codigoisaac/Desgruda).

## License

This extension is licensed under the MIT License.

---

**Let your code breath!** 🍃
