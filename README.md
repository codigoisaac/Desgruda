# Code Breathe: Sibling Separator

**Give your JSX/TSX elements room to breathe.**

Code Breathe automatically inserts blank lines between sibling JSX and TSX elements, making your component trees instantly more readable, without touching anything else in your file.

---

## Before & After

**Before**

```tsx
export default function CheckoutPage({ cart, user }: Props) {
  return (
    <main className="max-w-2xl mx-auto py-10">
      <OrderSummary items={cart.items} total={cart.total} />
      <ShippingForm defaultAddress={user.address} />
      <PaymentForm savedCards={user.savedCards} />
      <ConfirmButton disabled={cart.items.length === 0} />
    </main>
  );
}
```

**After**

```tsx
export default function CheckoutPage({ cart, user }: Props) {
  return (
    <main className="max-w-2xl mx-auto py-10">
      <OrderSummary items={cart.items} total={cart.total} />

      <ShippingForm defaultAddress={user.address} />

      <PaymentForm savedCards={user.savedCards} />

      <ConfirmButton disabled={cart.items.length === 0} />
    </main>
  );
}
```

One command. No configuration needed.

---

## Usage

**Keyboard shortcut**

| Platform       | Shortcut        |
|----------------|-----------------|
| Windows / Linux | `Ctrl+K Space` |
| macOS          | `Cmd+K Space`   |

**Command Palette**

Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run:

```
Code Breathe: Separate Sibling Elements
```

---

## How It Works

Code Breathe parses your file using a full AST (via Babel) and walks the JSX tree to find adjacent sibling elements. It then inserts a blank line between each pair of siblings that don't already have one, preserving your indentation and leaving everything else untouched.

- Existing blank lines are respected and never duplicated
- Indentation is matched exactly to the next sibling element
- Only JSX/TSX elements are affected; text nodes, expressions, and other content are left as-is

---

## Supported Files

- `.jsx`
- `.tsx`

---

## Known Limitations

- Processes the entire file on each run. On very large files this may take a brief moment.
- HTML files (`.html`) are not supported, only JSX/TSX.

---

## Contributing

Found a bug or have a feature request? Open an issue on the [GitHub repository](https://github.com/codigoisaac/Sibling-Separator).

---

## License

MIT
