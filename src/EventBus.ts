export type EventCallback = (data?: any) => void;

export class EventBus {
  private events: Map<string, Set<EventCallback>> = new Map();

  on(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event)!.add(callback);
  }

  once(event: string, callback: EventCallback): void {
    const wrapper = (data?: any) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  off(event: string, callback: EventCallback): void {
    this.events.get(event)?.delete(callback);
  }

  offAll(event?: string): void {
    if (event) this.events.delete(event);
    else this.events.clear();
  }

  emit(event: string, data?: any): void {
    this.events.get(event)?.forEach((cb) => cb(data));

    for (const [key, callbacks] of Array.from(this.events.entries())) {
      if (this.matchWildcard(key, event)) {
        callbacks.forEach((cb) => cb(data));
      }
    }
  }

  private matchWildcard(pattern: string, event: string): boolean {
    if (pattern === event) return false;
    if (pattern === '*') return true;
    if (pattern.endsWith(':*')) {
      const base = pattern.slice(0, -2);
      return event.startsWith(base + ':');
    }
    return false;
  }
}

const globalKey = '__GLOBAL_EVENT_BUS__';

const getGlobalObject = () => {
  if (typeof window !== 'undefined') return window as any;
  if (typeof globalThis !== 'undefined') return globalThis as any;
  return {};
};

const globalObject = getGlobalObject();

const eventBus: EventBus = globalObject[globalKey] || (globalObject[globalKey] = new EventBus());

export default eventBus;
