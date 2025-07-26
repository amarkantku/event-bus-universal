# event-bus-universal

A universal, zero-dependency EventBus implementation written in TypeScript that works seamlessly in **both Node.js and browser environments**.

---

## ✨ Features

- ✅ Publish/Subscribe with `on`, `once`, `emit`, `off`, `offAll`
- 🔁 Wildcard support: `user:*`, `*:*`, etc.
- 🧠 Singleton pattern ensures global shared instance
- ⚙️ Works in **Node.js**, **browsers**, and **microfrontends**
- 📦 Lightweight and dependency-free

---

## 📦 Installation

```bash
npm install event-bus-universal
````

---

## 🧪 Usage

### Import

```ts
import eventBus from 'event-bus-universal';
```

### Register an event

```ts
eventBus.on('user:login', data => {
  console.log('User logged in:', data);
});
```

### Emit an event

```ts
eventBus.emit('user:login', { id: 123, name: 'John Doe' });
```

---

## 📁 Examples

### ✅ Basic Event Subscription

```ts
eventBus.on('app:init', () => {
  console.log('Application initialized');
});

eventBus.emit('app:init');
```

### 🔂 Wildcard Matching

```ts
eventBus.on('user:*', (data) => {
  console.log('User event:', data);
});

eventBus.emit('user:signup', { email: 'test@example.com' });
eventBus.emit('user:logout', { id: 42 });
```

### ⏳ One-Time Event

```ts
eventBus.once('order:confirmed', (order) => {
  console.log('Order confirmed:', order);
});

eventBus.emit('order:confirmed', { orderId: 'ORD123' });
eventBus.emit('order:confirmed', { orderId: 'ORD124' }); // Won’t fire
```

### ❌ Remove Specific Listener

```ts
const onCartUpdated = (cart) => console.log('Cart:', cart);

eventBus.on('cart:update', onCartUpdated);

// Later...
eventBus.off('cart:update', onCartUpdated);
```

### 🧹 Remove All Listeners

```ts
eventBus.offAll(); // remove everything

eventBus.offAll('chat:message'); // remove all listeners for a specific event
```

### 🌐 Global Shared Instance

```ts
// utils/eventBus.ts
import eventBus from 'event-bus-universal';
export default eventBus;

// anywhere else
import eventBus from './utils/eventBus';

eventBus.emit('notify', { message: 'Hello from another module!' });
```

---

## 🧩 API Reference

| Method                  | Description                                |
| ----------------------- | ------------------------------------------ |
| `on(event, callback)`   | Register a persistent listener             |
| `once(event, callback)` | Register a one-time listener               |
| `off(event, callback)`  | Remove a specific listener                 |
| `offAll(event?)`        | Remove all listeners (optionally filtered) |
| `emit(event, data?)`    | Emit an event with optional data           |

---

## 📜 License

MIT © 2025 \[Amarkant Kumar]

---

## 💡 Tip

Use `event-bus-universal` for inter-component or inter-app communication in microfrontend setups, real-time dashboards, plugin systems, or cross-tab messaging!

```
