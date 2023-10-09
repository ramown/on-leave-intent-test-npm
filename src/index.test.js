import OnLeaveIntent from "./index";

let callback;
let onLeaveIntent;
const delay = 1000;
jest.useFakeTimers();

describe('OnLeaveIntent', () => {
  beforeEach(() => {
    callback = jest.fn();
    onLeaveIntent = new OnLeaveIntent(callback, delay);

  });

  it('should run the callback function if user goes out of the screen', () => {
    // advance 1s
    jest.advanceTimersByTime(delay);
    // simule the user leaving the page
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }));

    expect(callback).toHaveBeenCalled();
  });

  it('should not run the callback function if user goes into of the screen', () => {
    // advance 1s
    jest.advanceTimersByTime(delay);
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: new EventTarget()
    }));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not run the callback function before the delay', () => {
    // advance 1s
    jest.advanceTimersByTime(delay / 2);
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should run the callback function only once', () => {
    // advance 1s
    jest.advanceTimersByTime(delay);
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }));

    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

});