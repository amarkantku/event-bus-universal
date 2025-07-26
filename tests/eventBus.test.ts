import eventBus from '../src/EventBus';

describe('EventBus', () => {
  afterEach(() => {
    eventBus.offAll();
  });

  test('calls listeners registered with on', () => {
    const mock = jest.fn();
    eventBus.on('test:event', mock);
    eventBus.emit('test:event', 123);
    expect(mock).toHaveBeenCalledWith(123);
  });

  test('calls listeners registered with once only once', () => {
    const mock = jest.fn();
    eventBus.once('once:event', mock);
    eventBus.emit('once:event');
    eventBus.emit('once:event');
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('removes listeners with off', () => {
    const mock = jest.fn();
    eventBus.on('remove:event', mock);
    eventBus.off('remove:event', mock);
    eventBus.emit('remove:event');
    expect(mock).not.toHaveBeenCalled();
  });

  test('removes all listeners with offAll', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    eventBus.on('e1', mock1);
    eventBus.on('e2', mock2);
    eventBus.offAll();
    eventBus.emit('e1');
    eventBus.emit('e2');
    expect(mock1).not.toHaveBeenCalled();
    expect(mock2).not.toHaveBeenCalled();
  });

  test('wildcard event listeners work', () => {
    const mock = jest.fn();
    eventBus.on('user:*', mock);
    eventBus.emit('user:login');
    eventBus.emit('user:logout');
    expect(mock).toHaveBeenCalledTimes(2);
  });

  test('global wildcard * listener works', () => {
    const mock = jest.fn();
    eventBus.on('*', mock);
    eventBus.emit('event1');
    eventBus.emit('event2');
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
